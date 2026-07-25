"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="bg-black px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs uppercase tracking-[0.45em] text-orange-400"
        >
          The Story
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl xl:text-6xl"
        >
          Great work doesn't begin
          <br />
          with software.
          <br />
          It begins with perspective.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-14 space-y-6 text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9 xl:text-xl"
        >
          <p>
            Long before I started building websites or designing brands, I was
            fascinated by the way people respond to what they see. Why one
            design earns trust instantly while another gets ignored. Why some
            experiences feel effortless and others create friction.
          </p>

          <p>
            That curiosity shaped the way I work today. Every project starts
            with understanding people, identifying problems, and finding the
            clearest way to communicate an idea. Design simply becomes the
            language that brings those ideas to life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}