import { useEffect, useState } from "react";

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

  async function getData(permalink: string) : Promise<Array<string>> {
    const config = parseGitHubURL(permalink); 

    const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${config.commit}`); 
    if(!res.ok){
        throw new Error("Res not ok")
    }

    const json = await res.json();

    const content = atob(json.content); 
    const lines = content.split("\n"); 

    return lines.slice(config.lineFrom-1, config.lineTo-config.lineFrom);



  }


export function GithubPermalink(props: {
    permalink: string
}) {

    const [lines, setLines] = useState([] as Array<string>)

    useEffect(() => {
        getData(props.permalink).then((v) => {
            setLines(v);
        })
    }, [])
    return <div>{props.permalink}
        {JSON.stringify(lines, null, 2)}
    </div>
}