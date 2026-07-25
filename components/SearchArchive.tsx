"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const placeholderPhrases = [
  "Real estate? I've done it.",
  "Fintech? I've designed it.",
  "Restaurants? Built brands for them.",
  "Looking for something specific? Search the archive.",
];

export default function SearchArchive() {
  const router = useRouter();

  const [activePhrase, setActivePhrase] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePhrase(
        (current) => (current + 1) % placeholderPhrases.length
      );
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden overflow-x-hidden border-t border-white/10 bg-black px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">

      <div className="absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="absolute bottom-[10%] right-[10%] h-80 w-80 rounded-full bg-orange-400/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl font-light uppercase tracking-[0.3em] text-white sm:text-3xl lg:text-4xl xl:text-5xl"
        >
          WHAT ARE YOU LOOKING FOR?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="mt-6 max-w-2xl text-sm uppercase tracking-[0.3em] text-zinc-400 sm:text-base"
        >
          Explore a collection of brands, interfaces and digital experiences
          I've built.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="mt-10 w-full max-w-3xl"
        >
          <div
            className={`relative overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-500 ${
              isFocused
                ? "border-orange-400/70 bg-transparent shadow-[0_0_40px_rgba(255,122,0,0.16)]"
                : "border-white/15 bg-transparent shadow-[0_0_30px_rgba(255,255,255,0.04)]"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.14),transparent_60%)]" />

            <div className="relative flex flex-col items-stretch px-4 py-3 sm:flex-row sm:items-center sm:px-7 sm:py-5">

              <div className="flex-1">

                <label
                  htmlFor="archive-search"
                  className="sr-only"
                >
                  Search the archive
                </label>

                <input
                  id="archive-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      search.trim()
                    ) {
                      router.push(
                        `/search?q=${encodeURIComponent(search)}`
                      );
                    }
                  }}
                  className="w-full bg-transparent pb-2 text-base text-white outline-none sm:pb-0 sm:text-lg"
                />

                {search === "" && (
                  <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-left text-sm text-zinc-400 sm:left-7 sm:text-base">

                    <span className="mr-3 text-zinc-500">
                      ⌕
                    </span>

                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderPhrases[activePhrase]}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        className="whitespace-nowrap"
                      >
                        {placeholderPhrases[activePhrase]}
                      </motion.span>
                    </AnimatePresence>

                  </div>
                )}
              </div>

              <motion.div
                animate={{
                  rotate: isFocused ? 8 : 0,
                  scale: isFocused ? 1.06 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="ml-0 mt-3 flex h-11 w-11 items-center justify-center self-end rounded-full border border-white/10 bg-transparent text-zinc-100 sm:ml-3 sm:mt-0 sm:self-auto"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" />

                  <path
                    d="m16 16 4 4"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}