"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const A: React.FC<{ node: any; children: any }> = ({
  node,
  children,
  ...props
}) => (
  <a {...props} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

interface IMarkdownViewerProps {
  text: string;
}

export const MarkdownViewer = ({ text }: IMarkdownViewerProps) => {
  const components = {
    a: A,
  };
  return (
    <div className="prose prose-blue max-w-none px-4">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        className="markdown"
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
