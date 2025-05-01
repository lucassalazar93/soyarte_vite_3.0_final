import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto permite conexiones externas
    allowedHosts: [
      'a2be-190-69-32-61.ngrok-free.app', // Agrega aquí tu URL pública de ngrok
    ],
  },
});
