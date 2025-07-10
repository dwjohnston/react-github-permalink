import type { Meta, StoryObj } from "@storybook/react";
import { CaniuseLink } from "./CaniuseLink";
import {
    GithubPermalinkProvider,
} from "../config/GithubPermalinkContext";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof CaniuseLink> = {
    component: CaniuseLink,
};

export default meta;

type Story = StoryObj<typeof CaniuseLink>;

export const BlockSuccess: Story = {
    render: () => (
        <GithubPermalinkProvider>
            <CaniuseLink feature="flexbox" />
        </GithubPermalinkProvider>
    ),
};

export const InlineSuccess: Story = {
    render: () => (
        <GithubPermalinkProvider>
            <p>
                This example uses{" "}
                <CaniuseLink feature="flexbox" variant="inline" />
                {" "}for layout.
            </p>
        </GithubPermalinkProvider>
    ),
};

export const BlockError: Story = {
    render: () => (
        <GithubPermalinkProvider>
            <CaniuseLink feature="non-existent-feature" />
        </GithubPermalinkProvider>
    ),
};