"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="bg-black px-6 py-40 text-white sm:px-10 lg:px-20">
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
          className="mt-8 max-w-5xl text-5xl font-black leading-tight sm:text-6xl lg:text-8xl"
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
          className="mt-16 max-w-3xl space-y-8 text-xl leading-9 text-zinc-400"
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