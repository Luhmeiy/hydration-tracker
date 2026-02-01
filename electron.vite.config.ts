import { defineConfig } from 'electron-vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	main: {},
	preload: {},
	renderer: {
		plugins: [svelte(), tailwindcss()],
		resolve: {
			alias: {
				$components: resolve('src/renderer/src/components'),
				$interfaces: resolve('src/renderer/src/interfaces'),
				$pages: resolve('src/renderer/src/pages'),
				$utils: resolve('src/renderer/src/utils')
			}
		}
	}
})

