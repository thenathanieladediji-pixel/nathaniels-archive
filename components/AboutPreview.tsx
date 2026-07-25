"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="bg-black px-6 py-32 text-white sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10"
          >
            <Image
              src="/images/about/nathaniel-about.png"
              alt="Nathaniel Adediji"
              width={900}
              height={1200}
              priority
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xs uppercase tracking-[0.45em] text-orange-400"
            >
              About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-8 text-4xl font-black leading-tight sm:text-6xl"
            >
              I design with intention,
              <br />
              strategy,
              <br />
              and people in mind.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-12 space-y-8 text-lg leading-9 text-zinc-400"
            >
              <p>
                I'm Nathaniel Adediji, a multidisciplinary designer, creative
                strategist, and web developer who believes every great project
                begins long before the first design or line of code. I create
                work that solves problems, builds trust, and leaves a lasting
                impression.
              </p>

              <p>
                Every brand has a story worth telling. My role is to shape that
                story into experiences people remember through design,
                strategy, and technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-14"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-orange-400 transition hover:text-white"
              >
                Discover My Story

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}