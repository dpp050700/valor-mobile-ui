import type { StoryObj } from '@storybook/react';
import React from 'react';

import {Scroll} from '../components/Scroll';

const meta = {
  title: 'Components/Scroll',
  component: Scroll,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
}

export default meta;
type Story = StoryObj<typeof Scroll>;

const template = () => {
  return <div style={{width: '200px', height: '400px', border: '1px solid black'}}>
    <Scroll onScroll={() => {console.log(1112)}}>
      <div>
        {new Array(20).fill(1).map((item, index) => <div key={index} style={{height: '40px'}}>{index}</div>)}
      </div>
    </Scroll>
  </div>
}

export const Primary: Story = {
  render: template,

  args: {
    children: '11',
  },
};