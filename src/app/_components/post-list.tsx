import { Post } from "@/interfaces/post";
import { normalizeTechTags } from "@/lib/tech-tags";

import { PostPreview } from "./post-preview";

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <section className="flex flex-col gap-1">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
          tags={normalizeTechTags(post.tags)}
        />
      ))}
    </section>
  );
}
