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
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-normal leading-snug text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
              {title}
            </h3>
            {excerpt && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {excerpt}
              </p>
            )}
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-300 self-start sm:self-auto group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors duration-200">
            <DateFormatter dateString={date} />
          </span>
        </div>
      </Link>
    </article>
  );
}