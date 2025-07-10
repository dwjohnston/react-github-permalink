"use client"
import { PropsWithChildren, createContext } from "react";
import { BaseConfiguration } from "./BaseConfiguration";
import { defaultGetIssueFn } from "./defaultFunctions";
import { defaultGetPermalinkFn } from "./defaultFunctions";
import { defaultGetRepositoryFn } from "./defaultFunctions";

// Thanks ChatGPT
export type GithubPermalinkUrlInfo = {
    owner: string;
    repo: string;
    commit: string;
    path: string;
    lineFrom: number;
    lineTo: number;
};

export type ErrorResponses = {
    status: "rate-limit"
} | {
    status: "404"
} | {
    status: "other-error"
} | 
{
    status: "unauthorized"
}

export type GithubPermalinkSuccessData = (GithubPermalinkUrlInfo & {
    lines: Array<string>;
    commitUrl: string;
    status: "ok"
})

export type GithubPermalinkDataResponse = GithubPermalinkSuccessData | ErrorResponses;


export type GithubIssueLinkDataResponse = {
    issueTitle: string;
    issueNumber: string;
    issueState: "open" | "closed";
    owner: string;
    repo: string;
    status: "ok"

    // Future - will be mandatory 
    reactions?: {
        "+1": number,
        "-1": number,
        confused: number,
        eyes: number,
        heart: number,
        hooray: number,
        laugh: number,
        rocket: number,
        total_count: number
    }
} | ErrorResponses;

export type GithubRepositoryLinkDataResponse = {
    owner: string;
    repo: string;
    name: string;
    fullName: string;
    description: string | null;
    stargazersCount: number;
    forksCount: number;
    htmlUrl: string;
    status: "ok"
} | ErrorResponses;





export const GithubPermalinkContext = createContext<BaseConfiguration>({
    getDataFn: defaultGetPermalinkFn,
    getIssueFn: defaultGetIssueFn,
    getRepositoryFn: defaultGetRepositoryFn,
});

export function GithubPermalinkProvider(props: PropsWithChildren<Partial<BaseConfiguration>>) {
    return <GithubPermalinkContext.Provider value={{
        getDataFn: props.getDataFn ?? defaultGetPermalinkFn,
        getIssueFn: props.getIssueFn ?? defaultGetIssueFn,
        getRepositoryFn: props.getRepositoryFn ?? defaultGetRepositoryFn,
        githubToken: props.githubToken,
        onError: props.onError,
    }}>
        {props.children}
    </GithubPermalinkContext.Provider>
}
