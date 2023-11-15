import type { Meta, StoryObj  } from '@storybook/react';

import { GithubPermalink, GithubPermalinkContext, GithubPermalinkProvider} from './GithubPermalink';
import "./github-permalink.css"

const meta: Meta<typeof GithubPermalink> = {
  component: GithubPermalink,
};

export default meta;

type Story = StoryObj<typeof GithubPermalink>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <GithubPermalink permalink='https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' />,
};

export const CustomDataFn: Story = {
  render: () => <GithubPermalinkContext.Provider value={{
    getDataFn:(permalink) => {
      return Promise.resolve({
        lines: [
          "a",
          "b"
        ], 
        lineFrom: 1, 
        lineTo: 2, 
        commit: "123", 
        path: "something",
        owner: "fooby", 
        repo: "repo", 
        commitUrl: "https://example.com", 
        status: "ok"

      })
    }
  }}>
    <GithubPermalink permalink='https://github.com/djohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' />
   </GithubPermalinkContext.Provider>
  ,
};


export const WithToken: Story = {
  render: () => <GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}> <GithubPermalink permalink='https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' /></GithubPermalinkProvider>,

}
