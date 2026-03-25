import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MARCADOR_FLAG/', // Crucial para que los iconos y estilos carguen en GitHub Pages
})