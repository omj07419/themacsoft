import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "What We Do", href: "#what-we-do" },
      { label: "Our Process", href: "#process" },
      { label: "About Us", href: "#about" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Case Studies", href: "#work" },
      { label: "Book Appointment", href: "#contact" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface/40">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_top,transparent,black)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" data-cursor="link" className="flex items-center gap-2.5">
              <span className="relative h-25 w-45 overflow-hidden rounded-lg">
                <Image src="/logo.png" alt="TheMacSoft logo" fill sizes="36px" className="object-contain" />
              </span>
             
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Turning your ideas into digital masterpieces — IT consulting, custom
              software, and AI-driven insight for businesses ready to move faster.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      data-cursor="link"
                      className="text-sm text-muted transition-colors hover:text-cyan-glow"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold text-ink">Let&apos;s talk</h4>
            <a
              href="mailto:info@themacsoft.com"
              data-cursor="link"
              className="mt-4 flex items-center gap-2 text-sm text-muted transition-colors hover:text-cyan-glow"
            >
              <Mail size={16} />
              info@themacsoft.com
            </a>
            <a
              href="#contact"
              data-cursor="link"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-cyan-glow hover:text-cyan-glow"
            >
              Start a project <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} TheMacSoft. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted/70">
             Engineered by TheMacSoft
          </p>
        </div>
      </div>
    </footer>
  );
}
