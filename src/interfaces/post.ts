import type { TechTagId } from "@/lib/tech-tags";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: TechTagId[];
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
