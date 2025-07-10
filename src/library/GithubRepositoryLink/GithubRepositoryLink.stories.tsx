import type { Meta, StoryObj } from "@storybook/react";

import { GithubRepositoryLink } from "./GithubRepositoryLink";
import { GithubPermalinkProvider } from "../config/GithubPermalinkContext";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof GithubRepositoryLink> = {
  component: GithubRepositoryLink,
};

export default meta;

type Story = StoryObj<typeof GithubRepositoryLink>;

export const Primary: Story = {
  render: () => (
    <GithubRepositoryLink repositoryLink="https://github.com/dwjohnston/react-github-permalink" />
  ),
};

export const Inline: Story = {
  render: () => (
    <div>
      <p>Check out this repository: <GithubRepositoryLink 
        repositoryLink="https://github.com/dwjohnston/react-github-permalink"
        variant="inline"
      /> for more details.</p>
    </div>
  ),
};

export const WithToken: Story = {
  render: () => (
    <GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}>
      <GithubRepositoryLink repositoryLink="https://github.com/dwjohnston/react-github-permalink" />
    </GithubPermalinkProvider>
  ),
};

export const CustomDataFn: Story = {
  render: () => (
    <GithubPermalinkProvider
      getRepositoryFn={(repositoryLink) => {
        return Promise.resolve({
          owner: "example",
          repo: "test-repo",
          name: "test-repo",
          fullName: "example/test-repo",
          description: "A test repository with custom data",
          stargazersCount: 100,
          forksCount: 25,
          htmlUrl: "https://github.com/example/test-repo",
          status: "ok"
        });
      }}
    >
      <GithubRepositoryLink repositoryLink="https://github.com/example/test-repo" />
    </GithubPermalinkProvider>
  ),
};

export const ErrorReporting: Story = {
  render: () => (
    <GithubPermalinkProvider onError={(err) => console.error(err)}>
      <GithubRepositoryLink repositoryLink="https://github.com/nonexistent/repo" />
    </GithubPermalinkProvider>
  ),
};