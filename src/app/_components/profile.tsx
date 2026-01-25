import Image from "next/image";

export function Profile() {
  return (
    <article className="mb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-105 p-2">
            <Image
              src="/favicon/egg-fried.svg"
              alt="Profile"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-normal text-slate-900 dark:text-slate-100">
            @fumasuga
          </h1>
        </div>
      </div>
    </article>
  );
}
