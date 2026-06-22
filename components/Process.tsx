"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./ServicesBento";

const STEPS = [
  {
    n: "01",
    title: "Analyze & Strategize",
    tag: "Turning Complexity into Clarity",
    desc: "We dive deep into your business processes, challenges, and goals to craft a strategy that aligns technology with your vision. Every decision is backed by insight.",
  },
  {
    n: "02",
    title: "Innovate & Build",
    tag: "Transform Ideas into Reality",
    desc: "From custom software to cutting-edge AI tooling, we build solutions tailored to your needs — agile delivery, fast iteration, measurable results.",
  },
  {
    n: "03",
    title: "Optimize & Grow",
    tag: "Unlock Your Full Potential",
    desc: "We continuously monitor, refine, and optimize your IT ecosystem with analytics and automation, so it runs smarter, faster, and stronger over time.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Us"
          title="How we do it"
          desc="A three-step rhythm we repeat on every engagement, from first audit to long-term optimization."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-cyan-glow/40 via-violet-glow/40 to-cyan-glow/40 md:block" />
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="card"
              className="glass relative rounded-2xl p-7"
            >
              <span className="font-display text-4xl font-bold text-gradient">{step.n}</span>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-violet-glow">
                {step.tag}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
