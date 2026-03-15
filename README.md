# kafkade

Personal website and portfolio for **kafkade** — a software creator building at the intersection of code and craft.

🌐 [kafkade.com](https://kafkade.com)

## Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Content**: Markdown / MDX via Astro Content Collections
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com)
- **Typography**: Playfair Display, Inter, JetBrains Mono

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

## License

Content © kafkade. Code is open source.
