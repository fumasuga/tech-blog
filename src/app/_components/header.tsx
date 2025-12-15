import Link from "next/link";
import DateLabel from "./date-label";

export default function Header() {
  return (
    <section className="ml-2 mb-3 mt-2 md:mb-6 border-b pb-2">
      <div className="container mx-auto px-5 flex flex-row justify-between items-center">
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight mb-0">
          <Link href="/" className="hover:underline">
            SugaStack
          </Link>
          .
        </h2>
        <DateLabel />
      </div>
    </section>
  );
}
