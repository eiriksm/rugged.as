const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Step 4: Embed the CSS
console.log('✨ Embedding styles...');

// Replace the placeholder with a style tag containing all the CSS
const finalHtml = html.replace('<!-- STYLES_PLACEHOLDER -->', `<style>${css}</style>`);

// Step 5: Write the final HTML file
console.log('💾 Writing static HTML file...');
fs.writeFileSync(STATIC_OUTPUT_PATH, finalHtml, 'utf8');

// Clean up temporary CSS file
console.log('🧹 Cleaning up...');
fs.unlinkSync(CSS_OUTPUT_PATH);

console.log('✅ Static build complete!');
console.log(`📍 Output: ${STATIC_OUTPUT_PATH}`);

// Get file size
const stats = fs.statSync(STATIC_OUTPUT_PATH);
const fileSizeInKB = (stats.size / 1024).toFixed(2);
console.log(`📊 File size: ${fileSizeInKB} KB`);
