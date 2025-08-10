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
