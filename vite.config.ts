// vite.config.ts
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': process.env,
  },
  mode: process.env.NODE_ENV,
});
