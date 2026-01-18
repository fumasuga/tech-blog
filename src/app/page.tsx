import { Suspense } from "react";
import Container from "@/app/_components/container";
import { PostListClient } from "@/app/_components/post-list-client";
import { getAllPosts } from "@/lib/api";

function PostListFallback() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-4">
        <div className="h-32 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-32 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </section>
    </div>
  );
}

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <section className="mb-12 space-y-3 border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            最近の投稿
          </h1>
        </section>

        <Suspense fallback={<PostListFallback />}>
          <div className="space-y-10">
            <PostListClient allPosts={allPosts} postsPerPage={4} />
          </div>
        </Suspense>
      </Container>
    </main>
  );
}
