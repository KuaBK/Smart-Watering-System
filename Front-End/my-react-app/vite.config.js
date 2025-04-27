import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
  ],
  define: {
    API_CE: JSON.stringify('http://localhost:8080'),
    API_BE: JSON.stringify('http://localhost:8081'),
  },
})
