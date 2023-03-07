import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import { transformWithEsbuild } from 'vite';

import { minify } from 'terser';

export default function compressServerCode() {
  let config;
  return {
    name: 'compress-server-code',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
    },
    async closeBundle() {
      /**
       * 格式化代码
       */
      const serverFilePath = path.join(process.cwd(), config.build.outDir, 'index.js');
      const r = await transformWithEsbuild(fs.readFileSync(serverFilePath, 'utf-8'), 'index.js', {
        minify: true,
        platform: 'node',
        format: 'cjs',
        treeShaking: true,
        legalComments: 'eof'
      });
      const result = await transformWithEsbuild(
        r.code.replace(/\/\*![\s\S]*?\*\//gm, ''),
        'index.js',
        {
          minify: true
        }
      );
      const realResult = await minify(result.code, { toplevel: true, mangle: { toplevel: true } });
      console.log(
        'dist/index.js  ',
        (realResult.code.length / 1024).toFixed(2) + ' KiB',
        ' compress'
      );
      fs.writeFileSync(serverFilePath, realResult.code);

      /**
       * 拷贝prisma核心依赖文件
       */
      const outputPrisma = path.join(
        process.cwd(),
        config.build.outDir,
        'node_modules/.prisma/client'
      );
      fs.emptyDirSync(outputPrisma);
      const originPrisma = path.join(process.cwd(), 'node_modules', '.prisma/client');

      // 清空无效文件，防止混淆
      fs.writeFileSync(path.join(originPrisma, 'index.js'), '');
      fs.writeFileSync(path.join(originPrisma, 'index.d.ts'), '');
      fs.writeFileSync(path.join(originPrisma, 'index-browser.js'), '');

      fs.copySync(originPrisma, outputPrisma);
    }
  } as Plugin;
}
