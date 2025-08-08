import path from 'path';
import { MarkdownContentType, MARKDOWN_FILES } from '../types';

/**
 * Handles path resolution for markdown files
 */
export class MarkdownPathResolver {
  private basePath: string;

  constructor(customBasePath?: string) {
    this.basePath = customBasePath || process.cwd();
  }

  /**
   * Get the absolute file path for a markdown content type
   */
  public getFilePath(contentType: MarkdownContentType): string {
    const filename = MARKDOWN_FILES[contentType];
    return path.join(this.basePath, 'src', 'content', 'markdown', filename);
  }

  /**
   * Get all file paths as a record
   */
  public getAllFilePaths(): Record<MarkdownContentType, string> {
    const paths: Partial<Record<MarkdownContentType, string>> = {};
    
    (Object.keys(MARKDOWN_FILES) as MarkdownContentType[]).forEach(type => {
      paths[type] = this.getFilePath(type);
    });

    return paths as Record<MarkdownContentType, string>;
  }

  /**
   * Get the filename for a content type
   */
  public getFileName(contentType: MarkdownContentType): string {
    return MARKDOWN_FILES[contentType];
  }

  /**
   * Get the base directory path
   */
  public getBasePath(): string {
    return this.basePath;
  }

  /**
   * Update the base path
   */
  public setBasePath(newBasePath: string): void {
    this.basePath = newBasePath;
  }
}