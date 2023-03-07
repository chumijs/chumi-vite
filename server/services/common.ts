import { Service } from 'chumi';
import { Context } from 'vm';

@Service
export default class {
  // 必须指定ctx，才能获取到上下文对象
  ctx: Context;

  m() {
    console.log(this.ctx.path);
  }

  test() {
    console.log('from common service test');
    this.m();
  }
}
