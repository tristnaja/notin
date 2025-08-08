import { promises as fs } from 'fs';
import path from 'path';
import {
  MarkdownContentType,
  MarkdownContent,
  MarkdownContentError,
  ContentReaderConfig,
  MARKDOWN_FILES,
  DEFAULT_FALLBACK_CONTENT
} from './types';

/**
 * In-memory cache for markdown content
 */
const contentCache = new Map<MarkdownContentType, {
  content: string;
  timestamp: number;
  lastModified?: Date;
}>();

/**
 * Cache duration in milliseconds (5 minutes in production)
 */
const CACHE_DURATION = process.env.NODE_ENV === 'production' ? 5 * 60 * 1000 : 0;

/**
 * Get the file path for a markdown content type
 */
function getContentFilePath(contentType: MarkdownContentType): string {
  const filename = MARKDOWN_FILES[contentType];
  return path.join(process.cwd(), 'src', 'content', 'markdown', filename);
}

/**
 * Check if cached content is still valid
 */
function isCacheValid(cacheEntry: { timestamp: number }): boolean {
  if (CACHE_DURATION === 0) return false; // No caching in development
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
}

/**
 * Read markdown content from file with error handling and caching
 */
export async function getMarkdownContent(
  contentType: MarkdownContentType,
  config: ContentReaderConfig = {}
): Promise<string> {
  const {
    enableCaching = true,
    fallbackContent = DEFAULT_FALLBACK_CONTENT,
    throwOnMissing = false
  } = config;

  // Check cache first
  if (enableCaching) {
    const cached = contentCache.get(contentType);
    if (cached && isCacheValid(cached)) {
      return cached.content;
    }
  }

  try {
    const filePath = getContentFilePath(contentType);
    
    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      const errorMessage = `Markdown file not found: ${MARKDOWN_FILES[contentType]}`;
      
      if (throwOnMissing) {
        throw new MarkdownContentError(errorMessage, contentType, error as Error);
      }
      
      console.warn(`[MarkdownReader] ${errorMessage}, using fallback content`);
      return fallbackContent;
    }

    // Read file content
    const content = await fs.readFile(filePath, 'utf8');
    
    // Get file stats for metadata
    const stats = await fs.stat(filePath);
    
    // Cache the content
    if (enableCaching) {
      contentCache.set(contentType, {
        content,
        timestamp: Date.now(),
        lastModified: stats.mtime
      });
    }

    return content;

  } catch (error) {
    const errorMessage = `Failed to read markdown content: ${contentType}`;
    
    if (throwOnMissing) {
      throw new MarkdownContentError(
        errorMessage,
        contentType,
        error as Error
      );
    }

    console.error(`[MarkdownReader] ${errorMessage}:`, error);
    return fallbackContent;
  }
}

/**
 * Get all available markdown content
 */
export async function getAllMarkdownContent(
  config: ContentReaderConfig = {}
): Promise<Record<MarkdownContentType, string>> {
  const contentTypes: MarkdownContentType[] = ['demo', 'short-demo', 'math-test'];
  
  const results = await Promise.allSettled(
    contentTypes.map(async (type) => ({
      type,
      content: await getMarkdownContent(type, config)
    }))
  );

  const content: Partial<Record<MarkdownContentType, string>> = {};
  
  results.forEach((result, index) => {
    const contentType = contentTypes[index];
    
    if (result.status === 'fulfilled') {
      content[contentType] = result.value.content;
    } else {
      console.error(`[MarkdownReader] Failed to load ${contentType}:`, result.reason);
      content[contentType] = config.fallbackContent || DEFAULT_FALLBACK_CONTENT;
    }
  });

  return content as Record<MarkdownContentType, string>;
}

/**
 * Get markdown content with metadata
 */
export async function getMarkdownContentWithMetadata(
  contentType: MarkdownContentType,
  config: ContentReaderConfig = {}
): Promise<MarkdownContent> {
  const content = await getMarkdownContent(contentType, config);
  
  try {
    const filePath = getContentFilePath(contentType);
    const stats = await fs.stat(filePath);
    
    return {
      type: contentType,
      content,
      lastModified: stats.mtime,
      fileSize: stats.size
    };
  } catch {
    return {
      type: contentType,
      content,
      lastModified: undefined,
      fileSize: undefined
    };
  }
}

/**
 * Clear the content cache (useful for development/testing)
 */
export function clearContentCache(): void {
  contentCache.clear();
}

/**
 * Get cache statistics (useful for debugging)
 */
export function getCacheStats(): {
  size: number;
  entries: Array<{
    type: MarkdownContentType;
    timestamp: number;
    isValid: boolean;
  }>;
} {
  const entries = Array.from(contentCache.entries()).map(([type, data]) => ({
    type,
    timestamp: data.timestamp,
    isValid: isCacheValid(data)
  }));

  return {
    size: contentCache.size,
    entries
  };
}