import { Meta, StoryObj } from '@storybook/react';

import { GithubPermalinkRsc } from './GithubPermalinkRsc';
import { githubPermalinkRscConfig } from '../export';
import { defaultGetPermalinkFn } from '../config/defaultFunctions';

const meta = {
    component: GithubPermalinkRsc,

} satisfies Meta<typeof GithubPermalinkRsc>;

export default meta;


type Story = StoryObj<typeof meta>;


export const Basic: Story = {
    args: {
        permalink: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
    }
}

export const LineExclusions: Story = {
    args: {
        permalink: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5",
        excludeLines: [[2,4]]
    }
}
export const Erroring: Story = {
    loaders: () => {
        githubPermalinkRscConfig.setConfig({
            getDataFn: async () => {
                return {
                    status: "other-error"
                }
            }
        })
    },
    args: {
        permalink: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
    }
}

/** The purpose of this story is to demonstrate the behaviour of storybook, as it relates to the loaders function and our configuring of the Rsc global config */
export const Basic2: Story = {

    loaders: () => {
        githubPermalinkRscConfig.setConfig({
            getDataFn: defaultGetPermalinkFn
        })
    },
    args: {
        permalink: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
    }
}