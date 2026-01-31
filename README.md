# Rugged AS

A minimal static site for Rugged AS.

## Overview

This project uses a custom static build system that generates a single, self-contained HTML file with inlined CSS. The site features:

- Animated terrain background using HTML5 Canvas
- Tailwind CSS v4 for styling
- Single-file output for easy deployment

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
