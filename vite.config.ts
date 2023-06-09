import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "images": path.resolve(__dirname, "./src/assets/images"),
      "icons": path.resolve(__dirname, "./src/assets/icons"),
      "assets": path.resolve(__dirname, "./src/assets"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
    }
  }
})
