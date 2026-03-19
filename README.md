# kafkade

![CI](https://github.com/kafkade/kafkade/actions/workflows/ci.yml/badge.svg?branch=main)
![CI (beta)](https://github.com/kafkade/kafkade/actions/workflows/ci.yml/badge.svg?branch=beta)
![Site Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/kafkade/5d358c9a40c3403252d072e54a9b96d5/raw/kafkade-status.json)
![Beta Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/kafkade/5d358c9a40c3403252d072e54a9b96d5/raw/kafkade-beta-status.json)

Personal website and portfolio for **kafkade** — a software creator building at the intersection of code and craft.

🌐 [kafkade.com](https://kafkade.com)

## Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Content**: Markdown / MDX via Astro Content Collections
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Typography**: IBM Plex Mono, Lora

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing

End-to-end tests use [Playwright](https://playwright.dev). Tests run against the production build served by `npm run preview`.

```bash
# Build and run all tests
npm run build && npm test

# Interactive test UI
npm run test:ui
```

Tests cover page rendering, navigation, theme toggle, blog content, and accessibility basics.

## Project Structure

```
src/
├── components/      # Reusable UI components
├── content/blog/    # Blog posts (Markdown/MDX)
├── layouts/         # Page layout templates
├── pages/           # Routes (/, /projects, /blog, /about)
└── styles/          # Global styles and Tailwind config
brand/               # Brand kit (guidelines, colors, logos)
public/              # Static assets (favicon, robots.txt)
```

## Deployment

Deployed automatically via Cloudflare Pages on push to `main`.

- **Build command**: `npm run build`
- **Output directory**: `dist`

### Status badges setup

The health-check workflow writes badge data to a GitHub Gist. To enable:

1. Create a public Gist with an empty file (any name).
2. Create a fine-grained PAT with `gist` write scope.
3. Add `GIST_TOKEN` as a repository secret.
4. Add `STATUS_GIST_ID` as a repository variable (the Gist's ID from its URL).
5. Replace `STATUS_GIST_ID` in the badge URLs in this README with the actual Gist ID.

## License

Content © kafkade. Code is open source.
