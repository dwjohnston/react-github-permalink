import type { Meta, StoryObj } from "@storybook/react";
import { CaniuseLinkBase } from "./CaniuseLinkBase";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof CaniuseLinkBase> = {
    component: CaniuseLinkBase,
};

export default meta;

type Story = StoryObj<typeof CaniuseLinkBase>;

const mockFlexboxData = {
    title: "CSS Flexible Box Layout Module",
    description: "Method of positioning elements in horizontal or vertical stacks. Support includes all properties prefixed with `flex`, as well as `display: flex`, `display: inline-flex`, `align-content`, `align-items`, `align-self`, `justify-content` and `order`.",
    stats: {
        chrome: {
            "89": "y",
            "90": "y",
            "91": "y",
            "92": "y",
            "93": "y"
        },
        firefox: {
            "84": "y",
            "85": "y",
            "86": "y",
            "87": "y",
            "88": "y"
        },
        safari: {
            "14.0": "y",
            "14.1": "y",
            "15.0": "y",
            "15.1": "y",
            "15.2": "y"
        },
        edge: {
            "89": "y",
            "90": "y",
            "91": "y",
            "92": "y",
            "93": "y"
        },
        ie: {
            "8": "n",
            "9": "n",
            "10": "a x",
            "11": "a"
        }
    },
    status: "ok" as const
};

export const BlockSuccess: Story = {
    render: () => (
        <CaniuseLinkBase
            feature="flexbox"
            data={mockFlexboxData}
        />
    ),
};

export const BlockError: Story = {
    render: () => (
        <CaniuseLinkBase
            feature="non-existent-feature"
            data={{
                status: "404"
            }}
        />
    ),
};

export const InlineSuccess: Story = {
    render: () => (
        <p>
            This example uses {" "}
            <CaniuseLinkBase
                feature="flexbox"
                variant="inline"
                data={mockFlexboxData}
            />
            {" "} for layout.
        </p>
    ),
};

export const InlineError: Story = {
    render: () => (
        <p>
            This example uses {" "}
            <CaniuseLinkBase
                feature="non-existent-feature"
                variant="inline"
                data={{
                    status: "404"
                }}
            />
            {" "} for layout.
        </p>
    ),
};