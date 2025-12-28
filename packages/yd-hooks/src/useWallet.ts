import { useEffect, useCallback } from 'react';
import { useImmer } from './useImmer';

/**
 * 钱包状态接口
 */
export interface WalletState {
  /** 是否已连接 */
  connected: boolean;
  /** 钱包地址 */
  address: string | null;
  /** 链 ID */
  chainId: number | null;
  /** 余额（wei，字符串格式） */
  balance: string | null;
  /** 连接错误信息 */
  error: string | null;
  /** 是否正在连接 */
  connecting: boolean;
}

/**
 * 钱包操作接口
 */
export interface WalletActions {
  /** 连接钱包 */
  connect: () => Promise<void>;
  /** 断开连接 */
  disconnect: () => void;
  /** 刷新余额 */
  refreshBalance: () => Promise<void>;
  /** 切换网络 */
  switchChain?: (chainId: number) => Promise<void>;
}

/**
 * useWallet hook - 管理钱包连接状态和操作
 * 
 * @param options 配置选项
 * @returns 返回钱包状态和操作函数
 * 
 * @example
 * ```tsx
 * const { wallet, actions } = useWallet({
 *   autoConnect: true,
 *   onAccountsChanged: (accounts) => console.log('Accounts changed', accounts),
 *   onChainChanged: (chainId) => console.log('Chain changed', chainId)
 * });
 * 
 * // 连接钱包
 * await actions.connect();
 * 
 * // 断开连接
 * actions.disconnect();
 * ```
 */
export function useWallet(options?: {
  /** 是否自动连接 */
  autoConnect?: boolean;
  /** 账户变化回调 */
  onAccountsChanged?: (accounts: string[]) => void;
  /** 链变化回调 */
  onChainChanged?: (chainId: number) => void;
  /** 连接错误回调 */
  onError?: (error: Error) => void;
}): {
  wallet: WalletState;
  actions: WalletActions;
} {
  const [wallet, updateWallet] = useImmer<WalletState>({
    connected: false,
    address: null,
    chainId: null,
    balance: null,
    error: null,
    connecting: false,
  });

  /**
   * 获取以太坊 provider（MetaMask 等）
   */
  const getEthereumProvider = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      return (window as any).ethereum;
    }
    return null;
  }, []);

  /**
   * 获取账户余额
   */
  const fetchBalance = useCallback(async (address: string): Promise<string> => {
    const provider = getEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found');
    }

    try {
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      return balance;
    } catch (error) {
      throw new Error(`Failed to fetch balance: ${error}`);
    }
  }, [getEthereumProvider]);

  /**
   * 连接钱包
   */
  const connect = useCallback(async () => {
    const provider = getEthereumProvider();
    if (!provider) {
      updateWallet((draft) => {
        draft.error = '请安装 MetaMask 或其他 Web3 钱包';
        draft.connecting = false;
      });
      return;
    }

    updateWallet((draft) => {
      draft.connecting = true;
      draft.error = null;
    });

    try {
      // 请求账户访问权限
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        const chainId = await provider.request({
          method: 'eth_chainId',
        });

        // 获取余额
        let balance: string | null = null;
        try {
          balance = await fetchBalance(address);
        } catch (error) {
          console.warn('Failed to fetch balance:', error);
        }

        updateWallet((draft) => {
          draft.connected = true;
          draft.address = address;
          draft.chainId = parseInt(chainId as string, 16);
          draft.balance = balance;
          draft.connecting = false;
          draft.error = null;
        });
      }
    } catch (error: any) {
      updateWallet((draft) => {
        draft.error = error?.message || '连接钱包失败';
        draft.connecting = false;
        draft.connected = false;
      });
      options?.onError?.(error);
    }
  }, [getEthereumProvider, fetchBalance, updateWallet, options]);

  /**
   * 断开连接
   */
  const disconnect = useCallback(() => {
    updateWallet((draft) => {
      draft.connected = false;
      draft.address = null;
      draft.chainId = null;
      draft.balance = null;
      draft.error = null;
    });
  }, [updateWallet]);

  /**
   * 刷新余额
   */
  const refreshBalance = useCallback(async () => {
    if (!wallet.address) {
      return;
    }

    try {
      const balance = await fetchBalance(wallet.address);
      updateWallet((draft) => {
        draft.balance = balance;
      });
    } catch (error) {
      console.warn('Failed to refresh balance:', error);
    }
  }, [wallet.address, fetchBalance, updateWallet]);

  /**
   * 切换网络
   */
  const switchChain = useCallback(async (chainId: number) => {
    const provider = getEthereumProvider();
    if (!provider) {
      throw new Error('Ethereum provider not found');
    }

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });

      updateWallet((draft) => {
        draft.chainId = chainId;
      });

      options?.onChainChanged?.(chainId);
    } catch (error: any) {
      // 如果链不存在，可能需要添加链
      if (error.code === 4902) {
        throw new Error('请先添加该网络到钱包');
      }
      throw error;
    }
  }, [getEthereumProvider, updateWallet, options]);

  /**
   * 监听账户变化
   */
  useEffect(() => {
    const provider = getEthereumProvider();
    if (!provider) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        updateWallet((draft) => {
          draft.address = accounts[0];
        });
        refreshBalance();
      }
      options?.onAccountsChanged?.(accounts);
    };

    const handleChainChanged = (chainId: string) => {
      const chainIdNumber = parseInt(chainId, 16);
      updateWallet((draft) => {
        draft.chainId = chainIdNumber;
      });
      refreshBalance();
      options?.onChainChanged?.(chainIdNumber);
    };

    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('chainChanged', handleChainChanged);

    return () => {
      provider.removeListener('accountsChanged', handleAccountsChanged);
      provider.removeListener('chainChanged', handleChainChanged);
    };
  }, [getEthereumProvider, disconnect, refreshBalance, updateWallet, options]);

  /**
   * 自动连接
   */
  useEffect(() => {
    if (options?.autoConnect && !wallet.connected && !wallet.connecting) {
      const provider = getEthereumProvider();
      if (provider) {
        // 检查是否已经授权
        provider
          .request({ method: 'eth_accounts' })
          .then((accounts: string[]) => {
            if (accounts && accounts.length > 0) {
              connect();
            }
          })
          .catch(() => {
            // 忽略错误
          });
      }
    }
  }, [options?.autoConnect, wallet.connected, wallet.connecting, getEthereumProvider, connect]);

  return {
    wallet,
    actions: {
      connect,
      disconnect,
      refreshBalance,
      switchChain,
    },
  };
}

