import { useEffect, useCallback } from 'react';
import { useImmer } from './useImmer';

/**
 * 余额状态接口
 */
export interface BalanceState {
  /** 余额（wei，字符串格式） */
  balance: string | null;
  /** 格式化的余额（ETH） */
  formattedBalance: string | null;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
}

/**
 * useWalletBalance hook - 管理钱包余额
 * 
 * @param address 钱包地址
 * @param options 配置选项
 * @returns 返回余额状态和刷新函数
 * 
 * @example
 * ```tsx
 * const { balance, refreshBalance } = useWalletBalance('0x1234...', {
 *   autoRefresh: true,
 *   refreshInterval: 5000
 * });
 * 
 * // 手动刷新
 * await refreshBalance();
 * ```
 */
export function useWalletBalance(
  address: string | null,
  options?: {
    /** 是否自动刷新 */
    autoRefresh?: boolean;
    /** 刷新间隔（毫秒） */
    refreshInterval?: number;
    /** 刷新回调 */
    onBalanceChanged?: (balance: string) => void;
  }
): {
  balance: BalanceState;
  refreshBalance: () => Promise<void>;
} {
  const [balance, updateBalance] = useImmer<BalanceState>({
    balance: null,
    formattedBalance: null,
    loading: false,
    error: null,
  });

  /**
   * 获取以太坊 provider
   */
  const getEthereumProvider = () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      return (window as any).ethereum;
    }
    return null;
  };

  /**
   * 将 wei 转换为 ETH
   */
  const weiToEth = (wei: string): string => {
    const weiBigInt = BigInt(wei);
    const ethBigInt = BigInt(10 ** 18);
    const eth = Number(weiBigInt) / Number(ethBigInt);
    return eth.toFixed(4);
  };

  /**
   * 获取余额
   */
  const fetchBalance = useCallback(async (): Promise<void> => {
    if (!address) {
      updateBalance((draft) => {
        draft.balance = null;
        draft.formattedBalance = null;
        draft.loading = false;
      });
      return;
    }

    const provider = getEthereumProvider();
    if (!provider) {
      updateBalance((draft) => {
        draft.error = 'Ethereum provider not found';
        draft.loading = false;
      });
      return;
    }

    updateBalance((draft) => {
      draft.loading = true;
      draft.error = null;
    });

    try {
      const balanceWei = await provider.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      const formatted = weiToEth(balanceWei as string);

      updateBalance((draft) => {
        draft.balance = balanceWei as string;
        draft.formattedBalance = formatted;
        draft.loading = false;
      });

      options?.onBalanceChanged?.(balanceWei as string);
    } catch (error: any) {
      updateBalance((draft) => {
        draft.error = error?.message || '获取余额失败';
        draft.loading = false;
      });
    }
  }, [address, options?.onBalanceChanged]);

  /**
   * 刷新余额
   */
  const refreshBalance = useCallback(async () => {
    await fetchBalance();
  }, [fetchBalance]);

  /**
   * 初始加载和自动刷新
   */
  useEffect(() => {
    if (!address) return;

    fetchBalance();

    if (options?.autoRefresh && options?.refreshInterval) {
      const interval = setInterval(() => {
        fetchBalance();
      }, options.refreshInterval);

      return () => clearInterval(interval);
    }
  }, [address, options?.autoRefresh, options?.refreshInterval]);

  /**
   * 监听账户变化
   */
  useEffect(() => {
    const provider = getEthereumProvider();
    if (!provider) return;

    const handleAccountsChanged = () => {
      fetchBalance();
    };

    provider.on('accountsChanged', handleAccountsChanged);

    return () => {
      provider.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [address, fetchBalance]);

  return {
    balance,
    refreshBalance,
  };
}

