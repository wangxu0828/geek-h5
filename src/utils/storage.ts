import { Channel, History, Token } from '@/types/data'
const TOKEN_KEY = 'token'
const CHANNEL_KEY = 'geek-h5-sh90-channel'

// 搜索关键字的本地缓存键名
const SEARCH_HIS_KEY = 'geek-h5-sh88-channel'
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
/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): History => {
  return JSON.parse(localStorage.getItem(SEARCH_HIS_KEY) || '[]')
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: History): void => {
  localStorage.setItem(SEARCH_HIS_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_HIS_KEY)
}
