import type { Meta, StoryObj } from "@storybook/react";

import { GithubIssueLinkBase } from "./GithubIssueLinkBase";
import {
    GithubPermalinkProvider,
} from "../config/GithubPermalinkContext";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof GithubIssueLinkBase> = {
    component: GithubIssueLinkBase,
};

export default meta;

type Story = StoryObj<typeof GithubIssueLinkBase>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const BlockSuccess: Story = {
    render: () => (
        <GithubIssueLinkBase
            issueLink="https://github.com/dwjohnston/react-github-permalink/issues/2"
            data={{
                "issueNumber": "123",
                "issueState": "open",
                "issueTitle": "Issue title",
                "owner": "owner-name",
                "repo": "repo-name",
                "status": "ok"
            }} />
    ),
};

export const BlockError: Story = {
    render: () => (
        <GithubIssueLinkBase
            issueLink="https://github.com/dwjohnston/react-github-permalink/issues/2"
            data={{

                "status": "404"
            }} />
    ),
};


export const InlineSuccess: Story = {
    render: () => (<p> Blah blah for more details see this issue:
        <GithubIssueLinkBase
            issueLink="https://github.com/dwjohnston/react-github-permalink/issues/2"
            variant="inline"
            data={{
                "issueNumber": "123",
                "issueState": "open",
                "issueTitle": "Issue title",
                "owner": "owner-name",
                "repo": "repo-name",
                "status": "ok"
            }} /></p>
    ),
};

export const InlineError: Story = {
    render: () => (<p> Blah blah blah, for more details see this issue
        <GithubIssueLinkBase
            variant="inline"
            issueLink="https://github.com/dwjohnston/react-github-permalink/issues/2"
            data={{

                "status": "404"
            }} /></p>
    ),
};
