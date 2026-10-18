import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      // Open on the Alert component.
      storySort: { order: ['Components', ['Alert']] },
    },
  },
};

export default preview;
