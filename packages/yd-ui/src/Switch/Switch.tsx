import React from 'react';
import './Switch.css';

export interface SwitchProps {
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 默认是否选中
   */
  defaultChecked?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 变化回调
   */
  onChange?: (checked: boolean) => void;
  /**
   * 选中时的内容
   */
  checkedChildren?: React.ReactNode;
  /**
   * 未选中时的内容
   */
  unCheckedChildren?: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * Switch 开关组件
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  checkedChildren,
  unCheckedChildren,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = React.useState(
    checked !== undefined ? checked : defaultChecked
  );

  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (disabled) return;

    const newChecked = !currentChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  const classNames = [
    'yd-switch',
    currentChecked && 'yd-switch-checked',
    disabled && 'yd-switch-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      className={classNames}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className="yd-switch-inner">
        {currentChecked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  );
};

