import { Suspense } from "react";
import Container from "@/app/_components/container";
import { PostListClient } from "@/app/_components/post-list-client";
import { getAllPosts } from "@/lib/api";

function PostListFallback() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4">
        <div className="h-20 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-20 animate-pulse bg-slate-200 dark:bg-slate-800 rounded" />
      </section>
    </div>
  );
}

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <Suspense fallback={<PostListFallback />}>
          <PostListClient allPosts={allPosts} postsPerPage={5} />
        </Suspense>
      </Container>
    </main>
  );
}
