# AI D&D Frontend - 项目结构说明

## 项目概览
这是一个基于 Vue 3 + TypeScript + Pinia + Ant Design Vue 的 AI 驱动的龙与地下城（D&D）游戏前端应用。

## 技术栈
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 提供类型安全
- **Pinia** - Vue 3 状态管理库
- **Vue Router** - 路由管理
- **Ant Design Vue** - UI 组件库
- **Vite** - 构建工具

## 项目结构

```
src/
├── api/                    # API 服务层
│   ├── client.ts          # HTTP 客户端配置
│   ├── auth.ts            # 用户认证 API
│   └── index.ts           # API 统一导出
├── assets/                # 静态资源
│   └── vue.svg
├── components/           # 可复用组件
│   ├── game/            # 游戏相关组件
│   │   ├── SceneCard.vue
│   │   └── ToolsCard.vue
│   ├── layout/          # 布局组件
│   │   ├── AppHeader.vue
│   │   └── BottomNav.vue
│   └── ui/              # UI 组件
│       └── ChatInput.vue
├── composables/         # 组合式函数
│   ├── useCommon.ts    # 通用组合式函数
│   └── index.ts
├── config/             # 配置文件
│   └── theme.ts       # 主题配置
├── router/             # 路由配置
│   └── index.ts
├── stores/             # Pinia 状态管理
│   ├── auth.ts        # 用户认证状态
│   ├── game.ts        # 游戏状态
│   └── index.ts
├── types/              # TypeScript 类型定义
│   ├── user.ts        # 用户相关类型
│   ├── game.ts        # 游戏相关类型
│   ├── common.ts      # 通用类型
│   └── index.ts
├── utils/              # 工具函数
│   ├── common.ts      # 通用工具函数
│   └── index.ts
├── views/              # 页面组件
│   ├── GameView.vue   # 游戏主页面
│   ├── LoginView.vue  # 登录页面
│   ├── RegisterView.vue # 注册页面
│   └── ProfileView.vue # 用户资料页面
├── App.vue             # 根组件
├── main.ts             # 应用入口
├── style.css           # 全局样式
└── vite-env.d.ts       # Vite 类型声明
```

## 核心功能模块

### 1. 用户认证系统 (`stores/auth.ts`)
- 用户登录/注册
- JWT Token 管理
- 用户状态持久化
- 权限验证

### 2. 游戏状态管理 (`stores/game.ts`)
- 游戏场景状态
- 工具和物品管理
- 游戏历史记录
- 玩家属性

### 3. API 服务层 (`api/`)
- HTTP 客户端封装
- 认证 API 接口
- 请求/响应拦截
- 错误处理

### 4. 路由系统 (`router/index.ts`)
- 页面路由配置
- 认证守卫
- 路由元信息

### 5. UI 组件
- 响应式移动端布局
- 暗色主题
- 游戏界面组件
- 表单组件

## 环境配置

### 环境变量
- `.env` - 开发环境配置
- `.env.production` - 生产环境配置

### 主要配置项
- `VITE_API_BASE_URL` - API 基础地址
- `VITE_APP_TITLE` - 应用标题
- `VITE_DEV_MODE` - 开发模式标识

## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 代码规范

### 命名约定
- 组件：PascalCase (`GameCard.vue`)
- 文件/目录：camelCase (`userApi.ts`)
- 常量：SCREAMING_SNAKE_CASE (`API_BASE_URL`)

### 文件组织
- 每个功能模块独立目录
- 统一的 `index.ts` 导出文件
- 类型定义单独维护

### 状态管理
- 使用 Pinia 进行状态管理
- 每个 store 职责单一
- 支持 TypeScript 类型推导

## 待实现功能

### 短期目标
- [ ] 完善用户认证流程
- [ ] 实现游戏 API 接口
- [ ] 添加聊天功能
- [ ] 优化移动端体验

### 长期规划
- [ ] 添加多人游戏支持
- [ ] 实现游戏存档功能
- [ ] 添加音效和动画
- [ ] 支持自定义角色

## 注意事项

1. **路径别名**：已配置 `@` 指向 `src` 目录
2. **类型安全**：严格的 TypeScript 配置
3. **响应式设计**：优先考虑移动端体验
4. **状态持久化**：用户认证状态会保存到本地存储
5. **API 模拟**：当前使用模拟数据，等待后端接口
