import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Em desenvolvimento, repassa as chamadas /api para o Express
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
