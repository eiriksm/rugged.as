# Rugged AS

A minimal static site for Rugged AS featuring animated terrain backgrounds and Norwegian craftsmanship aesthetics.

## Overview

This project uses a custom static build system that generates a single, self-contained HTML file with inlined CSS. The site features:

- Animated terrain background using HTML5 Canvas
- Tailwind CSS v4 for styling
- Single-file output for easy deployment
- Norwegian flannel-inspired design elements

## Getting Started

Install dependencies:

```bash
npm install
```

Build the static site:

```bash
npm run build
```

The build process will:
1. Generate CSS using PostCSS with Tailwind
2. Embed the CSS inline into the HTML template
3. Output a single `dist/index.html` file

## Project Structure

```
build-scripts/
  ├── build-static.js    # Build script
  ├── input.css          # Tailwind CSS source
  └── template.html      # HTML template
dist/
  └── index.html         # Generated output (created on build)
```

## Deployment

The generated `dist/index.html` file is completely self-contained and can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

Simply upload the `dist/index.html` file to your hosting provider.
