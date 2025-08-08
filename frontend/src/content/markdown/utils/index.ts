/**
 * Markdown Content Reader - Public API
 * 
 * This module provides utilities for reading markdown content from files
 * with caching, error handling, and type safety.
 */

// Export types
export type {
  MarkdownContentType,
  MarkdownContent,
  ContentReaderConfig
} from './types';

// Export error class
export { MarkdownContentError } from './types';

// Export constants
export { MARKDOWN_FILES, DEFAULT_FALLBACK_CONTENT } from './types';

// Export main reader functions
export {
  getMarkdownContent,
  getAllMarkdownContent,
  getMarkdownContentWithMetadata,
  clearContentCache,
  getCacheStats
} from './reader';

// Re-export for convenience
export { getMarkdownContent as readMarkdown } from './reader';