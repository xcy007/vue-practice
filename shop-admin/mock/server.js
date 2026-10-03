// ============================================================
// 前端 Mock 后端服务（Express）
// 对应前端请求见 src/api/manager.js
//
// 请求路径经过两层处理：
//   1. axios 实例 baseURL = '/api'（见 src/axios.js）
//   2. Vite 开发代理剥离 '/api' 前缀后转发到本服务（见 vite.config.js）
// 因此本服务实际收到的路径不含 '/api' 前缀：
//   前端 POST /api/admin/login   -> 本服务 POST /admin/login
//   前端 GET  /api/admin/getinfo -> 本服务 GET  /admin/getinfo
//
// 响应格式约定（务必保持一致）：
//   成功：res.json({ data: ... })
//         因为 src/axios.js 响应拦截器返回 response.data.data，
//         前端最终拿到的是内层 data 对象。
//   失败：res.status(4xx/5xx).json({ message: '...' })
//         错误拦截器读取 error.response.data.message 弹出提示。
//   鉴权：请求头字段名为 token（非 Authorization），
//         由 src/axios.js 请求拦截器注入。
// ============================================================

import express from 'express'

const app = express()
const PORT = 3000

// 解析 JSON 请求体（登录时前端发送 { username, password }）
app.use(express.json())

// ---------------- 登录 ----------------
// POST /admin/login  请求体: { username, password }
// 对应 src/api/manager.js 的 login()；src/stores/index.js 中读取 res.token 存入 cookie
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body

  // 前端只校验非空，这里按“非空即通过”；如需限制演示账号可改为固定判断
  if (!username || !password) {
    return res.status(400).json({ message: '用户名或密码不能为空' })
  }

  // 返回任意非空 token，前端会写入 cookie 并在后续请求头带上
  const token = 'mock-token-' + Date.now()
  res.json({ data: { token } })
})

// ---------------- 获取当前用户信息 ----------------
// GET /admin/getinfo  请求头: token
// 对应 src/api/manager.js 的 getinfo()；结果整体存入 store.user
app.get('/admin/getinfo', (req, res) => {
  const token = req.headers['token']

  if (!token) {
    return res.status(401).json({ message: '未登录' })
  }

  // 用户信息字段可随意扩展，前端会原样存入 store.user
  res.json({
    data: {
      id: 1,
      username: 'admin',
      name: '管理员',
      avatar: '',
      roles: ['admin'],
    },
  })
})

// ---------------- 兜底 404 ----------------
app.use((req, res) => {
  res.status(404).json({ message: '接口不存在: ' + req.method + ' ' + req.path })
})

// ============================================================
// 启动方法（本服务监听 3000 端口，与 vite.config.js 的代理目标一致）
//
//   # 1. 安装依赖（express 尚未在项目中，首次需安装）
//   npm install express
//
//   # 2. 启动 Mock 服务（项目是 ESM，直接 node 运行即可）
//   node mock/server.js
//
//   # 3. 另开一个终端启动前端（Vite 会把 /api 代理到本服务）
//   npm run dev
//
//   验证：
//   curl -X POST http://localhost:3000/admin/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"123456\"}"
//   curl http://localhost:3000/admin/getinfo -H "token: mock-token-xxx"
//
//   注：若前端不走 Vite 代理、改为直连 3000，需处理 CORS（npm i cors 后 app.use(cors())）。
// ============================================================

app.listen(PORT, () => {
  console.log(`Mock server 已启动: http://localhost:${PORT}`)
})
