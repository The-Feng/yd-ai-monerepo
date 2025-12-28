import React, { useEffect } from 'react';
import './Modal.css';

export interface ModalProps {
  /**
   * 是否显示
   */
  visible: boolean;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * 是否显示关闭按钮
   */
  closable?: boolean;
  /**
   * 点击遮罩层是否关闭
   */
  maskClosable?: boolean;
  /**
   * 关闭回调
   */
  onClose?: () => void;
  /**
   * 确认回调
   */
  onOk?: () => void;
  /**
   * 取消按钮文本
   */
  cancelText?: string;
  /**
   * 确认按钮文本
   */
  okText?: string;
  /**
   * 是否显示底部按钮
   */
  footer?: React.ReactNode | null;
  /**
   * 宽度
   */
  width?: number | string;
}

/**
 * Modal 对话框组件
 */
export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  closable = true,
  maskClosable = true,
  onClose,
  onOk,
  cancelText = '取消',
  okText = '确定',
  footer,
  width = 520,
}) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  const handleMaskClick = (e: React.MouseEvent) => {
    if (maskClosable && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const defaultFooter = footer === undefined && (
    <div className="yd-modal-footer">
      <button className="yd-modal-btn yd-modal-btn-cancel" onClick={onClose}>
        {cancelText}
      </button>
      <button className="yd-modal-btn yd-modal-btn-ok" onClick={onOk}>
        {okText}
      </button>
    </div>
  );

  return (
    <div className="yd-modal-mask" onClick={handleMaskClick}>
      <div className="yd-modal-wrap">
        <div className="yd-modal" style={{ width }}>
          {closable && (
            <button className="yd-modal-close" onClick={onClose}>
              ×
            </button>
          )}
          {title && <div className="yd-modal-header">{title}</div>}
          <div className="yd-modal-body">{children}</div>
          {footer !== null && (footer || defaultFooter)}
        </div>
      </div>
    </div>
  );
};

