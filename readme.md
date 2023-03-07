# 全栈开发脚手架

> 一条简单的命令，启动全栈开发服务，前后端全程热更新保持
>
> 基于vite构建工具，整合koa、prisma，提供快速，高效，稳定的开发体验

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
$ git clone git@github.com:chumijs/chumi-vite.git
```

2. 安装依赖
```sh
$ yarn
```

3. 初始化你当前项目的git仓库
```sh
$ git init
$ git add .
$ git commit -m "first"
# 要先添加远程仓库地址
$ git push
```

4. 启动开发
```sh
$ yarn
$ yarn prisma generate
$ yarn dev
```

5. 编译部署
```sh
$ yarn build
$ yarn start
```