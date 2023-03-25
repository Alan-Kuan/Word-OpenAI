import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const https_cred_path = `${ os.homedir() }/.office-addin-dev-certs`

function loadIfExists(file_name) {
    const file_path = path.resolve(`${https_cred_path}/${file_name}`);
    if (!fs.existsSync(file_path))
        return '';
    return fs.readFileSync(file_path);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 3000,
        https: {
            key: loadIfExists('localhost.key'),
            cert: loadIfExists('localhost.crt'),
            ca: loadIfExists('ca.crt')
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login/index.html'),
            }
        }
    }
})
