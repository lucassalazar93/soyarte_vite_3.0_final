import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 Esto es lo que permite que se vea desde otros dispositivos
    port: 5173, // (puedes cambiarlo si deseas)
    hmr: {
      overlay: true, // 🔥 Esto muestra errores en pantalla
    },
  },
})
