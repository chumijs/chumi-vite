import { Controller, Get, Param } from 'chumi';
import { User } from '@prisma/client';
import { prisma } from '@/utils';

@Controller()
export default class {
  @Get('/api/user/:uid(\\d+)')
  async getUserInfo(@Param.number('uid') uid: number) {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: uid
      }
    });
    return userInfo;
  }

  @Get('/api/user/createOne')
  async createUserInfo() {
    const userInfo = await prisma.user.create({
      data: {
        name: String(Math.random()),
        password: '123',
        email: '123@123.com'
      }
    });
    return userInfo;
  }

  @Get('/api/user/:uid(\\d+)/sql')
  async getUserInfoBySql(@Param.number('uid') uid: number) {
    const userInfo = await prisma.$queryRaw<User[]>`Select * From user where id = ${uid} Limit 1`;
    return userInfo?.[0];
  }
}
