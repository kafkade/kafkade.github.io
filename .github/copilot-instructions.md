# Copilot Instructions — kafkade

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

No test suite or linter configured. Use `--no-gpg-sign` on commits if GPG times out.

## Architecture

**Astro 5 static site** with Tailwind CSS v4, deployed to Cloudflare Pages.

## Git Policy

- **Never commit automatically.** Do not run `git commit`, `git push`, or any
  other command that creates or modifies commits without explicit user approval.
- Always present proposed changes and let the user decide when to commit.
- This applies to all agents, sub-agents, and automated workflows.

### Layout hierarchy

```
BaseLayout        — HTML shell, <head>, SEO/OG meta
├── PageLayout    — Header + Footer + max-w-[720px] centered content
└── BlogPost      — Header + Footer + article header + prose styling
```

### Content collections

One collection: `blog` (defined in `src/content.config.ts`). Uses the Astro glob loader pattern:

```typescript
loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' })
```

Frontmatter schema: `title`, `description`, `pubDate`, `updatedDate?`, `tags[]`, `draft`.

## Conventions

### Design philosophy — "Terminal Journal"

Inspired by [マリウス (xn--gckvb8fzb.com)](https://xn--gckvb8fzb.com/). Key principles:
- **Light theme default** on warm paper white (`#F8F7F4`)
- **Monospace everything** — JetBrains Mono Variable is the only font
- **No cards, no gradients, no blur, no shadows** — flat and clean
- **Inverted hover on links** (background fills with text color, マリウス-style)
- **Social links as text** separated by `·` (not icon buttons)
- **Max-width 720px**, generous whitespace
- **Portfolio-first homepage** (hero → projects → quote, blog is a separate page)

### Color system (RockON! palette)

Defined in `@theme` block of `src/styles/global.css`:

| Token        | Hex       | Role                                    |
|-------------|-----------|------------------------------------------|
| `midnight`   | `#010221` | Dark mode bg                             |
| `ember`      | `#C43302` | **Primary accent** — links, active states |
| `teal`       | `#0A7373` | Secondary accent — tags, code highlights |
| `sage`       | `#B7BF99` | Muted text — dates, meta                 |
| `amber`      | `#EDAA25` | Emphasis — special highlights            |
| `bg`         | `#F8F7F4` | Light mode background                    |
| `text`       | `#1A1A2E` | Primary text (light)                     |
| `text-muted` | `#6B6B7B` | Body text, descriptions                  |
| `border`     | `#E0DED8` | Borders, hr                              |

### Link styles

Two classes for links in templates:
- Default `<a>` — underlined, inverted hover (bg fills)
- `.accent` — ember-colored, inverts to ember bg on hover
- `.no-invert` — disables the hover inversion (used for logo, nav)

### Tailwind CSS v4

Uses the Vite plugin (`@tailwindcss/vite`), not PostCSS or `@astrojs/tailwind`. Configuration is done via `@theme` blocks in CSS.

### Components

Astro components. Stateless — no framework islands. Social links and project data are hardcoded directly in page files (no separate SocialLinks component anymore).

### Brand identity

- **Name**: kafkade = Kafka (author) + Cascade (mountains)
- **Tagline**: "software, systems, and other things"
- **Avatar**: Terminal design (#2) — terminal window with colored code lines
- **Logo concept**: Stacked chevrons (nested V shapes with amber dot summit)
- **Voice**: Technical but approachable, understated, honest

### Brand assets

```
brand/
├── brand-guidelines.md     # Design system docs (NEEDS UPDATE)
├── colors.css              # CSS custom properties reference
├── assets/                 # Logo SVGs, favicon
├── proposals/              # Design exploration files
│   ├── theme-preview.html  # Terminal Journal theme mockup
│   ├── avatars-v2.html     # Avatar proposals
│   └── *.svg               # Logo variants
└── social/                 # Social media kit
    ├── avatar-512.svg      # Profile picture (all platforms)
    ├── banner-x-bluesky-1500x500.svg
    ├── banner-patreon-1600x400.svg
    ├── banner-bmc-1920x400.svg
    ├── banner-github-1280x640.svg
    └── preview.html        # Preview all social assets
```

### Social profiles

| Platform        | URL                                              |
|----------------|--------------------------------------------------|
| Website         | https://kafkade.com                              |
| GitHub          | https://github.com/kafkade                       |
| Twitter / X     | https://x.com/kafkade33926                       |
| Bluesky         | https://bsky.app/profile/kafkadev.bsky.social    |
| Patreon         | https://patreon.com/c/kafkade                    |
| Buy Me a Coffee | https://buymeacoffee.com/kafkade                 |

### Deployment

- **Hosting**: Cloudflare Pages (free tier)
- **Domains**: kafkade.com, kafkade.dev (both on Cloudflare)
- **Branch**: `beta` → auto-deploys to beta.kafkade.pages.dev
- **Build**: `npm run build` → `dist/`
