import Koa from 'koa';
import { KoaApp } from '@/types';
import chumi from 'chumi';

import entryApp from '@/app/entry';
import staticApp from '@/app/static';
import session from '@/app/session';
import controllers from '@/controllers';

const app = new Koa() as KoaApp;
app.root = process.cwd();

entryApp(app);
staticApp(app);
session(app);

// 业务
app.use(
  chumi(controllers, {
    koaBody: {
      multipart: true,
      parsedMethods: ['GET', 'POST', 'DELETE', 'PUT'],
      formidable: {
        maxFileSize: 20000 * 1024 * 1024 * 10 // 设置上传文件大小最大限制，默认200M
      }
    },
    swagger: {},
    onFinish: (ctx) => {
      console.log('finish', ctx.path, +new Date() - ctx.startTime + 'ms');
    },
    onStart: (ctx) => {
      ctx.startTime = +new Date();
      console.log('start');
    },
    onError: async (ctx, error) => {
      console.error('出错啦', error);
    },
    onSuccess: async () => {
      console.log('成功');
    }
  })
);

if (import.meta.env.PROD) {
  // 编译后，生产环境运行的服务端口
  const port = process.env.NODE_PORT;
  app.listen(port, function () {
    console.log('> http://localhost:' + port);
  });
}

export const viteNodeApp = app;
