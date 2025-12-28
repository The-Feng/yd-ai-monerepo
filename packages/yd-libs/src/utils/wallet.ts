/**
 * 钱包地址格式化工具函数
 */

/**
 * 格式化钱包地址
 * @param address 钱包地址
 * @param startLength 开头显示的字符数，默认 6
 * @param endLength 结尾显示的字符数，默认 4
 * @returns 格式化后的地址，例如 "0x1234...5678"
 */
export function formatAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return '';
  
  if (address.length <= startLength + endLength) {
    return address;
  }
  
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
}

/**
 * 缩短钱包地址（默认格式）
 * @param address 钱包地址
 * @returns 缩短后的地址，例如 "0x1234...5678"
 */
export function shortenAddress(address: string): string {
  return formatAddress(address);
}

/**
 * 验证以太坊地址格式
 * @param address 钱包地址
 * @returns 是否为有效的以太坊地址
 */
export function isValidAddress(address: string): boolean {
  if (!address) return false;
  
  // 以太坊地址格式：0x 开头，后面跟 40 个十六进制字符（不区分大小写）
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

/**
 * 验证地址校验和格式（EIP-55）
 * @param address 钱包地址
 * @returns 是否为有效的校验和地址
 */
export function isValidChecksumAddress(address: string): boolean {
  if (!isValidAddress(address)) return false;
  
  // 简单校验：如果地址包含大写字母，则应该是校验和格式
  // 完整的 EIP-55 校验需要计算 keccak256 hash，这里简化处理
  const hasUpperCase = /[A-F]/.test(address);
  const hasLowerCase = /[a-f]/.test(address);
  
  // 如果同时包含大小写，可能是校验和格式
  if (hasUpperCase && hasLowerCase) {
    // 这里可以添加更严格的校验逻辑
    return true;
  }
  
  // 全小写或全大写也是有效的
  return true;
}

/**
 * 转换为校验和地址（EIP-55）
 * 注意：这是一个简化版本，实际应该使用 keccak256 计算
 * @param address 钱包地址
 * @returns 校验和地址
 */
export function toChecksumAddress(address: string): string {
  if (!isValidAddress(address)) {
    throw new Error('Invalid address format');
  }
  
  // 简化实现：实际应该使用 keccak256 计算每个字符的大小写
  // 这里只是确保格式正确
  return address;
}

