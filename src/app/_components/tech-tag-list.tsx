import type { TechTagId } from "@/lib/tech-tags";
import { TECH_TAG_LABELS } from "@/lib/tech-tags";
import { TechTagIcon } from "./tech-tag-icon";

type TechTagListProps = {
  tags: TechTagId[];
};

export function TechTagList({ tags }: TechTagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="関連技術">
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300"
        >
          <TechTagIcon tag={tag} />
          <span>{TECH_TAG_LABELS[tag]}</span>
        </li>
      ))}
    </ul>
  );
}
