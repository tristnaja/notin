import { promises as fs, Stats } from 'fs';
import { 
  MarkdownContentType, 
  MarkdownContent, 
  MarkdownContentError, 
  ContentReaderConfig,
  AVAILABLE_CONTENT_TYPES,
  DEFAULT_FALLBACK_CONTENT 
} from '../types';
import { MarkdownCache } from './MarkdownCache';
import { MarkdownPathResolver } from './MarkdownPathResolver';

/**
 * Handles file system operations for reading markdown content
 * Server-side only - uses Node.js fs module
 */
export class MarkdownFileReader {
  private cache: MarkdownCache;
  private pathResolver: MarkdownPathResolver;

  constructor(
    cache?: MarkdownCache, 
    pathResolver?: MarkdownPathResolver
  ) {
    this.cache = cache || new MarkdownCache();
    this.pathResolver = pathResolver || new MarkdownPathResolver();
  }

  /**
   * Read markdown content from file with caching and error handling
   */
  public async readContent(
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
      const cached = this.cache.get(contentType);
      if (cached) {
        return cached;
      }
    }

    try {
      const filePath = this.pathResolver.getFilePath(contentType);
      
      // Check if file exists
      try {
        await fs.access(filePath);
      } catch (error) {
        const errorMessage = `Markdown file not found: ${this.pathResolver.getFileName(contentType)}`;
        
        if (throwOnMissing) {
          throw new MarkdownContentError(errorMessage, contentType, error as Error);
        }
        
        console.warn(`[MarkdownFileReader] ${errorMessage}, using fallback content`);
        return fallbackContent;
      }

      // Read file content
      const content = await fs.readFile(filePath, 'utf8');
      
      // Get file stats for caching metadata
      const stats = await fs.stat(filePath);
      
      // Cache the content
      if (enableCaching) {
        this.cache.set(contentType, content, stats.mtime);
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

      console.error(`[MarkdownFileReader] ${errorMessage}:`, error);
      return fallbackContent;
    }
  }

  /**
   * Read all available markdown content
   */
  public async readAllContent(
    config: ContentReaderConfig = {}
  ): Promise<Record<MarkdownContentType, string>> {
    const results = await Promise.allSettled(
      AVAILABLE_CONTENT_TYPES.map(async (type) => ({
        type,
        content: await this.readContent(type, config)
      }))
    );

    const content: Partial<Record<MarkdownContentType, string>> = {};
    
    results.forEach((result, index) => {
      const contentType = AVAILABLE_CONTENT_TYPES[index];
      
      if (result.status === 'fulfilled') {
        content[contentType] = result.value.content;
      } else {
        console.error(`[MarkdownFileReader] Failed to load ${contentType}:`, result.reason);
        content[contentType] = config.fallbackContent || DEFAULT_FALLBACK_CONTENT;
      }
    });

    return content as Record<MarkdownContentType, string>;
  }

  /**
   * Read markdown content with file metadata
   */
  public async readContentWithMetadata(
    contentType: MarkdownContentType,
    config: ContentReaderConfig = {}
  ): Promise<MarkdownContent> {
    const content = await this.readContent(contentType, config);
    
    try {
      const filePath = this.pathResolver.getFilePath(contentType);
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
   * Check if a file exists
   */
  public async fileExists(contentType: MarkdownContentType): Promise<boolean> {
    try {
      const filePath = this.pathResolver.getFilePath(contentType);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get file stats
   */
  public async getFileStats(contentType: MarkdownContentType): Promise<Stats | null> {
    try {
      const filePath = this.pathResolver.getFilePath(contentType);
      return await fs.stat(filePath);
    } catch {
      return null;
    }
  }

  /**
   * Clear the cache
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public getCacheStats() {
    return this.cache.getStats();
  }

  /**
   * Get the cache instance
   */
  public getCache(): MarkdownCache {
    return this.cache;
  }

  /**
   * Get the path resolver instance
   */
  public getPathResolver(): MarkdownPathResolver {
    return this.pathResolver;
  }

  /**
   * Set new cache instance
   */
  public setCache(cache: MarkdownCache): void {
    this.cache = cache;
  }

  /**
   * Set new path resolver instance
   */
  public setPathResolver(pathResolver: MarkdownPathResolver): void {
    this.pathResolver = pathResolver;
  }
}