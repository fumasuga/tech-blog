import markdownStyles from "./markdown-styles.module.css";

type PostBodyProps = {
  content: string;
};

export function PostBody({ content }: PostBodyProps) {
  return (
    <div className="max-w-4xl mx-auto znc">
      <div
        suppressHydrationWarning
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
