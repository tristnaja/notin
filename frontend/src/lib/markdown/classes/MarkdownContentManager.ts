import { 
  MarkdownContentType, 
  MarkdownContent,
  AVAILABLE_CONTENT_TYPES
} from '../types';

export class MarkdownContentManager {
  private currentContent: string = '';
  private currentType: MarkdownContentType = 'demo';
  private availableFiles: MarkdownContentType[] = AVAILABLE_CONTENT_TYPES;
  private contentCache: Map<MarkdownContentType, string> = new Map();

  constructor() {}

  public async loadContent(type: MarkdownContentType, content?: string): Promise<string> {
    if (content) {
      this.contentCache.set(type, content);
      this.currentContent = content;
      this.currentType = type;
      return content;
    }

    if (this.contentCache.has(type)) {
      this.currentContent = this.contentCache.get(type)!;
      this.currentType = type;
      return this.currentContent;
    }

    throw new Error(`No content available for ${type}. Content must be loaded server-side first.`);
  }

  public async loadAllContent(allContent: Record<MarkdownContentType, string>): Promise<Record<MarkdownContentType, string>> {
    Object.entries(allContent).forEach(([type, content]) => {
      this.contentCache.set(type as MarkdownContentType, content);
    });

    return allContent;
  }

  public getContentWithMetadata(type: MarkdownContentType): MarkdownContent {
    const content = this.contentCache.get(type);
    if (!content) {
      throw new Error(`No content available for ${type}`);
    }

    return {
      type,
      content,
      lastModified: undefined,
      fileSize: undefined
    };
  }

  public getCurrentContent(): string {
    return this.currentContent;
  }

  public getCurrentType(): MarkdownContentType {
    return this.currentType;
  }

  public getAvailableFiles(): MarkdownContentType[] {
    return [...this.availableFiles];
  }

  public getFileCount(): number {
    return this.availableFiles.length;
  }

  public getCurrentIndex(): number {
    return this.availableFiles.indexOf(this.currentType);
  }

  public async setCurrentContent(content: string, type?: MarkdownContentType): Promise<void> {
    this.currentContent = content;
    if (type) {
      this.currentType = type;
      this.contentCache.set(type, content);
    }
  }

  public clearCache(): void {
    this.contentCache.clear();
  }

  public getCachedContent(type: MarkdownContentType): string | undefined {
    return this.contentCache.get(type);
  }

  public isCached(type: MarkdownContentType): boolean {
    return this.contentCache.has(type);
  }

  public getFileDisplayName(type: MarkdownContentType): string {
    const displayNames: Record<MarkdownContentType, string> = {
      'demo': 'Full Demo',
      'short-demo': 'Quick Demo',
      'math-test': 'Math Examples'
    };
    return displayNames[type] || type;
  }

  public getFileDescription(type: MarkdownContentType): string {
    const descriptions: Record<MarkdownContentType, string> = {
      'demo': 'Comprehensive markdown demonstration with all features',
      'short-demo': 'Quick overview of basic markdown formatting',
      'math-test': 'Mathematical expressions and LaTeX examples'
    };
    return descriptions[type] || 'Markdown content file';
  }
}