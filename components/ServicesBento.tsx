"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Code2,
  BrainCircuit,
  ShieldCheck,
  Cloud,
  Boxes,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tile = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  desc: string;
  span: string;
  glow: "cyan" | "violet";
};

const TILES: Tile[] = [
  {
    icon: Compass,
    eyebrow: "Consulting",
    title: "IT Consulting & Diagnostics",
    desc: "We audit your stack, surface bottlenecks, and craft a clear technology roadmap tied to measurable business outcomes.",
    span: "md:col-span-2 lg:col-span-2",
    glow: "cyan",
  },
  {
    icon: BrainCircuit,
    eyebrow: "AI & Data",
    title: "AI Frameworks & Big Data Analytics",
    desc: "Predictive models and analytics pipelines that turn raw data into decisions you can act on the same day.",
    span: "md:col-span-2 lg:col-span-1 lg:row-span-2",
    glow: "violet",
  },
  {
    icon: Code2,
    eyebrow: "Engineering",
    title: "Custom Application Engineering",
    desc: "Scalable web and mobile products, architected for performance and built to grow with your user base.",
    span: "md:col-span-1 lg:col-span-1",
    glow: "cyan",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Security",
    title: "Cybersecurity by Default",
    desc: "Encrypted storage, hardened auth flows, and audited code paths — security reviewed, not bolted on.",
    span: "md:col-span-1 lg:col-span-1",
    glow: "violet",
  },
  {
    icon: Cloud,
    eyebrow: "Infrastructure",
    title: "Cloud, DevOps & IoT",
    desc: "CI/CD pipelines and cloud-native infrastructure that ship faster and scale without surprises.",
    span: "md:col-span-1 lg:col-span-1",
    glow: "cyan",
  },
  {
    icon: Boxes,
    eyebrow: "Emerging Tech",
    title: "Blockchain, AR/VR & ML",
    desc: "From smart contracts to immersive interfaces — we prototype emerging tech into shippable products.",
    span: "md:col-span-2 lg:col-span-1",
    glow: "violet",
  },
];

export default function ServicesBento() {
  return (
    <section id="what-we-do" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="One partner, every layer of your stack"
          desc="From strategy to shipped software to the AI that makes it smarter — we cover the full surface area of modern technology."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[15rem]">
          {TILES.map((tile, i) => (
            <BentoCard key={tile.title} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ tile, index }: { tile: Tile; index: number }) {
  const Icon = tile.icon;
  const glowClass =
    tile.glow === "cyan"
      ? "from-cyan-glow/15 group-hover:from-cyan-glow/25"
      : "from-violet-glow/15 group-hover:from-violet-glow/25";
  const iconColor = tile.glow === "cyan" ? "text-cyan-glow" : "text-violet-glow";

  return (
    <motion.div
      data-cursor="card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className={`group glass glow-border relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 ${tile.span}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${glowClass} to-transparent blur-2xl transition-all duration-500`}
      />
      <div className="relative">
        <div className={`mb-4 inline-flex rounded-xl border border-line bg-surface2 p-2.5 ${iconColor}`}>
          <Icon size={20} strokeWidth={1.8} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{tile.eyebrow}</p>
        <h3 className="mt-2 font-display text-lg font-semibold text-ink sm:text-xl">{tile.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{tile.desc}</p>
      </div>
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-glow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-relaxed text-muted">{desc}</p>}
    </motion.div>
  );
}
