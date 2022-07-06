import {defineConfig} from 'vite';
// https://vitejs.dev/config/

export default defineConfig(async ({command, mode}) => {
  console.log(command, mode);

  return {
    assetsDir: 'assets',
    plugins: [],
    root: 'src',
    build: {
      emptyOutDir: true,
      outDir: '../dist',
    },
  };
});
