# TheMacSoft — Next.js Website

A dark, gaming-inspired marketing site for TheMacSoft with a Bento Grid
services layout, scroll-triggered motion, a custom cursor + particle trail
effect, and an integrated contact/appointment lead-gen hub wired to SMTP
email.

## Stack

- Next.js 14 (App Router, root-level `app/` — no `src/` folder)
- Tailwind CSS v4 (CSS-first config — design tokens live in `app/globals.css`
  under `@theme inline { ... }`, there is no `tailwind.config.ts`)
- Framer Motion
- Nodemailer (SMTP)
- lucide-react (icons)

## 1. Install

```bash
npm install
```

## 2. Configure environment variables

Copy the example file and fill in the real SMTP password for the
`contact@themacsoft.com` mailbox:

```bash
cp .env.local.example .env.local
```

```
SMTP_PASSWORD=your-real-mailbox-password
```

`.env.local` is already in `.gitignore` — never commit it.

> The API route (`app/api/send-email/route.ts`) is hardcoded to use:
> - Host: `smtp.themacsoft.com`
> - Port: `465` (SSL)
> - From / auth user: `contact@themacsoft.com`
> - Admin alerts go to: `om@themacsoft.com`
>
> If any of those change, edit the constants at the top of that file.

## 3. Add your real brand assets

Replace the two placeholder images generated for this build:

- `public/logo.png` — your logo (square works best, ~256x256)
- `public/site_icon.png` — favicon source (square, ~256x256 or larger)

## 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 5. Build & deploy

```bash
npm run build
npm start
```

**Deploying to Vercel** (recommended, zero-config for Next.js):

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com → New Project.
3. Add the `SMTP_PASSWORD` environment variable in Project Settings →
   Environment Variables.
4. Deploy.

If you deploy anywhere other than Vercel, just make sure the host runs a
Node.js server (this app uses a server-side API route, so it can't be
exported as fully static HTML).

## Project structure

```
app/
  layout.tsx          → fonts, metadata, mounts Header/Footer/Cursor
  page.tsx             → assembles all homepage sections
  globals.css          → theme tokens, glass/gradient utilities
  api/send-email/
    route.ts            → SMTP endpoint (nodemailer)
components/
  Header.tsx            → sticky glass nav + mobile menu
  Footer.tsx            → footer links + contact
  CursorEffects.tsx      → custom cursor + bubble/star particle trail
  StarField.tsx          → ambient twinkling background stars
  Hero.tsx               → headline, CTAs, stats
  ServicesBento.tsx       → Bento Grid of services (+ SectionHeading helper)
  Process.tsx             → "How We Do It" 3-step section
  Portfolio.tsx           → case studies grid
  About.tsx               → who-we-are + tech stack
  LeadGenHub.tsx           → toggleable Contact / Appointment forms
lib/
  emailTemplates.ts        → HTML builders for admin + receipt emails
public/
  logo.png, site_icon.png  → replace with real brand assets
```

## Customizing the theme

All color tokens live in `app/globals.css` inside the `@theme inline { ... }`
block at the top (`--color-base`, `--color-surface`, `--color-cyan-glow`,
`--color-violet-glow`, etc.) — Tailwind v4 generates the matching utility
classes (`bg-base`, `text-cyan-glow`, `border-line`...) automatically from
those CSS variables, so there's no `tailwind.config.ts` to edit. Fonts are
loaded via `next/font/google` in `app/layout.tsx` (Sora for display headings,
Plus Jakarta Sans for body text, JetBrains Mono for eyebrow labels) and mapped
into the theme via `--font-display`, `--font-body`, `--font-mono` — swap the
font imports there if you want a different pairing.

> Note: a custom color is named `abyss` (not `base`) for dark text on bright
> gradient buttons (e.g. `text-abyss`). This is intentional — naming it
> `text-base` would collide with Tailwind's built-in `text-base` font-size
> utility (1rem), so a separate token avoids that conflict.

## The cursor effect

`components/CursorEffects.tsx` renders:

1. A spring-physics ring + dot (Framer Motion `useSpring`) that trails the
   real cursor and scales/recolors when hovering anything with a
   `data-cursor="link"` or `data-cursor="card"` attribute.
2. A canvas particle field that spawns translucent "bubbles" that drift
   upward and fade, plus the occasional 4-point star sparkle on fast
   mouse movement — both disappear on their own, nothing sticks around.

It automatically disables itself on touch devices and when the OS
"reduce motion" setting is on, and falls back to a normal cursor on mobile.

To add the effect to any new element (a future button, card, etc.), just add
`data-cursor="link"` (small scale-up) or `data-cursor="card"` (bigger
scale-up, used for bento tiles/portfolio cards) to that element.

## Forms

`LeadGenHub` toggles between:

- **Contact form** — Full Name, Email, Message
- **Appointment form** — Full Name, Email, Date, Time, Consultation Area
  (dropdown), Project Briefing Notes

Both POST JSON to `/api/send-email`, which validates the payload, then sends:

1. An HTML alert to `om@themacsoft.com` with all submitted fields.
2. An HTML confirmation receipt back to the email address the visitor typed in.

## Notes / suggestions

- Consider adding a honeypot field or a CAPTCHA (e.g. Cloudflare Turnstile)
  to the forms before going live publicly, to cut down on spam submissions.
- The case studies in `Portfolio.tsx` link to the three example client sites
  mentioned in the original site copy — swap in your current ones.
