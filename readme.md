# Chumi · [![NPM version](https://img.shields.io/npm/v/chumi.svg)](https://www.npmjs.com/package/chumi)

### **全栈开发脚手架 · 一款运行时的koa中间件业务框架 · Chumi-Runtime · [文档](https://ph9o1wkcdp.feishu.cn/docx/UGCfdJVisokyQLxi2Rocuy4fn7f)**

> 一条简单的命令，启动全栈开发服务，前后端全程热更新保持
>
> chumi只提供业务层解决方案，其他功能开发者需自行处理，比如多环境配置等，只做简单的事情
>
> 基于vite构建工具，整合koa、prisma，提供快速，高效，稳定的开发体验

![image.png](https://s1.ax1x.com/2023/03/07/ppeFpUP.png)
## 体验

> 这是一个简单的空壳项目，你可以克隆下来，快速完成你的**全栈业务开发**

### dev
```sh
$ yarn
$ yarn prisma generate
$ yarn dev
```

### start
```sh
$ yarn build
$ yarn start
```

> 可以直接将编译后的`dist文件夹`拷贝到任何地方，运行`node index.js`，即可启动服务，不需要安装任何依赖


## 使用

1. 克隆当前项目

```sh
$ git clone git@github.com:Topthinking/chumi.git
```

2. 删除chumi包相关的文件
```sh
$ cd chumi
$ rm -rf chumi .git tsconfig.chumi.json
```

3. 安装chumi包、安装依赖
```sh
$ yarn add chumi
$ yarn
```

4. 初始化你当前项目的git仓库
```sh
$ git init
$ git add .
$ git commit -m "first"
# 要先添加远程仓库地址
$ git push
```

5. 启动开发
```sh
$ yarn
$ yarn prisma generate
$ yarn dev
```

6. 编译部署
```sh
$ yarn build
$ yarn start
```

## 功能

1. 服务端入口：**server/index.ts**

	 - 基于koa，封装了运行时框架，提供了注解功能，方便快速编写业务
	 - `chumi`的核心代码位于`chumi/`文件夹
	 - - [x] 解决运行时丢失TypeScript类型标注的问题，这很关键，否则所谓的类型注解将没有任何意义
	 - - [x] Controller层注解
	 - - [x] Service层注解
	 - - [x] DAO层，基于prisma提供解决方案
	 - - [x] Service引用Service，同时保证注入的ctx上下文是一致性的

2. 客户端入口：**src/index.html**
  
	 - 提供了基于vue3框架的开发模式，解决了接口请求问题
	 - 前端直接写请求，在服务端直接写业务，服务无需重启，自动热更新
	 - `yarn build`后，可以直接运行全栈项目，无缝切换
	 - - [x] server、client在使用同一个服务时的，前端热更新问题

3. TODO-LIST

- [ ] 初始化模板，`yarn create chumi` or `npm create chumi`