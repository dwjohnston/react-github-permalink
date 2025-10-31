import { GithubIssueLinkDataResponse } from "./GithubPermalinkContext";
import { parseGithubIssueLink, parseGithubPermalinkUrl, parseTypeScriptPlaygroundUrl } from "../utils/urlParsers";
import { GithubPermalinkDataResponse } from "./GithubPermalinkContext";
import { ErrorResponses } from "./GithubPermalinkContext";
import { TypeScriptPlaygroundDataResponse } from "./GithubPermalinkContext";
import * as LZString from "lz-string";

/**
 * This is AI generated code from GitHub Copilot.
 * See: https://github.com/dwjohnston/react-github-permalink/pull/79
 * But based on my reading of this:https://stackoverflow.com/a/56647993/1068446
 * But the suggested answer is using deprecated functions (escape/unescape)
 * 
 * Properly decode base64 string with UTF-8 support.
 * GitHub API returns base64-encoded content that may contain UTF-8 characters like emojis.
 * 
 * The issue: atob() decodes base64 to a binary string, but treats each byte as a Latin-1 character.
 * For UTF-8 multi-byte characters (like emojis), this corrupts the data.
 * 
 * The solution: Convert the binary string to a byte array, then use TextDecoder to properly
 * interpret those bytes as UTF-8.
 */
export function decodeBase64WithUTF8(base64: string): string {
    // Remove whitespace that GitHub API might include
    const cleanedBase64 = base64.replace(/\s/g, '');

    // Decode base64 to binary string (each character represents a byte)
    const binaryString = atob(cleanedBase64);

    // Convert binary string to byte array
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Decode UTF-8 bytes to string
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
}


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
} export async function defaultGetPermalinkFn(permalink: string, githubToken?: string, onError?: (err: unknown) => void): Promise<GithubPermalinkDataResponse> {
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
    const content = decodeBase64WithUTF8(contentJson.content);
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

    if (response.status === 401) {
        return {
            status: "unauthorized"
        }
    }
    return {
        status: "other-error"
    };
}

export async function defaultGetTypeScriptPlaygroundFn(playgroundUrl: string, _githubToken?: string, onError?: (err: unknown) => void): Promise<TypeScriptPlaygroundDataResponse> {
    try {
        const config = parseTypeScriptPlaygroundUrl(playgroundUrl);
        
        // Decompress the code using lz-string
        const decodedCode = LZString.decompressFromEncodedURIComponent(config.code);
        
        if (!decodedCode) {
            const error = "Failed to decompress TypeScript playground code: invalid or corrupted data";
            onError?.(error);
            return { status: "other-error" };
        }
        
        // Split the code into lines
        const lines = decodedCode.split("\n");
        
        return {
            lines,
            startLine: config.startLine,
            startColumn: config.startColumn,
            endLine: config.endLine,
            endColumn: config.endColumn,
            status: "ok"
        };
    } catch (error) {
        onError?.(error);
        return { status: "other-error" };
    }
}
