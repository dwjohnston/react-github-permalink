import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/nextjs",
  "staticDirs": [
    "../public"
  ],
  features: {
    experimentalRSC: true,
  },
  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;
