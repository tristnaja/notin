/**
 * Type-safe markdown content identifiers
 */
export type MarkdownContentType = 'demo' | 'short-demo' | 'math-test';

/**
 * Markdown content metadata interface
 */
export interface MarkdownContent {
  type: MarkdownContentType;
  content: string;
  lastModified?: Date;
  fileSize?: number;
}

/**
 * Error types for content loading
 */
export class MarkdownContentError extends Error {
  constructor(
    message: string,
    public contentType: MarkdownContentType,
    public cause?: Error
  ) {
    super(message);
    this.name = 'MarkdownContentError';
  }
}

/**
 * Content reader configuration
 */
export interface ContentReaderConfig {
  enableCaching?: boolean;
  fallbackContent?: string;
  throwOnMissing?: boolean;
}

/**
 * Cache entry interface for internal use
 */
export interface CacheEntry {
  content: string;
  timestamp: number;
  lastModified?: Date;
}

/**
 * Cache statistics interface
 */
export interface CacheStats {
  size: number;
  entries: Array<{
    type: MarkdownContentType;
    timestamp: number;
    isValid: boolean;
  }>;
}

/**
 * Available markdown content files mapping
 */
export const MARKDOWN_FILES: Record<MarkdownContentType, string> = {
  'demo': 'demo.md',
  'short-demo': 'short-demo.md',
  'math-test': 'math-test.md',
} as const;

/**
 * Default fallback content for missing files
 */
export const DEFAULT_FALLBACK_CONTENT = `# Content Not Available

Sorry, the requested content could not be loaded at this time.

## What you can do:
- Try refreshing the page
- Check your internet connection
- Contact support if the problem persists

> This is a fallback message displayed when content files are unavailable.`;

/**
 * All available markdown content types as array
 */
export const AVAILABLE_CONTENT_TYPES: MarkdownContentType[] = ['demo', 'short-demo', 'math-test'];