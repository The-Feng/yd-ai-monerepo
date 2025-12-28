import type { Preview } from '@storybook/react';
import React from 'react';

// 导入组件库的样式
import '../../../packages/yd-ui/dist/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

