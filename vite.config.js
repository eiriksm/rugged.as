import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [viteSingleFile()],
  server: {
    allowedHosts: ['.ddev.site', '.localhost'],
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
