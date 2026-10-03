# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在本仓库中工作时提供指引。

## 命令

- `npm run dev` — 启动 Vite 开发服务器（将 `/api` 代理到 `http://localhost:3000`）。
- `npm run build` — 生产构建，输出到 `dist/`。
- `npm run preview` — 本地预览生产构建产物。
- `npm run test` — 运行一次 Vitest 测试套件（`vitest run`）。
- `npm run mock` — 启动 Express Mock 后端（`node mock/server.js`，监听 3000 端口）。

未配置 linter。要求 Node `^22.18.0 || >=24.12.0`。

## 技术栈

Vue 3（组合式 API、`<script setup>`）+ Vite + 纯 JavaScript（非 TypeScript）+ Element Plus + WindiCSS + Pinia + axios + 基于 cookie 的鉴权。

## 架构

入口：`index.html` → `src/main.js`。

`@` 别名指向 `src/`，在 [vite.config.js](vite.config.js) 与 [jsconfig.json](jsconfig.json) 中均有配置。WindiCSS 无配置文件运行 —— 工具类通过 `<style>` 块中的 `@apply` 和内联类（如 `w-[250px]`）使用；`virtual:windi.css` 模块在 `main.js` 中引入。

开发服务器将 `/api/*` 代理到 `http://localhost:3000` 并剥离 `/api` 前缀，因此后端需运行在 3000 端口。

### 数据流

- [src/axios.js](src/axios.js) — 共享的 axios 实例，`baseURL: '/api'`。请求拦截器注入从 cookie 读取的 `token` 头；响应拦截器解包 `response.data.data`（因此 API 函数直接拿到内层 `data` 对象），失败时弹出错误提示。注意 `timeout` 设置为 1000 ms。
- [src/composables/auth.js](src/composables/auth.js) — 基于 `useCookies` 的 token 增删查；cookie 键为 `admin-token`。
- [src/composables/util.js](src/composables/util.js) — `toast(message, type)` 工具函数，封装 Element Plus 的 `ElNotification`。
- [src/api/manager.js](src/api/manager.js) — 基于 axios 实例的 API 函数（`login`、`getinfo`）。`login` 返回含 `token` 字段的载荷并存储之。
- [src/stores/index.js](src/stores/index.js) — Pinia `useUserStore`（Option Store）：`user` 状态及 `login`/`getinfo` 两个 action。

### 路由与鉴权守卫

- [src/router/index.js](src/router/index.js) — 三条路由：`/` → Home、`/login` → Login、兜底 → 404。
- [src/permission.js](src/permission.js) — 全局 `beforeEach` 守卫，在 `main.js` 中以副作用方式引入：无 token 时重定向到 `/login`，已登录用户再次访问 `/login` 时拦截，鉴权导航时调用 `useUserStore().getinfo()`。

## 测试

Vitest 在 [vitest.config.js](vitest.config.js) 中配置（`@` 别名、node 环境）。store 由 [src/stores/index.test.js](src/stores/index.test.js) 覆盖，其中 mock 了 `@/api/manager.js` 和 `@/composables/auth.js`。新增测试时，以 `*.test.js` 命名并与被测模块放在同一目录。

## Mock 后端

本地开发用 Express Mock 服务模拟后端：[mock/server.js](mock/server.js)，监听 3000 端口（与 Vite 代理目标一致），用 `npm run mock` 启动。它实现两个接口：`POST /admin/login`（返回 `{ data: { token } }`）和 `GET /admin/getinfo`（校验 `token` 请求头，返回 `{ data: {用户信息} }`）。响应须符合前端 axios 拦截器约定——成功包 `{ data: ... }`、失败返回非 2xx + `{ message }`。
