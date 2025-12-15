import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

const PAGE_LINK_BASE = "/";

function buildHref(page: number, basePath?: string) {
  const prefix = basePath ?? PAGE_LINK_BASE;
  return page === 1 ? prefix : `${prefix}?page=${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const pageItems = [
    prevPage ?? currentPage,
    currentPage,
    nextPage ?? currentPage,
  ].filter((page, index, self) => self.indexOf(page) === index);

  return (
    <nav
      className="mx-auto mt-10 items-center px-4 py-3 text-sm text-slate-700 dark:text-slate-200"
      aria-label="記事一覧のページング"
    >
      <div className="flex justify-center items-center gap-2">
        {prevPage ? (
          <Link
            className="rounded-md px-3 py-2 font-medium transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
            href={buildHref(prevPage, basePath)}
          >
            前へ
          </Link>
        ) : (
          <span className="rounded-md px-3 py-2 font-medium opacity-50 cursor-not-allowed">
            前へ
          </span>
        )}
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {currentPage} / {totalPages}
        </div>
        {nextPage ? (
          <Link
            className="rounded-md px-3 py-2 font-medium transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
            href={buildHref(nextPage, basePath)}
          >
            次へ
          </Link>
        ) : (
          <span className="rounded-md px-3 py-2 font-medium opacity-50 cursor-not-allowed">
            次へ
          </span>
        )}
      </div>
    </nav>
  );
}

