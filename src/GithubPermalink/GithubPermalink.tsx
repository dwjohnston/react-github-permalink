import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// Thanks ChatGPT
type GitHubURLInfo = {
  owner: string;
  repo: string;
  commit: string;
  path: string;
  lineFrom: number;
  lineTo: number;
};

function parseGitHubURL(githubURL: string): GitHubURLInfo {
  // Define a regular expression to extract information from the URL
  const regex = /https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)#L(\d+)-L(\d+)/;

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
      lineTo: parseInt(lineTo, 10),
    };
  } else {
    throw new Error("Invalid config apparently");

  }
}

type GithubDataResponse = (GitHubURLInfo & {
  lines: Array<string>;
  commitUrl: string;
  status: "ok"
}) | {
  status: "rate-limit"
} | {
  status: "404"
} | {
  status: "other-error"
}


function handleResponse(response: Response): GithubDataResponse {

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

async function defaultGetDataFn(permalink: string): Promise<GithubDataResponse> {
  const config = parseGitHubURL(permalink);

  const contentPromise = fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.commit}`);
  const commitPromise = fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/commits/${config.commit}`);

  const [contentResult, commitResult] = await Promise.all([contentPromise, commitPromise]);

  if (!contentResult.ok) {
    return handleResponse(contentResult);
  }

  if (!commitResult.ok) {
    return handleResponse(commitResult);
  }

  const [contentJson, commitJson] = await Promise.all([contentResult.json(), commitResult.json()]);
  const content = atob(contentJson.content);
  const lines = content.split("\n");

  return {
    lines: lines.slice(config.lineFrom - 1, config.lineTo - config.lineFrom),
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

export const GithubPermalinkContext = createContext({
  getDataFn: defaultGetDataFn,
});




function exhaustiveFailure(value: never): never {
  throw new Error("Exhaustive failure."); 
}

type GithubPermalinkProps = {
  permalink: string;
  className?: string;
}; 
export function GithubPermalink(props: GithubPermalinkProps ) {

  const { permalink } = props;
  const [data, setData] = useState(null as null | GithubDataResponse)
  const { getDataFn } = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDataFn(permalink).then((v) => {
      setIsLoading(false);
      setData(v);
    })
  }, [])

  if (isLoading) {
    return null;
  }
  if (!data) {
    throw new Error("Loading is complete, but no data was returned.")
  }

  if(data.status === "404"){
    return <GithubPermalinkInner {...props}>
      <p className="error"> 
       Github returned an HTTP status 404. Is this a private Github repo? 
      </p>
    </GithubPermalinkInner>
  }

  if(data.status ==="rate-limit"){
    return <GithubPermalinkInner {...props}>
      <p className="error"> 
      You have encountered Github's unauthenticated API request rate limit. You can still visit the above link to see the code snippet.
      </p>
    </GithubPermalinkInner>
  }

  if(data.status ==="other-error"){
    return <GithubPermalinkInner {...props}>
      <p className="error"> 
          An unknown error occurred.
      </p>
    </GithubPermalinkInner>
  }


  if (data.status === "ok") {
    return <GithubPermalinkInner {...props} header={<>
      <a href={permalink} className="file-link">{`${data.owner}/${data.repo}/${data.path}`}</a>
      <p>Lines {data.lineFrom} to {data.lineTo} in <a className="commit-link" href={data.commitUrl}>{data.commit.slice(0, 7)}</a></p>
    </>}>

      <ReactSyntaxHighlighter style={githubGist} language="javascript" showLineNumbers startingLineNumber={data.lineFrom}>{data.lines.join("\n")}</ReactSyntaxHighlighter>
    </GithubPermalinkInner>

  }
  
  return exhaustiveFailure(data);
}


function GithubPermalinkInner(props: PropsWithChildren<{
  header?: React.ReactNode
}  & GithubPermalinkProps>) {
  return <div className={`react-github-permalink ${props.className}`}>
    <div className="header">
      {props.header ??  <a href={props.permalink} className="file-link">{props.permalink}</a>}
    </div>
    {props.children}
  </div>
}