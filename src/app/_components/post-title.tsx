import { ReactNode } from "react";

type PostTitleProps = {
  children?: ReactNode;
};

export function PostTitle({ children }: PostTitleProps) {
  return (
    <h1 className="text-[16px] font-semibold tracking-tight leading-snug mb-6 md:text-6xl md:font-normal md:leading-none lg:text-7xl md:mb-12 text-center md:text-left text-slate-900 dark:text-slate-100">
      {children}
    </h1>
  );
}
