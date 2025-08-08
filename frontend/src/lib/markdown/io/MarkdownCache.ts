import { MarkdownContentType, CacheEntry, CacheStats } from '../types';

/**
 * Manages in-memory caching for markdown content
 */
export class MarkdownCache {
  private cache: Map<MarkdownContentType, CacheEntry> = new Map();
  private cacheDuration: number;

  constructor(cacheDurationMs?: number) {
    // 5 minutes in production, no caching in development
    this.cacheDuration = cacheDurationMs ?? 
      (process.env.NODE_ENV === 'production' ? 5 * 60 * 1000 : 0);
  }

  /**
   * Check if a cache entry is still valid
   */
  private isCacheValid(entry: CacheEntry): boolean {
    if (this.cacheDuration === 0) return false; // No caching in development
    return Date.now() - entry.timestamp < this.cacheDuration;
  }

  /**
   * Get cached content if valid
   */
  public get(contentType: MarkdownContentType): string | null {
    const entry = this.cache.get(contentType);
    
    if (!entry) {
      return null;
    }

    if (!this.isCacheValid(entry)) {
      this.cache.delete(contentType);
      return null;
    }

    return entry.content;
  }

  /**
   * Set cached content
   */
  public set(contentType: MarkdownContentType, content: string, lastModified?: Date): void {
    const entry: CacheEntry = {
      content,
      timestamp: Date.now(),
      lastModified
    };

    this.cache.set(contentType, entry);
  }

  /**
   * Check if content is cached and valid
   */
  public has(contentType: MarkdownContentType): boolean {
    return this.get(contentType) !== null;
  }

  /**
   * Clear specific cached content
   */
  public delete(contentType: MarkdownContentType): boolean {
    return this.cache.delete(contentType);
  }

  /**
   * Clear all cached content
   */
  public clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public getStats(): CacheStats {
    const entries = Array.from(this.cache.entries()).map(([type, data]) => ({
      type,
      timestamp: data.timestamp,
      isValid: this.isCacheValid(data)
    }));

    return {
      size: this.cache.size,
      entries
    };
  }

  /**
   * Get cache size
   */
  public size(): number {
    return this.cache.size;
  }

  /**
   * Get all cached content types
   */
  public getCachedTypes(): MarkdownContentType[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Update cache duration
   */
  public setCacheDuration(durationMs: number): void {
    this.cacheDuration = durationMs;
  }

  /**
   * Get current cache duration
   */
  public getCacheDuration(): number {
    return this.cacheDuration;
  }
}