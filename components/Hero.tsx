"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import StarField from "./StarField";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100vh] items-center overflow-hidden pt-32">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <StarField />
      <div className="absolute -left-32 top-0 h-96 w-96 animate-blob rounded-full bg-cyan-glow/20 blur-[100px]" />
      <div className="absolute -right-24 top-40 h-[28rem] w-[28rem] animate-blob rounded-full bg-violet-glow/20 blur-[110px] [animation-delay:4s]" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-cyan-glow"
        >
          <Sparkles size={13} />
          IT Consulting · Software Engineering · AI Solutions
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="mx-auto max-w-4xl text-center font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
        >
          Empowering business through
          <span className="block text-gradient">innovative IT solutions</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted sm:text-lg"
        >
          We deliver cutting-edge technology, consulting, and digital
          transformation services to help your business thrive in the modern
          world.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            data-cursor="link"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-glow to-violet-glow px-7 py-3.5 text-sm font-semibold text-abyss shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-transform hover:scale-105"
          >
            Start a Project
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#work"
            data-cursor="link"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-cyan-glow hover:text-cyan-glow"
          >
            View Our Work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-line pt-8 text-center"
        >
          {[
            ["20+", "Technologies Mastered"],
            ["100%", "Client-First Delivery"],
            ["24/7", "Support & Monitoring"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">{stat}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
