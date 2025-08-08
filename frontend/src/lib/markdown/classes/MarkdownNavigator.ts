import { MarkdownContentType } from '../types';
import { MarkdownContentManager } from './MarkdownContentManager';

export class MarkdownNavigator {
  private contentManager: MarkdownContentManager;
  private currentIndex: number = 0;
  private onNavigate?: (type: MarkdownContentType, content: string) => void;

  constructor(contentManager: MarkdownContentManager) {
    this.contentManager = contentManager;
    this.currentIndex = contentManager.getCurrentIndex();
  }

  public async next(): Promise<void> {
    const availableFiles = this.contentManager.getAvailableFiles();
    
    if (this.canGoNext()) {
      this.currentIndex++;
      const nextType = availableFiles[this.currentIndex];
      await this.goTo(nextType);
    }
  }

  public async previous(): Promise<void> {
    const availableFiles = this.contentManager.getAvailableFiles();
    
    if (this.canGoPrevious()) {
      this.currentIndex--;
      const prevType = availableFiles[this.currentIndex];
      await this.goTo(prevType);
    }
  }

  public async goTo(type: MarkdownContentType): Promise<void> {
    try {
      const content = await this.contentManager.loadContent(type);
      const availableFiles = this.contentManager.getAvailableFiles();
      this.currentIndex = availableFiles.indexOf(type);
      
      if (this.onNavigate) {
        this.onNavigate(type, content);
      }
    } catch (error) {
      console.error(`Navigation to ${type} failed:`, error);
      throw error;
    }
  }

  public async goToIndex(index: number): Promise<void> {
    const availableFiles = this.contentManager.getAvailableFiles();
    
    if (index >= 0 && index < availableFiles.length) {
      const type = availableFiles[index];
      await this.goTo(type);
    } else {
      throw new Error(`Invalid index: ${index}. Valid range: 0-${availableFiles.length - 1}`);
    }
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getCurrentType(): MarkdownContentType {
    const availableFiles = this.contentManager.getAvailableFiles();
    return availableFiles[this.currentIndex];
  }

  public canGoNext(): boolean {
    return this.currentIndex < this.contentManager.getAvailableFiles().length - 1;
  }

  public canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  public getTotalFiles(): number {
    return this.contentManager.getFileCount();
  }

  public getNavigationInfo() {
    const availableFiles = this.contentManager.getAvailableFiles();
    return {
      currentIndex: this.currentIndex,
      currentType: availableFiles[this.currentIndex],
      totalFiles: this.getTotalFiles(),
      canGoNext: this.canGoNext(),
      canGoPrevious: this.canGoPrevious(),
      progress: `${this.currentIndex + 1} of ${this.getTotalFiles()}`
    };
  }

  public setNavigationCallback(callback: (type: MarkdownContentType, content: string) => void): void {
    this.onNavigate = callback;
  }

  public removeNavigationCallback(): void {
    this.onNavigate = undefined;
  }

  public getAvailableFiles(): MarkdownContentType[] {
    return this.contentManager.getAvailableFiles();
  }

  public async preloadAll(allContent: Record<MarkdownContentType, string>): Promise<void> {
    try {
      await this.contentManager.loadAllContent(allContent);
    } catch (error) {
      console.error('Failed to preload all content:', error);
    }
  }
}