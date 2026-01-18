import Container from "@/app/_components/container";

export function Footer() {
  const contactHref =
    "mailto:contact@example.com?subject=Contact%20from%20tech-blog&body=Hi%20SugaStack%2C%0D%0A";

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-16 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 lg:max-w-xl">
            <h3 className="text-3xl lg:text-[2.4rem] font-bold tracking-tight leading-tight text-slate-900 dark:text-slate-50">
              学びをアウトプットするブログ
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              日々の学習や実践で得た知見を少しずつ共有していきます。<br/>ご意見・ご連絡は「Contact me」からどうぞ。
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-md border border-black bg-black px-12 py-3 text-sm font-semibold text-white transition duration-150 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:border-white dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-100"
              aria-label="Contact me by email"
            >
              Contact me
            </a>
            <a
              href={`https://github.com/fumasuga`}
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:text-slate-200 dark:hover:text-white dark:focus-visible:ring-slate-200"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
