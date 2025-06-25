import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GameState, Tool, GameAction, SceneResponse } from '../types'

export const useGameStore = defineStore('game', () => {
  // 游戏状态
  const gameState = ref<GameState>({
    currentLocation: '明亮的地窖',
    sceneDescription: '你踏入地窖，空气中弥漫着尘土和霉败的气息。角落里有一个生锈的铁箱，看起来已经在这里很久了。',
    playerLevel: 1,
    playerExperience: 0,
    playerHealth: 100,
    playerMana: 50
  })

  const availableTools = ref<Tool[]>([
    { id: 'sword', name: '钢钩', icon: 'ToolOutlined' },
    { id: 'shield', name: '铁链', icon: 'SafetyCertificateOutlined' },
    { id: 'magic', name: '开锁器', icon: 'ThunderboltOutlined' }
  ])

  const gameHistory = ref<string[]>([])
  const isLoading = ref(false)

  // 更新场景
  const updateScene = (sceneData: Partial<SceneResponse>) => {
    if (sceneData.description) {
      gameState.value.sceneDescription = sceneData.description
    }
    if (sceneData.tools) {
      availableTools.value = sceneData.tools
    }
  }
  // 执行游戏动作
  const executeAction = async (action: GameAction) => {
    try {
      isLoading.value = true
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // 模拟不同类型的响应
      let newDescription = ''
      switch (action.type) {
        case 'interact':
          newDescription = `你${action.description}。环境发生了微妙的变化，你感觉到了一些不寻常的气息...`
          break
        case 'move':
          newDescription = `你移动到了新的位置。这里的景象让你感到既熟悉又陌生...`
          break
        case 'attack':
          newDescription = `你发起了攻击！战斗的结果即将揭晓...`
          break
        case 'use_item':
          newDescription = `你使用了物品。神秘的力量在空气中流淌...`
          break
        default:
          newDescription = `你执行了${action.description}，冒险继续进行...`
      }
      
      const mockResponse: SceneResponse = {
        description: newDescription,
        actions: [
          { id: '1', type: 'interact', description: '仔细观察周围' },
          { id: '2', type: 'move', description: '向前探索' },
          { id: '3', type: 'interact', description: '搜索隐藏物品' }
        ]
      }
      
      updateScene(mockResponse)
      gameHistory.value.push(`[${new Date().toLocaleTimeString()}] ${action.description}`)
      
      console.log('模拟游戏动作执行成功:', action)
      
      return mockResponse
    } catch (error) {
      console.error('执行游戏动作失败:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const sendChatMessage = async (message: string): Promise<string> => {
    try {
      isLoading.value = true;
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = `AI收到了你的消息: "${message}"。这是一个模拟的回复。`;
      gameHistory.value.push(`[${new Date().toLocaleTimeString()}] 你: ${message}`);
      gameHistory.value.push(`[${new Date().toLocaleTimeString()}] AI: ${response}`);
      return response;
    } catch (error) {
      console.error('发送消息失败:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  // 使用工具
  const useTool = async (tool: Tool) => {
    try {
      isLoading.value = true
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // 模拟工具使用效果
      const effects = [
        `你使用了${tool.name}，感觉力量有所提升！`,
        `${tool.name}散发出神秘的光芒，为你指引方向。`,
        `使用${tool.name}后，你发现了隐藏的线索...`,
        `${tool.name}的威力超出了你的想象！`
      ]
      
      const randomEffect = effects[Math.floor(Math.random() * effects.length)]
      
      // 更新游戏状态
      gameState.value.sceneDescription += ` ${randomEffect}`
      gameHistory.value.push(`[${new Date().toLocaleTimeString()}] 使用了${tool.name}`)
      
      console.log('模拟工具使用成功:', tool)
      
      return randomEffect
    } catch (error) {
      console.error('使用工具失败:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // 更新玩家状态
  const updatePlayerState = (updates: Partial<GameState>) => {
    Object.assign(gameState.value, updates)
  }

  // 重置游戏
  const resetGame = () => {
    gameState.value = {
      currentLocation: '明亮的地窖',
      sceneDescription: '你踏入地窖，空气中弥漫着尘土和霉败的气息。角落里有一个生锈的铁箱，看起来已经在这里很久了。',
      playerLevel: 1,
      playerExperience: 0,
      playerHealth: 100,
      playerMana: 50
    }
    gameHistory.value = []
  }

  return {
    gameState,
    availableTools,
    gameHistory,
    isLoading,
    updateScene,
    executeAction,
    useTool,
    resetGame,
    sendChatMessage
  }
})
