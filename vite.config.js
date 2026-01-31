import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [viteSingleFile()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
