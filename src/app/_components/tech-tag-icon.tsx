import type { SimpleIcon } from "simple-icons";
import {
  siDocker,
  siFirebase,
  siGithub,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
  siZenn,
} from "simple-icons";
import type { TechTagId } from "@/lib/tech-tags";

const TECH_TAG_ICONS: Record<TechTagId, SimpleIcon> = {
  nextjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  nodejs: siNodedotjs,
  firebase: siFirebase,
  docker: siDocker,
  github: siGithub,
  zenn: siZenn,
  tailwind: siTailwindcss,
};

/** ダーク背景で見えにくいロゴはライト色に差し替える */
const DARK_MODE_ICON_FILL: Partial<Record<TechTagId, string>> = {
  nextjs: "#FFFFFF",
  github: "#FFFFFF",
};

type TechTagIconProps = {
  tag: TechTagId;
};

export function TechTagIcon({ tag }: TechTagIconProps) {
  const icon = TECH_TAG_ICONS[tag];
  const lightFill = `#${icon.hex}`;
  const darkFill = DARK_MODE_ICON_FILL[tag] ?? lightFill;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3 shrink-0"
      aria-hidden="true"
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill={lightFill} className="dark:hidden" />
      <path d={icon.path} fill={darkFill} className="hidden dark:block" />
    </svg>
  );
}
