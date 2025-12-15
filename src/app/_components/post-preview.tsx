import Link from "next/link";

import { Post } from "@/interfaces/post";
import DateFormatter from "./date-formatter";

type PostPreviewProps = Pick<Post, "title" | "slug" | "date"> & {
  excerpt?: string;
};

export function PostPreview({
  title,
  date,
  slug,
  excerpt,
}: PostPreviewProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white/70 shadow-sm transition duration-150 hover:border-slate-300 hover:shadow-md focus-within:border-slate-300 focus-within:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-slate-700">
      <Link
        href={`/posts/${slug}`}
        className="block h-full space-y-3 px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <DateFormatter dateString={date} />
          </span>
        </div>
        {excerpt ? (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {excerpt}
          </p>
        ) : null}
      </Link>
    </article>
  );
}
