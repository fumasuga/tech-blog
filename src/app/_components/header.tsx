import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";
import DateLabel from "./date-label";
import { SocialLinkIcons } from "./social-link-icons";

export default function Header() {
  return (
    <header className="mb-12 mt-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <Link
              href="/"
              className="text-lg sm:text-xl font-normal tracking-tight hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded shrink-0"
            >
              SugaStack
            </Link>
            <SocialLinkIcons className="pb-px" iconClassName="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <nav className="flex items-center gap-3 sm:gap-6 shrink-0">
            <Link
              href="/cv"
              className="text-sm sm:text-base font-normal hover:opacity-70 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded px-2 py-1"
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
