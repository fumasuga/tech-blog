"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type PostListClientProps = {
  allPosts: Post[];
  postsPerPage?: number;
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

const PAGE_LINK_BASE = "/blog";

function buildHref(page: number, basePath?: string) {
  const prefix = basePath ?? PAGE_LINK_BASE;
  return page === 1 ? prefix : `${prefix}?page=${page}`;
}

type PaginationClientProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

function PaginationClient({
  currentPage,
  totalPages,
  basePath,
}: PaginationClientProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav
      className="mx-auto mt-12 items-center px-4 py-3 text-sm"
      aria-label="記事一覧のページング"
    >
      <div className="flex justify-center items-center gap-6">
        {prevPage ? (
          <Link
            className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            href={buildHref(prevPage, basePath)}
          >
            前へ
          </Link>
        ) : (
          <span className="px-4 py-2 opacity-50 cursor-not-allowed">
            前へ
          </span>
        )}
        <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
          {currentPage} / {totalPages}
        </div>
        {nextPage ? (
          <Link
            className="px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            href={buildHref(nextPage, basePath)}
          >
            次へ
          </Link>
        ) : (
          <span className="px-4 py-2 opacity-50 cursor-not-allowed">
            次へ
          </span>
        )}
      </div>
    </nav>
  );
}

export function PostListClient({
  allPosts,
  postsPerPage = 6,
}: PostListClientProps) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのみsearchParamsを読み取る
  useEffect(() => {
    setMounted(true);
  }, []);

  const pageParam = mounted ? searchParams.get("page") ?? "1" : "1";

  const { currentPage, totalPages, visiblePosts } = useMemo(() => {
    const total = Math.max(1, Math.ceil(allPosts.length / postsPerPage));
    const current = Math.min(
      Math.max(Number.parseInt(pageParam, 10) || 1, 1),
      total
    );
    const start = (current - 1) * postsPerPage;
    const visible = allPosts.slice(start, start + postsPerPage);

    return {
      currentPage: current,
      totalPages: total,
      visiblePosts: visible,
    };
  }, [allPosts, postsPerPage, pageParam, mounted]);

  const postsWithExcerpt = useMemo(
    () =>
      visiblePosts.map((post) => ({
        ...post,
        excerpt: post.excerpt || buildExcerpt(post.content, post.excerpt),
      })),
    [visiblePosts]
  );

  return (
    <>
      <section className="flex flex-col gap-1 mb-8">
        {postsWithExcerpt.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </section>
      <PaginationClient currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

