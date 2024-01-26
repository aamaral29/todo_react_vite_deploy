import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "todo_react_vite_deploy",
  build: {
    chunkSizeWarningLimit: 1000, // ou outro valor conforme necessário
  },
})
