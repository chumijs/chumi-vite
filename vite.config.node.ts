/**
 * vite node
 */
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import { resolve } from 'path';
import compressServerCode from './plugins/compress-server-code';
import viteServerPort from './plugins/server-port';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      // 支持swagger
      external: ['swagger-ui-dist', 'fs', 'path']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'server'),
      '.prisma/client/index': resolve(__dirname, 'node_modules', '.prisma/client/index.js'),
      '.prisma/client': resolve(__dirname, 'node_modules', '.prisma/client/index.js')
    }
  },
  ssr: {
    format: 'cjs'
  },
  server: {
    /**
     * 这里的port，既是开发时的端口，又是编译部署后的端口
     */
    port: 9999,
    host: '0.0.0.0',
    open: true
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'koa',
      appPath: './server/index.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'swc'
    }),
    compressServerCode(),
    viteServerPort()
  ]
});
