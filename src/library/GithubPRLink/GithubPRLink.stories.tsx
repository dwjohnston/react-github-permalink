import type { Meta, StoryObj } from "@storybook/react";

import { GithubPRLink } from "./GithubPRLink";
import {
  GithubPermalinkContext,
  GithubPermalinkProvider,
} from "../config/GithubPermalinkContext";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof GithubPRLink> = {
  component: GithubPRLink,
};

export default meta;

type Story = StoryObj<typeof GithubPRLink>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <GithubPRLink prLink="https://github.com/facebook/react/pull/24652" />
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div style={{ backgroundColor: "pink", padding: "1em" }}>
      <GithubPRLink prLink="https://github.com/facebook/react/pull/24652" />
    </div>
  ),
};

export const WithToken: Story = {
  render: () => (
    <GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}>
      <GithubPRLink prLink="https://github.com/facebook/react/pull/24652" />
    </GithubPermalinkProvider>
  ),
};