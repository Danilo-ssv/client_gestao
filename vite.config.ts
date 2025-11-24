import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8181',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
      port: Number.parseInt(process.env.VITE_PORT!),
      host: true,
      watch: {
        usePolling: true,
      },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
}
