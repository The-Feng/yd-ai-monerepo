/**
 * 本地存储工具函数
 */

/**
 * 设置本地存储
 * @param key 键名
 * @param value 值（会自动序列化为 JSON）
 */
export function setStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Failed to set storage:', error);
  }
}

/**
 * 获取本地存储
 * @param key 键名
 * @param defaultValue 默认值（如果不存在）
 * @returns 存储的值或默认值
 */
export function getStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue ?? null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Failed to get storage:', error);
    return defaultValue ?? null;
  }
}

/**
 * 删除本地存储
 * @param key 键名
 */
export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove storage:', error);
  }
}

/**
 * 清空所有本地存储
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}

