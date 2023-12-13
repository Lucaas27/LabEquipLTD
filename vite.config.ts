import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "path";
import { glob } from "glob";
import legacy from "@vitejs/plugin-legacy";
import posthtml from "@vituum/vite-plugin-posthtml";
import htmlnano from "htmlnano";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import eslint from "vite-plugin-eslint";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  root,
  publicDir: resolve(__dirname, "src/public"),
  build: {
    rollupOptions: {
      external: ["src/scripts/faviconGenerator.ts"],
      input: glob.sync(resolve(root, "*.html")),
    },
    outDir,
    emptyOutDir: true,
  },
  plugins: [
    eslint(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 100,
      },
      jpg: {
        quality: 80,
      },
      tiff: {
        quality: 100,
      },
    }),
    posthtml({
      root,
      plugins: [
        htmlnano({
          minifyCss: false,
        }),
      ],
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./node_modules", import.meta.url)),
      "@components": fileURLToPath(new URL("src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("src", import.meta.url)),
      "@scripts": fileURLToPath(new URL("src/scripts", import.meta.url)),
      "@styles": fileURLToPath(new URL("src/styles", import.meta.url)),
      "@img": fileURLToPath(new URL("src/public/img", import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     '/contactForm': {
  //       target: 'http://localhost:41223', // Replace with your back-end server URL
  //       changeOrigin: true,
  //       secure: false,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});

// function getPages() {
//   const pagesDirectory = resolve(__dirname, 'src')
//   const pages = {}

//   // Get all HTML files in the 'pages' directory
//   // const pageFiles = glob.sync(resolve(__dirname, 'src/pages', '*.html'))
//   const pageFiles = readdirSync(pagesDirectory).filter((file) => file.endsWith('.html'))

//   // Create entry points for each HTML file
//   for (const file of pageFiles) {
//     const name = file.replace('.html', '')
//     const inputPath = resolve(pagesDirectory, file)
//     pages[name] = inputPath
//   }

//   return pages
// }
