import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const apiTarget = 'http://192.168.18.123/freteapp/backend'

export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] })
    ],

    server: {
        host: true,
        port: 5173,

        proxy: {
            '/api': {
                target: apiTarget,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/API')
            }
        }
    }
})
