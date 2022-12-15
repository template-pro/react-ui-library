# 组件库贡献不完全指南

> 非常高兴您愿意参与组件建设

## 前置条件

- [pnpm](https://pnpm.io/) 包管理器，嫌切换 yarn、npm、pnpm 麻烦可以使用 [@antfu/ni](https://github.com/antfu/ni) 快速切换。
- `NodeJS@14.x`, 可以使用 `pnpm env use --global v14` 或者 [nvm](https://github.com/nvm-sh/nvm) 进行 Node 版本管理。

## 快速了解

```bash
pnpm start      // 启动组件文档
```

稍等片刻后，本地浏览器打开 [http://localhost:8000/](http://localhost:8000/) 预览。

## 其他命令

> 下面出现的 `nr` 均表示 `pnpm run` 更多请看前置条件。

```bash
nr clean      // 移除构建产出
nr start      // 启动 dumi 开发文档
nr build      // 全部构建
nr test       // 运行所有测试用例
```

**测试命令**更多命令查阅[Jest CLI 选项](https://jestjs.io/zh-Hans/docs/cli)

- `nr test packages/rc-ui/src/condition-input --watch` 表示监听并运行改目录下所有测试用例文件。
- `nr test -u` 表示更新所有测试用例快照。

**依赖管理**更多命令查阅[pnpm CLI](https://pnpm.io/zh/pnpm-cli)

- `ni eslint -Dw` 表示安装开发依赖在 root 目录。
- `nr -F @template-pro/icons build` 表示构建 @template-pro/icon 包。
