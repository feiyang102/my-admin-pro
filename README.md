# VUe3后台项目
## 启动和运行
推荐使用 pnpm 做包管理；
项目安装完依赖后，执行如下指令
```bash
# 初始化
pnpm i
pnpm run prepare
pnpm run lint:lint-staged
pnpx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"

# 本地运行
pnpm run dev
```

## 提交信息的类型一般有如下规范：
- feat: 增加一个新特性
- fix: 修复一个 bug
- perf: 更改代码以提高性能
- build: 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包）
- ci: 对 CI 配置文件和脚本的更改
- docs: 仅仅修改文档说明
- refactor: 代码重构时使用
- style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
- test: 增加新的测试功能或更改原有的测试模块
- temp: 临时的提交
