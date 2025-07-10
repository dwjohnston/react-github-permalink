import type { Meta, StoryObj } from "@storybook/react";

import { GithubRepositoryLinkBase } from "./GithubRepositoryLinkBase";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof GithubRepositoryLinkBase> = {
  component: GithubRepositoryLinkBase,
};

export default meta;

type Story = StoryObj<typeof GithubRepositoryLinkBase>;

export const Primary: Story = {
  render: () => (
    <GithubRepositoryLinkBase 
      repositoryLink="https://github.com/dwjohnston/react-github-permalink"
      data={{
        owner: "dwjohnston",
        repo: "react-github-permalink",
        name: "react-github-permalink",
        fullName: "dwjohnston/react-github-permalink",
        description: "Display Github permalinks as codeblocks. Display Github issue links.",
        stargazersCount: 25,
        forksCount: 3,
        htmlUrl: "https://github.com/dwjohnston/react-github-permalink",
        status: "ok"
      }}
    />
  ),
};

export const Inline: Story = {
  render: () => (
    <div>
      <p>Check out this repository: <GithubRepositoryLinkBase 
        repositoryLink="https://github.com/dwjohnston/react-github-permalink"
        variant="inline"
        data={{
          owner: "dwjohnston",
          repo: "react-github-permalink",
          name: "react-github-permalink",
          fullName: "dwjohnston/react-github-permalink",
          description: "Display Github permalinks as codeblocks. Display Github issue links.",
          stargazersCount: 25,
          forksCount: 3,
          htmlUrl: "https://github.com/dwjohnston/react-github-permalink",
          status: "ok"
        }}
      /> for more details.</p>
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <GithubRepositoryLinkBase 
      repositoryLink="https://github.com/dwjohnston/react-github-permalink"
      showDescription={false}
      data={{
        owner: "dwjohnston",
        repo: "react-github-permalink",
        name: "react-github-permalink",
        fullName: "dwjohnston/react-github-permalink",
        description: "Display Github permalinks as codeblocks. Display Github issue links.",
        stargazersCount: 25,
        forksCount: 3,
        htmlUrl: "https://github.com/dwjohnston/react-github-permalink",
        status: "ok"
      }}
    />
  ),
};

export const WithoutCounts: Story = {
  render: () => (
    <GithubRepositoryLinkBase 
      repositoryLink="https://github.com/dwjohnston/react-github-permalink"
      showCounts={false}
      data={{
        owner: "dwjohnston",
        repo: "react-github-permalink",
        name: "react-github-permalink",
        fullName: "dwjohnston/react-github-permalink",
        description: "Display Github permalinks as codeblocks. Display Github issue links.",
        stargazersCount: 25,
        forksCount: 3,
        htmlUrl: "https://github.com/dwjohnston/react-github-permalink",
        status: "ok"
      }}
    />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <GithubRepositoryLinkBase 
      repositoryLink="https://github.com/nonexistent/repo"
      data={{
        status: "404"
      }}
    />
  ),
};

export const NoDescription: Story = {
  render: () => (
    <GithubRepositoryLinkBase 
      repositoryLink="https://github.com/dwjohnston/react-github-permalink"
      data={{
        owner: "dwjohnston",
        repo: "react-github-permalink",
        name: "react-github-permalink",
        fullName: "dwjohnston/react-github-permalink",
        description: null,
        stargazersCount: 25,
        forksCount: 3,
        htmlUrl: "https://github.com/dwjohnston/react-github-permalink",
        status: "ok"
      }}
    />
  ),
};