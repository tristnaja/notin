import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-[48px] font-extrabold mb-8 leading-tight" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-[36px] font-bold mb-6 mt-12 leading-tight" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-[28px] font-bold mb-4 mt-10 leading-tight" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-[24px] font-semibold mb-4 mt-8 leading-tight" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="text-[20px] font-semibold mb-3 mt-6 leading-tight" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="text-[18px] font-medium mb-3 mt-6 leading-tight" {...props}>
              {children}
            </h6>
          ),
          p: ({ children, ...props }) => (
            <p className="text-[24px] font-normal mb-6 leading-relaxed" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="ml-6 mb-6 space-y-2 list-disc" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="ml-6 mb-6 space-y-2 list-decimal" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-[24px] font-normal leading-relaxed" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-gray-600 pl-6 my-6 italic text-gray-300" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ children, className, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className;
            
            if (isInline) {
              return (
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-[20px] font-mono" {...props}>
                  {children}
                </code>
              );
            }
            
            return (
              <div className="mb-6">
                <SyntaxHighlighter
                  style={oneDark}
                  language={language || 'text'}
                  PreTag="div"
                  className="rounded-lg !p-4 !bg-[#282c34] overflow-x-auto"
                  customStyle={{
                    margin: 0,
                    fontSize: '18px',
                    lineHeight: '1.5',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          },
          pre: ({ children }) => (
            <div className="mb-6">
              {children}
            </div>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-white" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-gray-200" {...props}>
              {children}
            </em>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-600" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="border-b border-gray-600" {...props}>
              {children}
            </tr>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-gray-600 px-4 py-2 text-[20px]" {...props}>
              {children}
            </td>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-gray-600 px-4 py-2 text-[20px] font-semibold text-left" {...props}>
              {children}
            </th>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}