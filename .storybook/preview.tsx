import type { Preview } from "@storybook/react";
import './global.css';
import { GithubPermalinkProvider } from "../src/library/config/GithubPermalinkContext";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(Story) => (
    <div style={{ margin: '3em' }} >
      <GithubPermalinkProvider githubToken={process.env.STORYBOOK_GITHUB_TOKEN}>
        <Story />
      </GithubPermalinkProvider>
    </div>)]
};

export default preview;
