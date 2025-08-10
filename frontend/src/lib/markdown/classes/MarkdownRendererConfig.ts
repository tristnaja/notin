import React from 'react';
import { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type PluggableList = unknown[];

export interface ConfigOptions {
  enableMath?: boolean;
  enableGfm?: boolean;
  syntaxHighlighting?: boolean;
  customComponents?: Partial<Components>;
}

export class MarkdownRendererConfig {
  private remarkPlugins: PluggableList;
  private rehypePlugins: PluggableList;
  private components: Components;

  constructor(options: ConfigOptions = {}) {
    const {
      enableMath = true,
      enableGfm = true,
      syntaxHighlighting = true,
      customComponents = {}
    } = options;

    this.remarkPlugins = [];
    this.rehypePlugins = [];
    this.components = {};

    this.initializeDefaults();
    
    if (enableGfm) {
      this.addRemarkPlugin(remarkGfm);
    }
    
    if (enableMath) {
      this.addRemarkPlugin(remarkMath);
      this.addRehypePlugin(rehypeKatex);
    }

    if (syntaxHighlighting) {
      this.setupSyntaxHighlighting();
    }

    this.mergeComponents(customComponents);
  }

  private initializeDefaults(): void {
    this.components = {
      h1: ({ children, ...props }) => 
        React.createElement('h1', {
          className: "font-extrabold mb-4 sm:mb-6 md:mb-8 leading-tight",
          style: { fontSize: 'clamp(1.75rem, 4vw, 3rem)' },
          ...props
        }, children),
      h2: ({ children, ...props }) => 
        React.createElement('h2', {
          className: "font-bold mb-3 sm:mb-4 md:mb-6 mt-8 sm:mt-10 md:mt-12 leading-tight",
          style: { fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' },
          ...props
        }, children),
      h3: ({ children, ...props }) => 
        React.createElement('h3', {
          className: "font-bold mb-3 sm:mb-4 mt-6 sm:mt-8 md:mt-10 leading-tight",
          style: { fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' },
          ...props
        }, children),
      h4: ({ children, ...props }) => 
        React.createElement('h4', {
          className: "font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8 leading-tight",
          style: { fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' },
          ...props
        }, children),
      h5: ({ children, ...props }) => 
        React.createElement('h5', {
          className: "font-semibold mb-2 sm:mb-3 mt-4 sm:mt-6 leading-tight",
          style: { fontSize: 'clamp(1rem, 2vw, 1.25rem)' },
          ...props
        }, children),
      h6: ({ children, ...props }) => 
        React.createElement('h6', {
          className: "font-medium mb-2 sm:mb-3 mt-4 sm:mt-6 leading-tight",
          style: { fontSize: 'clamp(0.875rem, 1.8vw, 1.125rem)' },
          ...props
        }, children),
      p: ({ children, ...props }) => 
        React.createElement('p', {
          className: "font-normal text-justify mb-4 sm:mb-6 leading-relaxed",
          style: { fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' },
          ...props
        }, children),
      ul: ({ children, ...props }) => 
        React.createElement('ul', {
          className: "ml-3 sm:ml-4 md:ml-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2 list-disc",
          ...props
        }, children),
      ol: ({ children, ...props }) => 
        React.createElement('ol', {
          className: "ml-3 sm:ml-4 md:ml-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2 list-decimal",
          ...props
        }, children),
      li: ({ children, ...props }) => 
        React.createElement('li', {
          className: "font-normal leading-relaxed",
          style: { fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' },
          ...props
        }, children),
      blockquote: ({ children, ...props }) => 
        React.createElement('blockquote', {
          className: "border-l-4 border-gray-600 pl-3 sm:pl-4 md:pl-6 my-4 sm:my-6 italic text-gray-300",
          style: { fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' },
          ...props
        }, children),
      pre: ({ children }) => 
        React.createElement('div', {
          className: "mb-4 sm:mb-6"
        }, children),
      a: ({ children, href, ...props }) => 
        React.createElement('a', {
          href,
          className: "text-blue-400 hover:text-blue-300 underline transition-colors",
          target: "_blank",
          rel: "noopener noreferrer",
          ...props
        }, children),
      strong: ({ children, ...props }) => 
        React.createElement('strong', {
          className: "font-bold text-white",
          ...props
        }, children),
      em: ({ children, ...props }) => 
        React.createElement('em', {
          className: "italic text-gray-200",
          ...props
        }, children),
      table: ({ children, ...props }) => 
        React.createElement('div', {
          className: "overflow-x-auto mb-4 sm:mb-6"
        }, React.createElement('table', {
          className: "min-w-full border-collapse border border-gray-600",
          ...props
        }, children)),
      thead: ({ children, ...props }) => 
        React.createElement('thead', {
          className: "bg-gray-800",
          ...props
        }, children),
      tbody: ({ children, ...props }) => 
        React.createElement('tbody', props, children),
      tr: ({ children, ...props }) => 
        React.createElement('tr', {
          className: "border-b border-gray-600",
          ...props
        }, children),
      td: ({ children, ...props }) => 
        React.createElement('td', {
          className: "border border-gray-600 px-2 sm:px-3 md:px-4 py-1 sm:py-2",
          style: { fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)' },
          ...props
        }, children),
      th: ({ children, ...props }) => 
        React.createElement('th', {
          className: "border border-gray-600 px-2 sm:px-3 md:px-4 py-1 sm:py-2 font-semibold text-left",
          style: { fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)' },
          ...props
        }, children),
    };
  }

  private setupSyntaxHighlighting(): void {
    this.components.code = ({ children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const isInline = !className;
      
      if (isInline) {
        return React.createElement('code', {
          className: "bg-gray-800 text-green-400 px-1 sm:px-2 py-0.5 sm:py-1 rounded font-mono",
          style: { fontSize: 'clamp(0.75rem, 1.5vw, 1.25rem)' },
          ...props
        }, children);
      }
      
      return React.createElement('div', {
        className: "mb-4 sm:mb-6"
      }, React.createElement(SyntaxHighlighter as unknown as React.ComponentType<Record<string, unknown>>, {
        style: oneDark,
        language: language || 'text',
        PreTag: "div",
        className: "rounded-lg !p-2 sm:!p-3 md:!p-4 !bg-[#282c34] overflow-x-auto",
        customStyle: {
          margin: 0,
          fontSize: 'clamp(0.75rem, 1.5vw, 1.125rem)',
          lineHeight: '1.5',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
        }
      }, String(children).replace(/\n$/, '')));
    };
  }

  public addRemarkPlugin(plugin: unknown): this {
    this.remarkPlugins.push(plugin);
    return this;
  }

  public addRehypePlugin(plugin: unknown): this {
    this.rehypePlugins.push(plugin);
    return this;
  }

  public setComponent(name: keyof Components, component: Components[keyof Components]): this {
    (this.components as Record<string, unknown>)[name] = component;
    return this;
  }

  public mergeComponents(customComponents: Partial<Components>): this {
    this.components = { ...this.components, ...customComponents };
    return this;
  }

  public getRemarkPlugins(): PluggableList {
    return this.remarkPlugins;
  }

  public getRehypePlugins(): PluggableList {
    return this.rehypePlugins;
  }

  public getComponents(): Components {
    return this.components;
  }

  public getConfig() {
    return {
      remarkPlugins: this.remarkPlugins,
      rehypePlugins: this.rehypePlugins,
      components: this.components
    };
  }
}