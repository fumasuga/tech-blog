import type { Metadata } from "next";
import Container from "@/app/_components/container";

export const metadata: Metadata = {
  title: "CV",
  description: "ソフトウェアエンジニアの経歴・スキル・実績",
};

const skills = [
  "C#",
  "TypeScript / JavaScript / Node.js",
  "React.js / Next.js",
  "Git / GitHub",
  "HTML / CSS / Bootstrap",
];

const achievements = [
  "フロントエンドおよびバックエンド双方の開発経験",
  "テストの設計および開発",
  "Webアプリケーションの設計・開発",
  "RESTful API およびバッチ処理の設計・開発",
  "社内プロジェクトにおけるスクラムマスターの経験",
  "AIを活用した業務効率化のための自作アプリケーション開発",
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10 md:mb-12">
      <h2 className="text-sm md:text-lg font-semibold md:font-medium tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function CVPage() {
  return (
    <main>
      <Container>
        <article className="mb-12 md:mb-16">
          <header className="mb-8 md:mb-10">
            <h1 className="text-xl md:text-3xl font-semibold md:font-normal tracking-tight text-slate-900 dark:text-slate-100 mb-2">
              Fuma Suga
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              Software Engineer
            </p>
          </header>

          <Section title="プロフィール">
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                現在4年目のエンジニアです。私のキャリアは、1年間のソフトウェアテスターとしてシステムのデバッグや不具合修正に注力することから始まりました。この経験で培った品質に対する意識は、現在の開発業務における基礎となっています。
              </p>
              <p>
                その後、社内基幹システムのフロントエンドおよびバックエンドの設計・開発に従事しました。これまでの経験から、チームコミュニケーションとタスク管理が自身の強みであると自負しています。
              </p>
              <p>
                新しい技術の習得にも意欲的です。プロジェクトへの途中参画を多く経験してきましたが、未経験の技術も迅速にキャッチアップし、貢献してきました。
              </p>
              <p>
                現在は、AIを活用した業務効率化のための自作アプリケーション開発に取り組んでいます。
              </p>
            </div>
          </Section>

          <Section title="実績・経験">
            <ul className="space-y-2 text-sm md:text-base text-slate-700 dark:text-slate-200">
              {achievements.map((item) => (
                <li key={item} className="flex gap-2 leading-relaxed">
                  <span
                    className="shrink-0 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="今後やりたいこと">
            <p className="text-sm md:text-base leading-relaxed text-slate-700 dark:text-slate-200">
              アプリケーション開発において技術を吸収し、プロジェクトへ還元していきたいと考えています。それを通じて、最終的にエンドユーザーへ高い価値を提供するプロダクトを開発することが目標です。
            </p>
          </Section>

          <Section title="スキル（実務経験・学習中）">
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs md:text-sm text-slate-700 dark:text-slate-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Section>
        </article>
      </Container>
    </main>
  );
}
