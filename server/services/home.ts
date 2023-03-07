import { Service, loadService } from 'chumi';
import { Context } from 'koa';
import common from './common';

@Service
export default class {
  // 必须指定ctx，才能获取到上下文对象
  ctx: Context;

  // 必须使用ServiceType加载对象
  common = loadService(common);

  m() {
    console.log(this.ctx.path);
  }

  async handleOtherAction() {
    console.log('from service home, handleOtherAction>>', this.ctx.path, this.common.test);
    this.common.test();
    this.m();
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}
