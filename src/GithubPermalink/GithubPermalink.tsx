import { PropsWithChildren,  useContext, useEffect, useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { GithubPermalinkDataResponse, GithubPermalinkContext } from "../GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";

type GithubPermalinkProps = {
  permalink: string;
  className?: string;
}; 
export function GithubPermalink(props: GithubPermalinkProps ) {

  const { permalink } = props;
  const [data, setData] = useState(null as null | GithubPermalinkDataResponse)
  const { getDataFn, githubToken } = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDataFn(permalink, githubToken).then((v) => {
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



  if (data.status === "ok") {
    return <GithubPermalinkInner {...props} header={<>
      <a href={permalink} className="file-link">{`${data.owner}/${data.repo}/${data.path}`}</a>
      <p>Lines {data.lineFrom} to {data.lineTo} in <a className="commit-link" href={data.commitUrl}>{data.commit.slice(0, 7)}</a></p>
    </>}>

      <ReactSyntaxHighlighter style={githubGist} language="javascript" showLineNumbers startingLineNumber={data.lineFrom}>{data.lines.join("\n")}</ReactSyntaxHighlighter>
    </GithubPermalinkInner>

  }

    return <GithubPermalinkInner {...props}>
      <ErrorMessages data={data}/>
    </GithubPermalinkInner>
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