import type { Meta, StoryObj } from "@storybook/react";

import { GithubPRLinkBase } from "./GithubPRLinkBase";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof GithubPRLinkBase> = {
  component: GithubPRLinkBase,
};

export default meta;

type Story = StoryObj<typeof GithubPRLinkBase>;

const sampleData = {
  prTitle: "Add concurrent features to React",
  prNumber: "24652",
  prState: "closed" as const,
  owner: "facebook",
  repo: "react",
  status: "ok" as const,
  isDraft: false,
  merged: true,
  mergeable: null,
  reactions: {
    "+1": 42,
    "-1": 0,
    confused: 0,
    eyes: 2,
    heart: 8,
    hooray: 15,
    laugh: 0,
    rocket: 5,
    total_count: 72
  }
};

const draftData = {
  ...sampleData,
  prTitle: "WIP: New feature implementation",
  prNumber: "12345",
  prState: "open" as const,
  isDraft: true,
  merged: false,
};

const openData = {
  ...sampleData,
  prTitle: "Fix bug in component rendering",
  prNumber: "54321",
  prState: "open" as const,
  isDraft: false,
  merged: false,
};

export const Primary: Story = {
  render: () => (
    <GithubPRLinkBase
      prLink="https://github.com/facebook/react/pull/24652"
      data={sampleData}
    />
  ),
};

export const Draft: Story = {
  render: () => (
    <GithubPRLinkBase
      prLink="https://github.com/facebook/react/pull/12345"
      data={draftData}
    />
  ),
};

export const Open: Story = {
  render: () => (
    <GithubPRLinkBase
      prLink="https://github.com/facebook/react/pull/54321"
      data={openData}
    />
  ),
};

export const Inline: Story = {
  render: () => (
    <div>
      <p>Here's an inline PR link: <GithubPRLinkBase
        prLink="https://github.com/facebook/react/pull/24652"
        data={sampleData}
        variant="inline"
      /></p>
    </div>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <div style={{ backgroundColor: "pink", padding: "1em" }}>
      <GithubPRLinkBase
        prLink="https://github.com/facebook/react/pull/24652"
        data={sampleData}
      />
    </div>
  ),
};