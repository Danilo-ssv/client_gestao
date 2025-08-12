import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// http://10.1.1.115:8181/clientes/read

// https://vite.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   // '/api': 'http://localhost:8181'
    //   '/api': 'http://10.1.1.115:8181'
    //   // '/api': 'http://localhost:8181'
    // }
    proxy: {
      '/api': {
        target: 'http://10.1.1.118:8181',
        // target: 'http://localhost:8181',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
