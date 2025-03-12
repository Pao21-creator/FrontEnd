import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,  
    host: true,  
    historyApiFallback: true,
    allowedHosts: [
      'frontend-mvx5.onrender.com', 
    ]
  }
})
