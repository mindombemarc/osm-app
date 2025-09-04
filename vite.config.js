import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // permet l'accès en local sur tous les réseaux
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ['osm-pfy3.onrender.com'], // ✅ autorise Render
  },
})
