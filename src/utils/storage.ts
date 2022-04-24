import { Channel, Token } from '@/types/data'
const TOKEN_KEY = 'token'
const CHANNEL_KEY = 'geek-h5-sh90-channel'
// 提供本地存储的操作
/**
 * 保存token
 * @param token
 */
export function setToken(token: Token): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

/**
 * 获取token
 * @returns
 */
export function getToken(): Token {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

/**
 * 移除token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断token
 * @returns
 */
export function hasToken(): boolean {
  return !!getToken().token
}

/**
 * 获取频道数据
 * @returns
 */
export function getChannels(): Channel[] {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY) || '[]')
}

/**
 * 保存频道数据
 * @param channels
 */
export function setChannels(channels: Channel[]): void {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}
