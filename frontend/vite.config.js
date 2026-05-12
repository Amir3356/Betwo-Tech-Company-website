import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      force: true,
    },
    server: {
      proxy: {
        '/api/nvidia': {
          target: 'https://integrate.api.nvidia.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/nvidia/, ''),
          headers: env.NVIDIA_API_KEY
            ? {
                Authorization: `Bearer ${env.NVIDIA_API_KEY}`,
              }
            : undefined,
        },
      },
    },
  }
})
