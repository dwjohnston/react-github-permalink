import type { Meta, StoryObj  } from '@storybook/react';

import { GithubPermalink,} from './GithubPermalink';
import { GithubPermalinkContext, GithubPermalinkProvider} from "../GithubPermalinkContext";
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

export const WithBackground: Story = {
  render: () => <div style={{backgroundColor:"pink", padding: "1em"}}><GithubPermalink permalink='https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' /></div>,
};

export const CustomDataFn: Story = {
  render: () => <GithubPermalinkProvider getDataFn={(permalink) => {
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
    }}
  >
    <GithubPermalink permalink='https://github.com/djohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' />
   </GithubPermalinkProvider>
  ,
};

export const ErrorReporting: Story = {
  render: () => <GithubPermalinkProvider onError={(err) => console.error(err)}
  >
    <GithubPermalink permalink='https://github.com/djohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' />
   </GithubPermalinkProvider>
  ,
};



export const WithToken: Story = {
  render: () => <GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}> <GithubPermalink permalink='https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5' /></GithubPermalinkProvider>,

}


export const LongPath: Story = {
  render: () => <div style={{width: 410, color: "solid 1px red"}}><GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}> <GithubPermalink permalink='https://github.com/dwjohnston/blacksheepcode/blob/24c6f3ef9d09f9e061226e19e78a4c8d1ee03710/app/routes/posts/adding_msw_bundler_to_remix_app_2.mdx#L1-L11' /></GithubPermalinkProvider></div>,

}