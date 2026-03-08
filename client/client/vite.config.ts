import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// proxy `/api` to backend in development so that front and back share origin
// (cookies set with SameSite=Lax will then be sent automatically)
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api'),
      }
    }
  }
})