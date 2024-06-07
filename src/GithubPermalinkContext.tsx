import { PropsWithChildren, createContext } from "react";
import { parseGithubIssueLink, parseGithubPermalinkUrl } from "./utils/urlParsers";

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

export type GithubPermalinkDataResponse = (GithubPermalinkUrlInfo & {
    lines: Array<string>;
    commitUrl: string;
    status: "ok"
}) | ErrorResponses; 


export type GithubIssueLinkDataResponse = {
    issueTitle: string; 
    issueNumber: string; 
    issueState: "open" | "closed"; 
    owner: string; 
    repo: string; 
    status: "ok"
} | ErrorResponses; 





function handleResponse(response: Response): ErrorResponses {

    

    if (response.status === 404) {
        return { status: "404" }
    }

    if (response.status === 403 && response.headers.get("X-Ratelimit-Remaining") === "0") {
        return {
            status: "rate-limit"
        }
    }

    return {
        status: "other-error"
    }

}

async function defaultGetIssueFn(issueLink: string, githubToken?: string, onError?: (err: unknown) => void): Promise<GithubIssueLinkDataResponse> {
    const config = parseGithubIssueLink(issueLink);


    const options = githubToken ? {
        headers: {
            Authorization: `Bearer ${githubToken}`
        }
    } : undefined;

    const issueResult = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/issues/${config.issue}`, options);



    if (!issueResult.ok) {
        onError?.(issueResult);
        return handleResponse(issueResult);

    }

    const issueJson = await issueResult.json();

    return {
        issueTitle: issueJson.title,
        issueNumber: config.issue,
        issueState: issueJson.state,
        status: "ok", 
        owner: config.owner, 
        repo: config.repo
    }
}



async function defaultGetPermalinkFn(permalink: string, githubToken?: string, onError?: (err: unknown) => void): Promise<GithubPermalinkDataResponse> {
    const config = parseGithubPermalinkUrl(permalink);


    const options = githubToken ? {
        headers: {
            Authorization: `Bearer ${githubToken}`
        }
    } : undefined;

    const contentPromise = fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.commit}`, options);
    const commitPromise = fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/commits/${config.commit}`, options);

    const [contentResult, commitResult] = await Promise.all([contentPromise, commitPromise]);

    if (!contentResult.ok) {
        onError?.(contentResult);
        return handleResponse(contentResult);
    }

    if (!commitResult.ok) {
        onError?.(commitResult);
        return handleResponse(commitResult);
    }

    const [contentJson, commitJson] = await Promise.all([contentResult.json(), commitResult.json()]);
    const content = atob(contentJson.content);
    const lines = content.split("\n");

    return {
        lines: lines.slice(config.lineFrom - 1, config.lineTo),
        lineFrom: config.lineFrom,
        lineTo: config.lineTo,
        commit: config.commit,
        path: config.path,
        owner: config.owner,
        repo: config.repo,
        commitUrl: commitJson.html_url,
        status: "ok"
    }
}



type GithubPermalinkContextType = {
    getDataFn: typeof defaultGetPermalinkFn,
    getIssueFn: typeof defaultGetIssueFn,
    githubToken?: string
    onError?: (e: unknown) => void; 
}


export const GithubPermalinkContext = createContext<GithubPermalinkContextType>({
    getDataFn: defaultGetPermalinkFn,
    getIssueFn: defaultGetIssueFn,
});

export function GithubPermalinkProvider(props: PropsWithChildren<Partial<GithubPermalinkContextType>>) {
    return <GithubPermalinkContext.Provider value={{
        getDataFn: props.getDataFn ?? defaultGetPermalinkFn,
        getIssueFn: props.getIssueFn ?? defaultGetIssueFn,
        githubToken: props.githubToken,
        onError: props.onError,
    }}>
        {props.children}
    </GithubPermalinkContext.Provider>
}
