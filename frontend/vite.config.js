import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,         // ✔️ Permite que puedas acceder desde otro dispositivo (por IP local)
    port: 5173,         // ✔️ Puerto por defecto para Vite
    hmr: {
      overlay: true,    // ✔️ Muestra errores directamente en el navegador
    },
  },
})
