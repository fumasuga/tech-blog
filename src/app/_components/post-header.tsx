import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type PostHeaderProps = {
  title: string;
  date: string;
};

export function PostHeader({ title, date }: PostHeaderProps) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
