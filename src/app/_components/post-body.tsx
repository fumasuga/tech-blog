import markdownStyles from "./markdown-styles.module.css";

type PostBodyProps = {
  content: string;
};

export function PostBody({ content }: PostBodyProps) {
  return (
    <div
      suppressHydrationWarning
      className={`max-w-4xl mx-auto znc ${markdownStyles["markdown"]}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
