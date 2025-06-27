"use client"
import { PropsWithChildren, createContext } from "react";
import { BaseConfiguration } from "./BaseConfiguration";
import { defaultGetIssueFn, defaultGetStackOverflowFn } from "./defaultFunctions";
import { defaultGetPermalinkFn } from "./defaultFunctions";

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

export type StackOverflowLinkDataResponse = {
    questionTitle: string;
    questionId: string;
    isAnswered: boolean;
    answerCount: number;
    score: number;
    viewCount: number;
    tags: string[];
    creationDate: number;
    status: "ok"
} | ErrorResponses;





export const GithubPermalinkContext = createContext<BaseConfiguration>({
    getDataFn: defaultGetPermalinkFn,
    getIssueFn: defaultGetIssueFn,
    getStackOverflowFn: defaultGetStackOverflowFn,
});

export function GithubPermalinkProvider(props: PropsWithChildren<Partial<BaseConfiguration>>) {
    return <GithubPermalinkContext.Provider value={{
        getDataFn: props.getDataFn ?? defaultGetPermalinkFn,
        getIssueFn: props.getIssueFn ?? defaultGetIssueFn,
        getStackOverflowFn: props.getStackOverflowFn ?? defaultGetStackOverflowFn,
        githubToken: props.githubToken,
        onError: props.onError,
    }}>
        {props.children}
    </GithubPermalinkContext.Provider>
}
