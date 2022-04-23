// 对于缓存的操作

class Cache {
  getCache(key: string) {
    return JSON.parse(window.localStorage.getItem(key) || '{}')
  }

  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  removeCache(key: string) {
    window.localStorage.removeItem(key)
  }

  clearCache() {
    window.localStorage.clear()
  }

  hasCache(key: string) {
    return !!this.getCache(key)
  }
}

const cache = new Cache()

export default cache
