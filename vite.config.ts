import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [react(), mkcert()],
  base: '/tg-pitch-detector'
})
