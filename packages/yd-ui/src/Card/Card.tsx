import React from 'react';
import './Card.css';

export interface CardProps {
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  /**
   * 卡片操作区域
   */
  extra?: React.ReactNode;
  /**
   * 是否显示边框
   */
  bordered?: boolean;
  /**
   * 是否可悬浮
   */
  hoverable?: boolean;
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
 * Card 卡片组件
 */
export const Card: React.FC<CardProps> = ({
  title,
  extra,
  bordered = true,
  hoverable = false,
  children,
  className = '',
}) => {
  const classNames = [
    'yd-card',
    bordered && 'yd-card-bordered',
    hoverable && 'yd-card-hoverable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {(title || extra) && (
        <div className="yd-card-head">
          {title && <div className="yd-card-title">{title}</div>}
          {extra && <div className="yd-card-extra">{extra}</div>}
        </div>
      )}
      {children && <div className="yd-card-body">{children}</div>}
    </div>
  );
};

