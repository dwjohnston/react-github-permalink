import { GithubPermalinkDataResponse, } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { GithubSvg } from "../GithubSvg/GithubSvg";
import { PropsWithChildren } from "react";
import { SyntaxHighlight } from "../SyntaxHighlight/SyntaxHighlight";

export type GithubPermalinkBaseProps = {
    className?: string;
    permalink: string;
    data: GithubPermalinkDataResponse;
}
export function GithubPermalinkBase(props: GithubPermalinkBaseProps) {


    console.log(props);

    const { data, permalink } = props;

    if (data.status === "ok") {
        return <GithubPermalinkInner {...props} header={<>
            <a href={permalink} className="file-link">{`${data.owner}/${data.repo}/${data.path}`}</a>
            <p>{data.lineFrom === data.lineTo ? <>Line {data.lineFrom}</> : <>Lines {data.lineFrom} to {data.lineTo}</>} in <a className="commit-link" href={data.commitUrl}>{data.commit.slice(0, 7)}</a></p>
        </>}>

            <SyntaxHighlight text={data.lines.join("\n")} startingLineNumber={data.lineFrom} />
        </GithubPermalinkInner>

    }

    return <GithubPermalinkInner {...props}>
        <ErrorMessages data={data} />
    </GithubPermalinkInner>
}


function GithubPermalinkInner(props: PropsWithChildren<{
    header?: React.ReactNode
} & GithubPermalinkBaseProps>) {
    return <div className={`rgp-base react-github-permalink ${props.className ?? ''}`}>
        <div className="header">
            <div>

                <GithubSvg />
            </div>
            <div className="link-wrapper">
                {props.header ?? <a href={props.permalink} className="file-link">{props.permalink}</a>}
            </div>
        </div>
        {props.children}
    </div>
}
