import { GithubPermalinkDataResponse, } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { GithubSvg } from "../GithubSvg/GithubSvg";
import { PropsWithChildren } from "react";
import { SyntaxHighlight } from "../SyntaxHighlight/SyntaxHighlight";
import { formatForLineExclusions } from "./formatLineExclusions";
import { CopySvg } from "../images/CopySvg";
import { CopyButton } from "../common/CopyButton/CopyButton";

export type GithubPermalinkBaseProps = {
    className?: string;
    permalink: string;
    excludeLines?: Array<[from: number, to: number]>;
    excludeText?: string;
    data: GithubPermalinkDataResponse;
}



export function GithubPermalinkBase(props: GithubPermalinkBaseProps) {

    const { data, permalink, excludeLines, excludeText = "<snip>" } = props;



    if (data.status === "ok") {

        const formatedLineExclusions = formatForLineExclusions(data, excludeLines);

        const clipboard = formatedLineExclusions.reduce((acc, cur) => {
            if (cur.isExclude) {
                return acc + "\n";
            }

            return acc + "\n" + cur.lines.join("\n");
        }, '')
        return <GithubPermalinkInner {...props} clipboard={clipboard} header={<>
            <a href={permalink} className="file-link">{`${data.owner}/${data.repo}/${data.path}`}</a>
            <p>{data.lineFrom === data.lineTo ? <>Line {data.lineFrom}</> : <>Lines {data.lineFrom} to {data.lineTo}</>} in <a className="commit-link" href={data.commitUrl}>{data.commit.slice(0, 7)}</a></p>
        </>}>

            {formatedLineExclusions.map((v) => {
                if (v.isExclude) {
                    return <SyntaxHighlight className="hide-line-numbers" text={excludeText} startingLineNumber={v.from} key={v.from}/>

                }

                return <SyntaxHighlight text={v.lines.join("\n")} startingLineNumber={v.from} key={v.from}/>

            })}

        </GithubPermalinkInner>

    }

    return <GithubPermalinkInner {...props}>
        <ErrorMessages data={data} />
    </GithubPermalinkInner>
}


function GithubPermalinkInner(props: PropsWithChildren<{
    header?: React.ReactNode
    clipboard?: string;
} & GithubPermalinkBaseProps>) {

    const { clipboard } = props;


    return <div className={`rgp-base react-github-permalink ${props.className ?? ''}`}>
        <div className="header">
            <div>

                <GithubSvg />
            </div>
            <div className="link-wrapper">
                {props.header ?? <a href={props.permalink} className="file-link">{props.permalink}</a>}
            </div>

            {clipboard && <div className="copy-button-container">
                <CopyButton clipboard={clipboard} />
            </div>}
        </div>
        {props.children}
    </div>
}



