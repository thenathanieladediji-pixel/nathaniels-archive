"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Real Estate",
    slug: "real-estate",
    description: "Luxury properties and marketing systems.",
  },
  {
    title: "Fintech",
    slug: "fintech",
    description: "Digital products and financial experiences.",
  },
  {
    title: "Restaurants",
    slug: "restaurants",
    description: "Brands built around food and culture.",
  },
  {
    title: "Music",
    slug: "music",
    description: "Visuals and campaigns for artists.",
  },
  {
    title: "UI / UX",
    slug: "ui-ux",
    description: "Interfaces designed for people.",
  },
  {
    title: "Branding",
    slug: "branding",
    description: "Identity systems and storytelling.",
  },
];

export default function Collections() {
  return (
    <section className="relative min-h-screen overflow-hidden overflow-x-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.12),transparent_35%)]" />

      <div className="absolute left-[-80px] top-[-60px] h-[320px] w-[320px] rounded-full bg-orange-500/8 blur-[140px]" />

      <div className="absolute bottom-[-100px] right-[-60px] h-[360px] w-[360px] rounded-full bg-orange-400/8 blur-[140px]" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.85,
          ease: "easeOut",
        }}
        className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <h2 className="text-2xl font-bold uppercase tracking-[0.22em] text-white sm:text-3xl lg:text-4xl xl:text-5xl">
          BROWSE MY COLLECTIONS
        </h2>

        <p className="mt-6 max-w-3xl text-sm italic tracking-[0.22em] text-zinc-400 sm:text-base">
          A curated archive of brands, products, interfaces and stories across
          industries.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative mx-auto mt-12 grid max-w-6xl gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((item, index) => (
          <Link key={item.slug} href={`/archive/${item.slug}`}>
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                scale: 1.01,
              }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 text-left shadow-[0_0_40px_rgba(255,122,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:border-orange-400/40 hover:bg-white/[0.06] sm:rounded-[1.75rem] sm:p-8"
            >
              <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.16),transparent_58%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-orange-400 via-orange-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative">
                <h3 className="text-xl font-semibold uppercase tracking-[0.24em] text-white sm:text-2xl">
                  {item.title}
                </h3>

                <div className="mt-6 h-px w-16 bg-white/15" />

                <p className="mt-6 text-sm leading-7 text-zinc-400 sm:text-[0.95rem]">
                  {item.description}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}