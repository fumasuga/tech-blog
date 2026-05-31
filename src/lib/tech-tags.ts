export const TECH_TAG_IDS = [
  "nextjs",
  "react",
  "typescript",
  "nodejs",
  "firebase",
  "docker",
  "github",
  "zenn",
  "tailwind",
] as const;

export type TechTagId = (typeof TECH_TAG_IDS)[number];

export const TECH_TAG_LABELS: Record<TechTagId, string> = {
  nextjs: "Next.js",
  react: "React",
  typescript: "TypeScript",
  nodejs: "Node.js",
  firebase: "Firebase",
  docker: "Docker",
  github: "GitHub",
  zenn: "Zenn",
  tailwind: "Tailwind",
};

export function isTechTagId(value: string): value is TechTagId {
  return value in TECH_TAG_LABELS;
}

export function normalizeTechTags(tags: unknown): TechTagId[] {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags.filter(
    (tag): tag is TechTagId => typeof tag === "string" && isTechTagId(tag)
  );
}
