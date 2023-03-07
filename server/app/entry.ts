/**
 * 单页应用入口index.html
 */
import { KoaApp } from '@/types';
import fs from 'fs';
import path from 'path';
import k2c from 'koa2-connect';
import { require } from '@/utils';

export default (app: KoaApp) => {
  let content = '';

  if (import.meta.env.PROD) {
    const entryFile = path.join(__dirname, 'index.html');
    if (fs.existsSync(entryFile)) {
      content = fs.readFileSync(entryFile, 'utf-8');
    }
  }

  app.use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
      if (import.meta.env.PROD) {
        // 生产直接返回前端单页入口html
        ctx.status = 200;
        ctx.body = content;
      } else {
        // 开发时，直接将404代理到web随机端口上
        return k2c(
          require('http-proxy-middleware').createProxyMiddleware('/', {
            target: `http://127.0.0.1:` + import.meta.env.WebPort,
            changeOrigin: true,
            logLevel: 'silent'
            // ws: true
          })
        )(ctx, next);
      }
    }
  });
};
