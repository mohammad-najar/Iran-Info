import { Clock3 } from "lucide-react";

export default function ComingSoonPage({ title }) {
  return (
    <main className="grid min-h-screen place-items-center bg-transparent px-5 pb-24 pt-28 text-center md:pb-0 md:pt-36">
      <div>
        <Clock3 className="mx-auto text-white/35" size={28} strokeWidth={1.6} />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-red-300/70">
          {title}
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          This chapter is still being written.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50 sm:text-base">
          We are gathering the details with care. More will be shared here soon.
        </p>
      </div>
    </main>
  );
}
