# 登录后自动加载会话数据流程

## 概述

本功能实现了用户登录成功后自动调用 `/api/chat/sessions/document/{documentId}` 接口获取聊天会话数据的流程。

## 实现的文件

### 1. 类型定义 (`src/types/index.ts`)
```typescript
export interface ChatSession {
  id: string
  userId: number
  documentId: string
  createdAt: string
  updatedAt: string
  metadata: Record<string, any>
}
```

### 2. API 模块 (`src/api/chat.ts`)
- `getDocumentSessions(documentId: string)`: 获取指定文档的会话列表
- 自动提取会话ID并在控制台输出

### 3. 聊天 Store (`src/stores/chat.ts`)
- 新增状态：`chatSessions`、`isLoadingSessions`
- 新增方法：`fetchUserSessionsByDocumentId(documentId: string, userId: string)`
- 新增方法：`loadUserMessagesBySession(sessionId: string)`

### 4. 认证 Store (`src/stores/auth.ts`)
- 修改 `login` 方法：支持可选的 `documentId` 参数，登录成功后自动调用聊天 Store 的会话加载方法

## 使用方法

### 基础用法
```typescript
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const authStore = useAuthStore()
const chatStore = useChatStore()

// 登录并加载会话数据
await authStore.login(credentials, 'your-document-id')

// 访问加载的会话数据
console.log('会话列表:', chatStore.chatSessions)
console.log('会话ID:', chatStore.chatSessions.map(s => s.id))
```

### 使用组合式函数
```typescript
import { useLoginWithSessions } from '@/composables/useAuth'

const { loginWithSessions } = useLoginWithSessions()

const result = await loginWithSessions(credentials, 'your-document-id')
console.log('会话ID:', result.sessionIds)
```

## API 响应格式

接口 `/api/chat/sessions/document/{documentId}` 返回的数据格式：
```json
[
  {
    "id": "string",
    "userId": 0,
    "documentId": "string", 
    "createdAt": "2025-06-23T15:23:26.032Z",
    "updatedAt": "2025-06-23T15:23:26.032Z",
    "metadata": {}
  }
]
```

## 流程说明

1. 用户调用 `login(credentials, documentId)` 方法
2. 执行正常的登录流程
3. 登录成功后，如果提供了 `documentId`：
   - 自动调用聊天 Store 的 `fetchUserSessionsByDocumentId(documentId, userId)`
   - 调用 API 获取会话数据
   - 将数据保存到 `chatSessions` 状态中
   - 提取并输出所有会话ID
4. 即使会话数据加载失败，也不会影响登录成功的状态

## 错误处理

- 登录失败：抛出错误，阻止后续流程
- 会话数据加载失败：仅输出警告，不影响登录状态
- 所有错误都会在控制台输出详细信息

## 调试信息

在开发模式下，所有操作都会输出详细的调试信息：
- 🔧 开始执行的操作
- ✅ 成功完成的操作  
- ❌ 失败的操作
- 📋 获取到的会话ID列表
