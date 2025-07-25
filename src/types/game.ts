// 游戏相关类型定义

// 剧本选择相关类型
export interface Scenario {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  playerCount: string
  duration: string
  backgroundType: 'low' | 'medium' | 'high'
  rewardDescription: string
  storyBackground: string
  difficulty: '简单' | '中等' | '困难'
  socialActivity: '很少' | '适中' | '频繁'
}

export interface GameState {
  currentLocation: string
  sceneDescription: string
  playerLevel: number
  playerExperience: number
  playerHealth: number
  playerMana: number
}

export interface Tool {
  id: string
  name: string
  icon: any
  description?: string
  damage?: number
  durability?: number
}

export interface GameAction {
  id: string
  type: 'move' | 'attack' | 'use_item' | 'interact'
  description: string
  target?: string
}

export interface SceneResponse {
  description: string
  actions: GameAction[]
  tools?: Tool[]
  events?: GameEvent[]
}

export interface GameEvent {
  id: string
  type: 'battle' | 'discovery' | 'dialogue' | 'quest'
  title: string
  description: string
  choices?: EventChoice[]
}

export interface EventChoice {
  id: string
  text: string
  consequences?: string
}

export interface SceneAction {
  id: string
  text: string
  icon?: any
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text'
  ghost?: boolean
}
