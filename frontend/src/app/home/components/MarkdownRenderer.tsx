import {
  MarkdownRendererEngine,
  MarkdownRendererConfig,
} from "../../../lib/markdown";
import styles from "./styles/MarkdownRenderer.module.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  config?: MarkdownRendererConfig;
}

/**
 * A component to render markdown content with syntax highlighting and LaTeX support.
 * @param content The markdown content to render.
 * @param className Additional classes to apply to the component.
 * @param config A configuration object for the markdown renderer.
 */
export default function MarkdownRenderer({
  content,
  className = "",
  config,
}: MarkdownRendererProps) {
  const engine = new MarkdownRendererEngine(config);
  return (
    <div className={`${className} ${styles.prose} prose-responsive`}>
      {engine.render(content, "")}
    </div>
  );
}