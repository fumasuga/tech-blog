import { ReactNode } from "react";

type PostTitleProps = {
  children?: ReactNode;
};

export function PostTitle({ children }: PostTitleProps) {
  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-tight md:leading-none mb-12 text-center md:text-left text-slate-900 dark:text-slate-100">
      {children}
    </h1>
  );
}
