const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const juice = require('juice');

const BUILD_DIR = path.join(__dirname, '..');
const TEMPLATE_PATH = path.join(__dirname, 'template.html');
const CSS_INPUT_PATH = path.join(__dirname, 'input.css');
const CSS_OUTPUT_PATH = path.join(__dirname, 'output.css');
const STATIC_OUTPUT_PATH = path.join(BUILD_DIR, 'dist', 'index.html');

console.log('🏗️  Building static HTML file...');

// Ensure dist directory exists
if (!fs.existsSync(path.join(BUILD_DIR, 'dist'))) {
  fs.mkdirSync(path.join(BUILD_DIR, 'dist'), { recursive: true });
}

// Step 1: Generate CSS using PostCSS with Tailwind
console.log('📦 Generating CSS with PostCSS/Tailwind...');
try {
  execSync(
    `npx postcss ${CSS_INPUT_PATH} -o ${CSS_OUTPUT_PATH}`,
    {
      cwd: BUILD_DIR,
      stdio: 'inherit'
    }
  );
} catch (error) {
  console.error('❌ Failed to generate CSS:', error.message);
  process.exit(1);
}

// Step 2: Read the template HTML
console.log('📄 Reading template...');
let html = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Step 3: Read the generated CSS
console.log('🎨 Reading generated CSS...');
const css = fs.readFileSync(CSS_OUTPUT_PATH, 'utf8');

// Step 4: Inline the CSS
console.log('✨ Inlining styles...');

// Replace the placeholder with a style tag
html = html.replace('<!-- STYLES_PLACEHOLDER -->', `<style>${css}</style>`);

// Use juice to inline styles from the style tag into elements
// Note: juice works better with actual style attributes, but for Tailwind utility classes,
// we want to keep the classes and also add the full CSS in a style tag
const inlinedHtml = juice(html, {
  extraCss: css,
  inlinePseudoElements: true,
  preserveMediaQueries: true,
  preserveFontFaces: true,
  preserveKeyframes: true,
  removeStyleTags: false, // Keep the style tag for pseudo-classes and media queries
});

// Step 5: Write the final HTML file
console.log('💾 Writing static HTML file...');
fs.writeFileSync(STATIC_OUTPUT_PATH, inlinedHtml, 'utf8');

// Clean up temporary CSS file
console.log('🧹 Cleaning up...');
fs.unlinkSync(CSS_OUTPUT_PATH);

console.log('✅ Static build complete!');
console.log(`📍 Output: ${STATIC_OUTPUT_PATH}`);

// Get file size
const stats = fs.statSync(STATIC_OUTPUT_PATH);
const fileSizeInKB = (stats.size / 1024).toFixed(2);
console.log(`📊 File size: ${fileSizeInKB} KB`);
