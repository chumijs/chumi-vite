/**
 * session管理中间件
 */
import { KoaApp } from '@/types';
import session from 'koa-session';

export default (app: KoaApp) => {
  const session_signed_key = ['auth']; // 这个是配合signed属性的签名key
  const sessionConfig = {
    key: `auth:sess`, // cookie key (default is koa:sess)
    maxAge: 1000 * 60 * 60 * 24, // 过期时间(毫秒) maxAge in ms (default is 1 days)
    overwrite: true, // 是否可以overwrite    (默认default true)
    httpOnly: true, // cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, // 签名默认true
    rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false // (boolean) renew session when session is nearly expired,
  };
  app.keys = session_signed_key;
  app.use(session(sessionConfig, app));
};
