import { useState, useCallback } from 'react';
import { produce, Draft } from 'immer';

/**
 * useImmer hook - 使用 Immer 进行不可变状态更新
 * 
 * @template T - 状态类型
 * @param initialValue - 初始状态值或返回初始状态的函数
 * @returns 返回 [state, updateState] 元组
 * 
 * @example
 * ```tsx
 * const [state, updateState] = useImmer({ count: 0, name: 'test' });
 * 
 * // 使用函数更新
 * updateState(draft => {
 *   draft.count += 1;
 *   draft.name = 'updated';
 * });
 * 
 * // 使用新值替换
 * updateState({ count: 10, name: 'new' });
 * ```
 */
export function useImmer<T>(
  initialValue: T | (() => T)
): [T, (updater: T | ((draft: Draft<T>) => void)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const updateState = useCallback(
    (updater: T | ((draft: Draft<T>) => void)) => {
      if (typeof updater === 'function') {
        setState((currentState) =>
          produce(currentState, updater as (draft: Draft<T>) => void)
        );
      } else {
        setState(updater);
      }
    },
    []
  );

  return [state, updateState];
}

