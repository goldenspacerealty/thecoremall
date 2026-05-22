import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://thecoremallbackend.onrender.com'),
  },
  plugins: [
    react(),
    // Copy static response on the server to the client, used an example of 'Hello world'
    // Copy SPA fallback files from public/ → dist/ so routes like /admin don't 404
    // on static hosts (cPanel, Cloudflare, Netlify, etc.)
    // Applies static copies
    {
      name: 'copy-static-routes',
      enforce: 'post',
      writeBundle() {
        const srcDir = path.resolve(__dirname, 'public');
        const dstDir = path.resolve(__dirname, 'dist');

        const files = ['_redirects', '404.html'];

        for (const file of files) {
          const src = path.join(srcDir, file);
          const dst = path.join(dstDir, file);
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, dst);
            console.log(`[copy-static-routes] ${src} → ${dst}`);
          }
        }
      }
    }

  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
});
