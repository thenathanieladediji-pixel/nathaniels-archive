"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Every project starts with understanding the goal, the audience, and the problem we're solving. The stronger the foundation, the stronger every decision that follows.",
  },
  {
    number: "02",
    title: "MAP",
    description:
      "Before opening a design tool, I sketch the journey. Whether it's a brand identity, a website, or a motion piece, I map the experience before I build it.",
  },
  {
    number: "03",
    title: "PLAN",
    description:
      "With the direction defined, I create a focused workflow and timeline that keeps the project moving efficiently without compromising quality.",
  },
  {
    number: "04",
    title: "VISUALIZE",
    description:
      "Before I create, I step into the audience's perspective. I think about what they'll see, what they'll feel, and what will earn their trust.",
  },
  {
    number: "05",
    title: "BUILD",
    description:
      "Once the strategy is clear, I bring the ideas to life. Every layout, interaction, and visual decision is intentional because the thinking has already been done.",
  },
  {
    number: "06",
    title: "REFINE",
    description:
      "Every project goes through one final layer of refinement. I review, test, and polish every detail until the experience feels effortless. The goal isn't simply to finish the work—it's to make it unforgettable.",
  },
];

export default function Process() {
  return (
    <section className="relative bg-[#0B0B0B] text-white py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-white/5 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-28 text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.4em] text-neutral-500">
            My Process
          </p>

          <h2 className="text-5xl font-bold leading-tight md:text-7xl">
            Thought Before
            <br />
            Execution.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            Great work doesn't happen by accident. Every project follows a
            structured process that transforms ideas into meaningful
            experiences.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-neutral-800" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="relative pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[15px] top-10 h-5 w-5 rounded-full border-4 border-[#0B0B0B] bg-white" />

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -6,
                    borderColor: "#ffffff40",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  transition={{ duration: 0.25 }}
                  className="rounded-3xl border border-neutral-800 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 md:p-10"
                >
                  <span className="text-sm tracking-[0.35em] text-neutral-500">
                    {step.number}
                  </span>

                  <h3 className="mt-4 mb-5 text-3xl font-bold tracking-wide md:text-5xl">
                    {step.title}
                  </h3>

                  <p className="max-w-3xl text-lg leading-8 text-neutral-400">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}