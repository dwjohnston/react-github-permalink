import { Meta, StoryObj } from '@storybook/react';
import { StackOverflowLinkBase } from './StackOverflowLinkBase';

const meta: Meta<typeof StackOverflowLinkBase> = {
  title: 'Example/StackOverflowLinkBase',
  component: StackOverflowLinkBase,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['block', 'inline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockSuccessData = {
  questionTitle: 'How to create a React component?',
  questionId: '123456',
  isAnswered: true,
  answerCount: 12,
  score: 45,
  viewCount: 1250,
  tags: ['reactjs', 'javascript', 'components'],
  creationDate: 1640995200,
  status: 'ok' as const,
};

const mockErrorData = {
  status: '404' as const,
};

export const Default: Story = {
  args: {
    stackoverflowLink: 'https://stackoverflow.com/questions/123456/how-to-create-react-component',
    data: mockSuccessData,
    variant: 'block',
  },
};

export const WithTags: Story = {
  args: {
    stackoverflowLink: 'https://stackoverflow.com/questions/123456/how-to-create-react-component',
    data: mockSuccessData,
    variant: 'block',
    showTags: true
  },
};


export const Inline: Story = {
  args: {
    stackoverflowLink: 'https://stackoverflow.com/questions/123456/how-to-create-react-component',
    data: mockSuccessData,
    variant: 'inline',
  },
};

export const InlineError: Story = {
  args: {
    stackoverflowLink: 'https://stackoverflow.com/questions/123456/how-to-create-react-component',
    data: mockErrorData,
    variant: 'inline',
  },
};


export const NotFound: Story = {
  args: {
    stackoverflowLink: 'https://stackoverflow.com/questions/999999/non-existent-question',
    data: mockErrorData,
    variant: 'block',
  },
};

export const Unanswered: Story = {
  args: {
    stackoverflowLink: 'https://stackoverflow.com/questions/789012/unanswered-question',
    data: {
      ...mockSuccessData,
      questionTitle: 'How to solve this complex problem?',
      questionId: '789012',
      isAnswered: false,
      answerCount: 0,
      score: 2,
      viewCount: 34,
      tags: ['algorithm', 'optimization'],
    },
    variant: 'block',
  },
};