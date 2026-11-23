# Raisedesk — Website (Next.js)

A product of **Businezexcellence StartX LLP**.

**Full website:** 12 pages, navigation, page transitions and scroll animations.

| Route | Page |
|---|---|
| `/` | Home: hero, journey, moving text, statement, AI matching, founders/investors, horizontal toolkit, stories, FAQ, CTA |
| `/platform` | How it works (scroll timeline), AI matching, security |
| `/founders` | Profile, pitch room, data room, toolkit |
| `/investors` | Deal flow, thesis matching, diligence |
| `/insights` | Filterable articles, reports, stories |
| `/pricing` | Founder/investor plans, monthly/yearly toggle |
| `/about` | Mission, values, numbers, team |
| `/contact` | Contact form |
| `/signin` | Sign-in screen |
| `/get-matched` | 4-step onboarding wizard |
| `/privacy`, `/terms` | Legal templates |

**Forms are front-end only.** Each form has a `TODO` comment showing where to connect your backend.

## Tech stack
- Next.js 15 (App Router) + TypeScript
- Framer Motion: reveal, parallax and count-up animations
- Lenis: smooth scrolling
- CSS Modules: one stylesheet per component; design tokens live in `src/app/globals.css`
- Fonts (next/font): DM Serif Display, Cormorant Garamond, DM Sans

## Folder structure
```
src/
  app/
    layout.tsx          fonts + smooth scroll wrapper
    page.tsx            the home page, assembled from sections
    globals.css         colors, fonts, buttons, shared animations
  components/
    layout/             Navbar, SmoothScroll
    sections/           Home page sections (Hero, Journey, AiMatching, Faq, CtaBand ...)
    page/               Inner-page blocks (PageHero, FeatureRows, Timeline, PricingTable ...)
    forms/              ContactForm, SignInForm, MatchWizard
    ui/                 Icons, CountUp, TextEffects, ScrollMarquee, SpotlightCard, MockVisual
  lib/
    site.ts             home page + navigation text
    pages.ts            inner page text
public/images/          hero-ribbons.webp, stats-strip.webp
```

## Setup (Windows PowerShell)

Node.js 18.18 or newer is required. Check your version with `node -v`.

```powershell
# 1. Unzip the project (adjust the path to where you downloaded it)
Expand-Archive -Path "$HOME\Downloads\tideline-step1.zip" -DestinationPath "$HOME\Projects" -Force
cd "$HOME\Projects\tideline"

# 2. Install dependencies
npm install

# 3. Run locally, then open http://localhost:3000
npm run dev

# 4. Production build check
npm run build
npm start
```

## Push to GitHub
```powershell
git init
git add .
git commit -m "Raisedesk: step 1 - navbar, hero, stats, journey"
git branch -M main
git remote add origin https://github.com/<your-username>/tideline.git
git push -u origin main
```

## Deploy (Vercel)
Go to vercel.com, choose New Project, import the GitHub repo and click Deploy. No configuration is needed.

## Editing
- **Text:** `src/lib/site.ts`
- **Colors:** the `:root` block in `src/app/globals.css`
- **Hero artwork:** replace `public/images/hero-ribbons.webp`. Use a 2x resolution version (about 1800px wide) so it stays sharp on retina screens.
