import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import DateLabel from "./date-label";

export default function Header() {
  return (
    <header className="mb-12 mt-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-normal hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
          >
            SugaStack
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/blog"
              className="text-sm font-normal hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded px-2 py-1"
            >
              blog
            </Link>
            <Link
              href="/cv"
              className="text-sm font-normal hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded px-2 py-1"
            >
              cv
            </Link>
            <DarkModeToggle />
            <div className="hidden sm:block">
              <DateLabel />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
