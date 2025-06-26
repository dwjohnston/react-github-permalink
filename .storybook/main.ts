import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding", 
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
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
