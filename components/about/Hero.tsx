"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/about/nathaniel-hero.png"
          alt="Nathaniel Adediji"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-6 top-6 z-20 sm:left-10 sm:top-10 lg:left-20"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-zinc-300 transition hover:text-white"
        >
          ← Back Home
        </Link>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 1,
          ease: "easeOut",
        }}
        className="absolute bottom-10 left-0 w-full px-6 sm:px-10 lg:px-20"
      >
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
          Nathaniel Adediji
        </h1>

        <div className="mt-8 space-y-2">
          <p className="text-xs uppercase tracking-[0.45em] text-orange-400 sm:text-sm">
            MULTIDISCIPLINARY DESIGNER
          </p>

          <p className="text-xs uppercase tracking-[0.45em] text-zinc-300 sm:text-sm">
            CREATIVE STRATEGIST
          </p>

          <p className="text-xs uppercase tracking-[0.45em] text-zinc-300 sm:text-sm">
            WEB DEVELOPER
          </p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-10 right-8 flex flex-col items-center gap-2 text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
          Scroll
        </span>

        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <path d="M9 2V24" stroke="white" strokeWidth="1.5" />
          <path d="M3 18L9 24L15 18" stroke="white" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </section>
  );
}