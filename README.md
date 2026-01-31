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

### Development Mode

Start the development server with live reload:

```bash
npm run dev
```

This will:
1. Build the static site
2. Start a local web server at `http://localhost:3000`
3. Watch for changes in `build-scripts/template.html` and `build-scripts/input.css`
4. Automatically rebuild and reload the browser when changes are detected

The dev server features:
- **Live reload**: Changes to template or CSS automatically refresh the browser
- **Instant feedback**: See your changes in real-time
- **Build validation**: Console shows build status and any errors

### Production Build

Build the static site for production:

```bash
npm run build
```

The build process will:
1. Generate CSS using PostCSS with Tailwind
2. Embed the CSS inline into the HTML template
3. Output a single `dist/index.html` file
