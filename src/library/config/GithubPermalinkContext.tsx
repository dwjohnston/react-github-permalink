"use client"
import { PropsWithChildren, createContext } from "react";
import { BaseConfiguration } from "./BaseConfiguration";
import { defaultGetIssueFn } from "./defaultFunctions";
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
}

export type GithubPermalinkSuccessData =  (GithubPermalinkUrlInfo & {
    lines: Array<string>;
    commitUrl: string;
    status: "ok"
}) 

export type GithubPermalinkDataResponse = GithubPermalinkSuccessData| ErrorResponses; 


export type GithubIssueLinkDataResponse = {
    issueTitle: string; 
    issueNumber: string; 
    issueState: "open" | "closed"; 
    owner: string; 
    repo: string; 
    status: "ok"
} | ErrorResponses; 





export const GithubPermalinkContext = createContext<BaseConfiguration>({
    getDataFn: defaultGetPermalinkFn,
    getIssueFn: defaultGetIssueFn,
});

export function GithubPermalinkProvider(props: PropsWithChildren<Partial<BaseConfiguration>>) {
    return <GithubPermalinkContext.Provider value={{
        getDataFn: props.getDataFn ?? defaultGetPermalinkFn,
        getIssueFn: props.getIssueFn ?? defaultGetIssueFn,
        githubToken: props.githubToken,
        onError: props.onError,
    }}>
        {props.children}
    </GithubPermalinkContext.Provider>
}
