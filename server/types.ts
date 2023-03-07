import Router from 'koa-router';
import Koa from 'koa';
import 'koa-body';

export interface userInfo {
  access_token: string;
  user_name: string;
}

export interface ExtraContext {
  root: string;
  opsVersion?: string;
  beta: boolean;
  /**
   * 当前时间
   */
  currentTime: number;
  session: {
    userInfo?: userInfo;
  };
}

export interface ExtraApp {
  /**
   * 命令启动根目录
   */
  root: string;
  config: {
    env: string;
    appInfo: {
      lang: string;
      region: string;
      app_secret: string;
      app_id: string;
    };
  };
}

export type KoaCtx = Koa.ParameterizedContext<
  Koa.Context,
  ExtraContext & Router.IRouterParamContext<Koa.Context, ExtraContext>
>;

export type KoaApp = Koa<Koa.DefaultState, Koa.DefaultContext & ExtraContext> & ExtraApp;
