import type { Meta, StoryObj  } from '@storybook/react';

import { GithubIssueLink,} from './GithubIssueLink';
import { GithubPermalinkContext, GithubPermalinkProvider} from "../config/GithubPermalinkContext";
import "../GithubPermalink/github-permalink.css"

const meta: Meta<typeof GithubIssueLink> = {
  component: GithubIssueLink,
};

export default meta;

type Story = StoryObj<typeof GithubIssueLink>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <GithubIssueLink issueLink='https://github.com/dwjohnston/react-github-permalink/issues/2' />,
};

export const WithBackground: Story = {
  render: () => <div style={{backgroundColor: "pink", padding: "1em"}}><GithubIssueLink issueLink='https://github.com/dwjohnston/react-github-permalink/issues/2' /></div>,
};



export const WithToken: Story = {
  render: () => <GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}> <GithubIssueLink issueLink='https://github.com/dwjohnston/react-github-permalink/issues/2' /></GithubPermalinkProvider>,

}
