"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { SectionHeading } from "./ServicesBento";

const CASES = [
  {
    name: "Ceasar's Solitude Camps",
    tag: "Hospitality · Resorts",
    quote:
      "A simple, low-budget website for our campsite that exceeded expectations — beautiful, user-friendly, and loved by every visitor.",
    href: "https://ceasarssolitudecamps.com/",
  },
  {
    name: "DSK Industries",
    tag: "Import & Export",
    quote:
      "A fast-turnaround website that showcases our toolworks for import and export without compromising on quality.",
    href: "https://dskint.com/",
  },
  {
    name: "Twisty Herb",
    tag: "E-Commerce · Ayurveda · Healthcare",
    quote:
      "A feature-rich e-commerce store for our organic medicine business, delivered in record time with every requested feature in place.",
    href: "https://twistyherb.com/",
  },
   {
    name: "One Pets",
    tag: "E-Commerce · Vets · Pet",
    quote:
      "A market place where animal lovers meets sellers and buys, to meet the favourite pet they ever dreamed of.",
    href: "https://onepets.in/",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Case studies"
          desc="A few of the products and platforms we've shipped recently."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass glow-border group flex flex-col justify-between rounded-2xl p-7"
            >
              <div>
                <Quote className="text-violet-glow/70" size={22} />
                <p className="mt-4 text-sm leading-relaxed text-muted">&ldquo;{c.quote}&rdquo;</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{c.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{c.tag}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-cyan-glow transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
