import { MarkdownRendererEngine, MarkdownRendererConfig } from '../../../lib/markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  config?: MarkdownRendererConfig;
}

export default function MarkdownRenderer({ 
  content, 
  className = "",
  config
}: MarkdownRendererProps) {
  const engine = new MarkdownRendererEngine(config);
  return engine.render(content, className);
}