import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    historyApiFallback: true, // ✅ Asegura que las rutas de React Router funcionen en desarrollo
  },
  build: {
    outDir: 'dist', // ✅ Carpeta de salida de Vite para el build en producción
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
