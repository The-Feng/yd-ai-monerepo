import React from 'react';
import './Button.css';

export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /**
   * 按钮大小
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 点击事件
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * 子元素
   */
  children?: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * Button 按钮组件
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      return;
    }
    onClick?.(e);
  };

  const classNames = [
    'yd-button',
    `yd-button-${type}`,
    `yd-button-${size}`,
    disabled && 'yd-button-disabled',
    loading && 'yd-button-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <span className="yd-button-loading-icon">⏳</span>}
      {children}
    </button>
  );
};

