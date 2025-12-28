import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  /**
   * 输入框大小
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否有错误状态
   */
  error?: boolean;
  /**
   * 前缀图标
   */
  prefix?: React.ReactNode;
  /**
   * 后缀图标
   */
  suffix?: React.ReactNode;
}

/**
 * Input 输入框组件
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      disabled = false,
      error = false,
      prefix,
      suffix,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classNames = [
      'yd-input',
      `yd-input-${size}`,
      disabled && 'yd-input-disabled',
      error && 'yd-input-error',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="yd-input-wrapper">
        {prefix && <span className="yd-input-prefix">{prefix}</span>}
        <input
          ref={ref}
          className={classNames}
          disabled={disabled}
          {...restProps}
        />
        {suffix && <span className="yd-input-suffix">{suffix}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

