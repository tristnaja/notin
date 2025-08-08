/**
 * Server-side I/O operations for markdown content
 * 
 * These classes handle file system operations and should only be used server-side
 * as they depend on Node.js fs module.
 */

export { MarkdownFileReader } from './MarkdownFileReader';
export { MarkdownCache } from './MarkdownCache';
export { MarkdownPathResolver } from './MarkdownPathResolver';

// Convenience functions that match the original API
import { MarkdownFileReader } from './MarkdownFileReader';
import { ContentReaderConfig, MarkdownContentType, MarkdownContent } from '../types';

// Global instance for convenience functions (server-side only)
const defaultReader = new MarkdownFileReader();

/**
 * Read markdown content from file (server-side only)
 */
export async function getMarkdownContent(
  contentType: MarkdownContentType,
  config?: ContentReaderConfig
): Promise<string> {
  return defaultReader.readContent(contentType, config);
}

/**
 * Read all available markdown content (server-side only)
 */
export async function getAllMarkdownContent(
  config?: ContentReaderConfig
): Promise<Record<MarkdownContentType, string>> {
  return defaultReader.readAllContent(config);
}

/**
 * Read markdown content with metadata (server-side only)
 */
export async function getMarkdownContentWithMetadata(
  contentType: MarkdownContentType,
  config?: ContentReaderConfig
): Promise<MarkdownContent> {
  return defaultReader.readContentWithMetadata(contentType, config);
}

/**
 * Clear the default reader's cache (server-side only)
 */
export function clearContentCache(): void {
  defaultReader.clearCache();
}

/**
 * Get cache statistics from default reader (server-side only)
 */
export function getCacheStats() {
  return defaultReader.getCacheStats();
}