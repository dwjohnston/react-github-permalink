import { GithubIssueLinkDataResponse } from "./GithubPermalinkContext";
import { parseGithubIssueLink, parseGithubPermalinkUrl } from "../utils/urlParsers";
import { GithubPermalinkDataResponse } from "./GithubPermalinkContext";
import { ErrorResponses } from "./GithubPermalinkContext";


export async function defaultGetIssueFn(issueLink: string, githubToken?: string, onError?: (err: unknown) => void): Promise<GithubIssueLinkDataResponse> {
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
        repo: config.repo, 
        reactions: issueJson.reactions,
    };
}export async function defaultGetPermalinkFn(permalink: string, githubToken?: string, onError?: (err: unknown) => void): Promise<GithubPermalinkDataResponse> {
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
    };
}
export function handleResponse(response: Response): ErrorResponses {
    if (response.status === 404) {
        return { status: "404" };
    }

    if (response.status === 403 && response.headers.get("X-Ratelimit-Remaining") === "0") {
        return {
            status: "rate-limit"
        };
    }
    return {
        status: "other-error"
    };
}

