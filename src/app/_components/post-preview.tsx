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
    <article className="group">
      <Link
        href={`/posts/${slug}`}
        className="block py-3 px-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-between gap-x-3 gap-y-0.5">
            <h3 className="flex-1 min-w-0 text-sm sm:text-base font-normal leading-snug tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
              {title}
            </h3>
            <span className="shrink-0 text-[11px] sm:text-xs tabular-nums whitespace-nowrap text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200">
              <DateFormatter dateString={date} />
            </span>
          </div>
          {excerpt && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}