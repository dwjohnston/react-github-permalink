import { GithubPermalinkUrlInfo } from "../config/GithubPermalinkContext";

export function parseGithubPermalinkUrl(githubURL: string): GithubPermalinkUrlInfo {
// Define a regular expression to extract information from the URL
const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)#L(\d+)(?:-L(\d+))?/;

// Use the regular expression to extract the information
const match = githubURL.match(regex);

// Check if the URL matches the expected format
if (match) {
    const [, owner, repo, commit, path, lineFrom, lineTo] = match;

    // Create and return the object
    return {
        owner,
        repo,
        commit,
        path,
        lineFrom: parseInt(lineFrom, 10),
        lineTo: lineTo ? parseInt(lineTo, 10) : parseInt(lineFrom, 10),
    };
} else {
    throw new Error("Invalid permalink URL");
}
}

export function parseGithubIssueLink(url: string): { owner: string, repo: string, issue: string } {
    const regex = /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:issues|pull)\/(\d+)$/;
    const match = url.match(regex);

    if (match) {
        const [, owner, repo, issue] = match;
        return { owner, repo, issue };
    } else {
        throw new Error("Invalid issue link URL");    
    }
}
