import React from 'react';
import './Tag.css';

export interface TagProps {
  /**
   * 标签颜色
   */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /**
   * 是否可关闭
   */
  closable?: boolean;
  /**
   * 关闭回调
   */
  onClose?: (e: React.MouseEvent) => void;
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
 * Tag 标签组件
 */
export const Tag: React.FC<TagProps> = ({
  color = 'default',
  closable = false,
  onClose,
  children,
  className = '',
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.(e);
  };

  const classNames = [
    'yd-tag',
    `yd-tag-${color}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {children}
      {closable && (
        <span className="yd-tag-close" onClick={handleClose}>
          ×
        </span>
      )}
    </span>
  );
};

