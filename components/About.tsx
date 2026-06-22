"use client";

import { motion } from "framer-motion";

const STACK = [
  "Web & Mobile",
  "Artificial Intelligence",
  "Machine Learning",
  "Blockchain",
  "Cloud Solutions",
  "Cybersecurity",
  "IoT",
  "Big Data",
  "AR / VR",
  "DevOps",
];

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-glow">About Us</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Who we are
            </h2>
            <p className="mt-5 font-display text-lg text-ink/90">
              &ldquo;Your partners in building the future with cutting-edge technology.&rdquo;
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted">
              We&apos;re a team of passionate innovators and IT experts dedicated to
              transforming ideas into reality. We don&apos;t just build software — we
              create experiences that empower businesses, accelerate growth, and
              keep you ahead in the digital era.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you&apos;re a startup or a global enterprise, we bring your
              vision to life with precision, creativity, and speed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Technologies we master
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {STACK.map((s) => (
                <span
                  key={s}
                  data-cursor="link"
                  className="rounded-full border border-line bg-surface2 px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-cyan-glow hover:text-cyan-glow"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
