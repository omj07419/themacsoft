"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send, CalendarClock } from "lucide-react";
import { SectionHeading } from "./ServicesBento";

type Mode = "contact" | "appointment";
type Status = "idle" | "loading" | "success" | "error";

const CONSULTATION_AREAS = [
  "IT Consulting & Diagnostics",
  "Custom Application Engineering",
  "AI & Big Data Analytics",
  "Cloud, DevOps & IoT",
  "Cybersecurity",
  "Other",
];

export default function LeadGenHub() {
  const [mode, setMode] = useState<Mode>("contact");

  return (
    <section id="contact" className="relative py-28">
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 animate-blob rounded-full bg-cyan-glow/10 blur-[100px]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something together"
          desc="Send a message or book a consultation slot directly — we'll get back to you fast."
        />

        <div className="mt-10 glass glow-border rounded-2xl p-2 sm:p-3">
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-surface2 p-1.5">
            <ToggleButton
              active={mode === "contact"}
              onClick={() => setMode("contact")}
              icon={<Send size={15} />}
              label="Contact Us"
            />
            <ToggleButton
              active={mode === "appointment"}
              onClick={() => setMode("appointment")}
              icon={<CalendarClock size={15} />}
              label="Book Appointment"
            />
          </div>

          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              {mode === "contact" ? (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactForm />
                </motion.div>
              ) : (
                <motion.div
                  key="appointment"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <AppointmentForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      data-cursor="link"
      onClick={onClick}
      className={`relative flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
        active ? "text-abyss" : "text-muted hover:text-ink"
      }`}
    >
      {active && (
        <motion.span
          layoutId="hub-toggle"
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium text-muted">{children}</label>;
}

const inputClass =
  "w-full rounded-lg border border-line bg-surface2 px-4 py-2.5 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-cyan-glow";

function StatusBanner({ status, errorMsg }: { status: Status; errorMsg?: string }) {
  if (status === "success") {
    return (
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-3 text-sm text-cyan-glow">
        <CheckCircle2 size={16} />
        Sent! Check your inbox for a confirmation receipt.
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        <AlertCircle size={16} />
        {errorMsg || "Something went wrong. Please try again."}
      </div>
    );
  }
  return null;
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

 async function onSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setStatus("loading");
  const formEl = e.currentTarget;
  const form = new FormData(formEl);
    const payload = {
      formType: "contact",
      fullName: form.get("fullName"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
     setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <StatusBanner status={status} errorMsg={errorMsg} />
      <div>
        <FieldLabel>Full Name</FieldLabel>
        <input name="fullName" required placeholder="Jordan Smith" className={inputClass} />
      </div>
      <div>
        <FieldLabel>Email Address</FieldLabel>
        <input
          type="email"
          name="email"
          required
          placeholder="jordan@company.com"
          className={inputClass}
        />
      </div>
      <div>
        <FieldLabel>Message Details</FieldLabel>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us about your project..."
          className={inputClass}
        />
      </div>
      <SubmitButton status={status} idleLabel="Send Message" />
    </form>
  );
}

function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
   const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      formType: "appointment",
      fullName: form.get("fullName"),
      email: form.get("email"),
      date: form.get("date"),
      time: form.get("time"),
      consultationArea: form.get("consultationArea"),
      brief: form.get("brief"),
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");
      setStatus("success");
      formEl.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <StatusBanner status={status} errorMsg={errorMsg} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel>Full Name</FieldLabel>
          <input name="fullName" required placeholder="Jordan Smith" className={inputClass} />
        </div>
        <div>
          <FieldLabel>Email Address</FieldLabel>
          <input
            type="email"
            name="email"
            required
            placeholder="jordan@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Targeted Date</FieldLabel>
          <input type="date" name="date" required className={inputClass} />
        </div>
        <div>
          <FieldLabel>Targeted Time</FieldLabel>
          <input type="time" name="time" required className={inputClass} />
        </div>
      </div>
      <div>
        <FieldLabel>Consultation Area</FieldLabel>
        <select name="consultationArea" required className={inputClass} defaultValue="">
          <option value="" disabled>
            Select an area
          </option>
          {CONSULTATION_AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
      <div>
        <FieldLabel>Project Briefing Notes</FieldLabel>
        <textarea
          name="brief"
          required
          rows={3}
          placeholder="A short summary of what you'd like to discuss..."
          className={inputClass}
        />
      </div>
      <SubmitButton status={status} idleLabel="Book Appointment" />
    </form>
  );
}

function SubmitButton({ status, idleLabel }: { status: Status; idleLabel: string }) {
  return (
    <button
      type="submit"
      disabled={status === "loading"}
      data-cursor="link"
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-violet-glow py-3 text-sm font-semibold text-abyss shadow-[0_0_24px_rgba(34,211,238,0.3)] transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:hover:scale-100"
    >
      {status === "loading" ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Sending...
        </>
      ) : (
        idleLabel
      )}
    </button>
  );
}
