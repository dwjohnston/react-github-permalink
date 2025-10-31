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

export type TypeScriptPlaygroundUrlInfo = {
    code: string;
    startLine?: number;
    startColumn?: number;
    endLine?: number;
    endColumn?: number;
};

export function parseTypeScriptPlaygroundUrl(playgroundUrl: string): TypeScriptPlaygroundUrlInfo {
    // TypeScript playground URL format:
    // https://www.typescriptlang.org/play/?ssl=44&ssc=1&pln=8&pc=1#code/{compressed_code}
    
    const url = new URL(playgroundUrl);
    
    // Validate it's a TypeScript playground URL
    if ((url.hostname !== 'www.typescriptlang.org' && url.hostname !== 'typescriptlang.org') || !url.pathname.includes('/play')) {
        throw new Error("Invalid TypeScript playground URL");
    }
    
    // Extract code from hash
    const codeMatch = url.hash.match(/#code\/(.*)/);
    if (!codeMatch) {
        throw new Error("No code found in TypeScript playground URL");
    }
    
    const compressedCode = codeMatch[1];
    
    // Parse query parameters for line/column information
    const params = new URLSearchParams(url.search);
    const ssl = params.get('ssl'); // start line
    const ssc = params.get('ssc'); // start column
    const pln = params.get('pln'); // panel line (end line)
    const pc = params.get('pc');   // panel column (end column)
    
    return {
        code: compressedCode,
        startLine: ssl ? parseInt(ssl, 10) : undefined,
        startColumn: ssc ? parseInt(ssc, 10) : undefined,
        endLine: pln ? parseInt(pln, 10) : undefined,
        endColumn: pc ? parseInt(pc, 10) : undefined,
    };
}
