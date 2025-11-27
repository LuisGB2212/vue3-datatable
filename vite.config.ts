import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'TableCustomizable',
            formats: ['es', 'cjs', 'umd'],
            fileName: (format) => {
                if (format === 'es') return 'vue3-datatable.js';
                if (format === 'cjs') return 'vue3-datatable.cjs';
                if (format === 'umd') return 'vue3-datatable.umd.js';
                return `vue3-datatable.${format}.js`;
            },
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue', 'dayjs', 'litepicker'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                    dayjs: 'dayjs',
                    litepicker: 'litepicker',
                },
            },
        },
    },
});