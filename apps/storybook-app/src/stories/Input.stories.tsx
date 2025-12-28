import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from '@yd-ui/core';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '请输入内容',
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: '请输入内容',
    prefix: <span>🔍</span>,
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: '请输入内容',
    suffix: <span>✓</span>,
  },
};

export const Error: Story = {
  args: {
    placeholder: '请输入内容',
    error: true,
    defaultValue: '错误状态',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '禁用状态',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small Input',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large Input',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="受控输入框"
      />
    );
  },
};

