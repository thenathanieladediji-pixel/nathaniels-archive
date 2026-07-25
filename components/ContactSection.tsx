"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
          text-4xl
          font-semibold
          uppercase
          tracking-[0.3em]
          sm:text-6xl
          "
        >
          Let's Work Together
        </motion.h2>


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="
          mx-auto
          mt-8
          max-w-2xl
          text-sm
          uppercase
          tracking-[0.25em]
          text-white/50
          "
        >
          Have a project, brand, or creative idea?
          Let's create something impactful together.
        </motion.p>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="
          mt-14
          grid
          gap-6
          sm:grid-cols-3
          "
        >

          <a
            href="mailto:thenathanieladediji@gmail.com"
            className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
            transition
            hover:border-orange-400/40
            "
          >
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
              Email
            </p>

            <p className="mt-4 text-sm text-white/70">
              thenathanieladediji@gmail.com
            </p>
          </a>


          <a
            href="https://wa.me/2348033341791"
            target="_blank"
            className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
            transition
            hover:border-orange-400/40
            "
          >
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
              WhatsApp
            </p>

            <p className="mt-4 text-sm text-white/70">
              +234 803 334 1791
            </p>
          </a>


          <a
            href="https://www.linkedin.com/in/nathaniel-adediji-12138238b/"
            target="_blank"
            className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-8
            transition
            hover:border-orange-400/40
            "
          >
            <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
              LinkedIn
            </p>

            <p className="mt-4 text-sm text-white/70">
              Connect with me
            </p>
          </a>

        </motion.div>

      </div>

    </section>
  );
}