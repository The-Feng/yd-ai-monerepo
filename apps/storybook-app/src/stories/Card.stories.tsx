import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from '@yd-ui/core';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: '这是卡片内容',
  },
};

export const WithTitle: Story = {
  args: {
    title: '卡片标题',
    children: '这是卡片内容',
  },
};

export const WithExtra: Story = {
  args: {
    title: '卡片标题',
    extra: <a href="#">更多</a>,
    children: '这是卡片内容',
  },
};

export const Hoverable: Story = {
  args: {
    title: '可悬浮卡片',
    hoverable: true,
    children: '鼠标悬浮查看效果',
  },
};

export const NoBorder: Story = {
  args: {
    title: '无边框卡片',
    bordered: false,
    children: '这是无边框的卡片内容',
  },
};

