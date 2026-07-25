"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="bg-black px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.45em] text-orange-400"
        >
          Philosophy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 max-w-5xl text-3xl font-black leading-tight sm:text-4xl lg:text-6xl xl:text-8xl"
        >
          Design isn't decoration.
          <br />
          It's how businesses earn trust
          <br />
          before they say a word.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-12 max-w-3xl space-y-6 text-base leading-8 text-zinc-400 sm:mt-16 sm:text-lg sm:leading-9 xl:text-xl"
        >
          <p>
            Every decision carries meaning. Typography influences perception.
            Color shapes emotion. Layout guides attention. Motion creates
            feeling. None of these exist simply to make something look better.
          </p>

          <p>
            I believe the best work happens when strategy, creativity, and
            technology work together. Beautiful visuals may capture attention,
            but thoughtful experiences are what people remember.
          </p>
        </motion.div>
      </div>
    </section>
  );
}