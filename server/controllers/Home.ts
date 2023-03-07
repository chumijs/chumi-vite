import { Controller, Get, Param, Query, loadService, Post, Body } from 'chumi';
import home from '@/services/home';
import { Context } from 'koa';
import { prisma } from '@/utils';

@Controller('/api')
export default class {
  home = loadService(home);

  ctx: Context;

  hello() {
    console.log('from controller, hello>>', this.ctx.path, this.home.handleOtherAction);
  }

  @Post('/test')
  async testPost(@Body('name') name: string) {
    return name;
  }

  @Get('/test/:name')
  async index(@Param.string('name') name: string, @Query('value') value: string) {
    this.hello();
    await this.home.handleOtherAction();
    return `hello chumi, name: ${name}, value: ${value}`;
  }

  @Get('/test')
  async test() {
    return await prisma.user.findMany();
  }

  @Get('/test-2')
  async test2() {
    await this.home.handleOtherAction();
    return `hello test-2`;
  }
}
