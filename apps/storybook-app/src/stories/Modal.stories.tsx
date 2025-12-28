import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, Button } from '@yd-ui/core';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>打开对话框</Button>
        <Modal
          visible={visible}
          title="基本对话框"
          onClose={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这是对话框的内容</p>
        </Modal>
      </>
    );
  },
};

export const WithoutFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>打开对话框</Button>
        <Modal
          visible={visible}
          title="无底部按钮"
          footer={null}
          onClose={() => setVisible(false)}
        >
          <p>这个对话框没有底部按钮</p>
        </Modal>
      </>
    );
  },
};

export const CustomFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>打开对话框</Button>
        <Modal
          visible={visible}
          title="自定义底部"
          footer={<Button onClick={() => setVisible(false)}>自定义按钮</Button>}
          onClose={() => setVisible(false)}
        >
          <p>这个对话框有自定义的底部按钮</p>
        </Modal>
      </>
    );
  },
};

export const CustomWidth: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>打开对话框</Button>
        <Modal
          visible={visible}
          title="自定义宽度"
          width={800}
          onClose={() => setVisible(false)}
          onOk={() => setVisible(false)}
        >
          <p>这个对话框的宽度是 800px</p>
        </Modal>
      </>
    );
  },
};

