import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import * as React from "react";`
  },
  server:{
    host:{port:3000},
    hmr: {
      port: 443,
    }
  }
})
