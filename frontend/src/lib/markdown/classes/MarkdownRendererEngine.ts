import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MarkdownRendererConfig, ConfigOptions } from './MarkdownRendererConfig';

export class MarkdownRendererEngine {
  private config: MarkdownRendererConfig;

  constructor(config?: MarkdownRendererConfig) {
    this.config = config || new MarkdownRendererConfig();
  }

  public render(content: string, className: string = ""): React.JSX.Element {
    const { remarkPlugins, rehypePlugins, components } = this.config.getConfig();

    return React.createElement(
      'div',
      { 
        className: `prose prose-invert max-w-none ${className}`.trim()
      },
      React.createElement(ReactMarkdown, {
        remarkPlugins: remarkPlugins as never,
        rehypePlugins: rehypePlugins as never,
        components
      }, content)
    );
  }

  public updateConfig(config: MarkdownRendererConfig): void {
    this.config = config;
  }

  public getConfig(): MarkdownRendererConfig {
    return this.config;
  }

  public createNewConfig(options?: ConfigOptions): MarkdownRendererConfig {
    return new MarkdownRendererConfig(options);
  }

  public resetToDefaults(): void {
    this.config = new MarkdownRendererConfig();
  }

  public cloneEngine(): MarkdownRendererEngine {
    return new MarkdownRendererEngine(this.config);
  }
}