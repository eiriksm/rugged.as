import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [viteSingleFile()],
  server: {
    port: 3000,
    host: '0.0.0.0',
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
