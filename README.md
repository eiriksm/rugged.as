# Rugged AS

A minimal static site for Rugged AS.

## Overview

This project uses Vite for development and building. The site features:

- Animated terrain background using HTML5 Canvas
- Tailwind CSS v4 for styling
- Vite for fast development and optimized production builds

## Getting Started

Install dependencies:

```bash
npm install
```

### Development Mode

Start the Vite development server with hot module replacement:

```bash
npm run dev
```

This will start a local dev server at `http://localhost:5173` with:
- **Hot Module Replacement (HMR)**: Instant updates without full page reloads
- **Fast startup**: Vite starts in milliseconds
- **On-demand compilation**: Only compiles files as they're requested

You can also preview the production build locally:

```bash
npm run preview
```

### Production Build

Build the static site for production:

```bash
npm run build
```

Vite will:
1. Process and optimize your HTML, CSS, and JavaScript
2. Generate CSS using PostCSS with Tailwind CSS v4
3. Bundle and minify all assets
4. Output optimized files to the `dist/` directory
