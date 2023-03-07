/**
 * 代理静态资源
 */
import Koa from 'koa';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';
import compress from 'koa-compress';
import path from 'path';
import zlib from 'zlib';
import { KoaApp } from '@/types';

const maxAge = 30 * 24 * 3600;

export default (app: KoaApp) => {
  if (import.meta.env.PROD) {
    app.use(
      compress({
        filter(content_type) {
          return /(image|javascript|css)/i.test(content_type);
        },
        threshold: 2048,
        gzip: {
          flush: zlib.constants.Z_SYNC_FLUSH
        },
        deflate: {
          flush: zlib.constants.Z_SYNC_FLUSH
        },
        br: false
      })
    );

    /**
     * 绑定静态资源
     */
    const koaApp = new Koa();
    app.use(koaMount('/assets', koaApp.use(koaStatic(path.join(__dirname, 'assets'), { maxAge }))));
  }
};
