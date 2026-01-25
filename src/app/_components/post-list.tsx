import { Post } from "@/interfaces/post";

import { PostPreview } from "./post-preview";

type PostListProps = {
  posts: Post[];
};

function buildExcerpt(content: string | undefined, fallback?: string) {
  if (!content) {
    return fallback;
  }

  const firstParagraph = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)[0];

  const rawExcerpt = firstParagraph || fallback || "";
  const plainExcerpt = rawExcerpt
    .replace(/[#>*`]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainExcerpt) {
    return "本文の概要が準備中です。";
  }

  return plainExcerpt.length > 140
    ? `${plainExcerpt.slice(0, 140)}…`
    : plainExcerpt;
}

export function PostList({ posts }: PostListProps) {
  return (
    <section className="flex flex-col gap-1">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
          excerpt={post.excerpt || buildExcerpt(post.content, post.excerpt)}
        />
      ))}
    </section>
  );
}

