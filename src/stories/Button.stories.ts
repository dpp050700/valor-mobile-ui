import type { StoryObj } from '@storybook/react';

import {Button} from '../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
}

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: '11'
  },
};