import { GithubPermalinkDataResponse, } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { GithubSvg } from "../GithubSvg/GithubSvg";
import { PropsWithChildren, useState } from "react";
import { SyntaxHighlight } from "../SyntaxHighlight/SyntaxHighlight";
import { formatForLineExclusions } from "./formatLineExclusions";
import { CopyButton } from "../common/CopyButton/CopyButton";
import { getLanguageFromPath } from "../utils/getLanguageFromPath";
import { AvailableLanguagesPrism } from "../SyntaxHighlight/availableLanguagesPrism";
import { ChevronDownSvg, ChevronRightSvg } from "../images/ChevronSvg";

export type GithubPermalinkBaseProps = {
    className?: string;
    permalink: string;
    excludeLines?: Array<[from: number, to: number]>;
    excludeText?: string;
    data: GithubPermalinkDataResponse;
    language?: AvailableLanguagesPrism;
    /**
     * Whether the permalink should be initially expanded to show the full header.
     * When false, only the code block is shown with a subtle GitHub icon link.
     * Default is controlled by the global configuration `initiallyExpandGithubPermalinks`.
     */
    isInitiallyExpanded?: boolean;
}



export function GithubPermalinkBase(props: GithubPermalinkBaseProps) {

    const { data, permalink, excludeLines, excludeText = "<snip>", } = props;



    if (data.status === "ok") {

        const formatedLineExclusions = formatForLineExclusions(data, excludeLines);
        const language = props.language ?? getLanguageFromPath(data.path);

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
                    return <SyntaxHighlight className="hide-line-numbers" text={excludeText} startingLineNumber={v.from} language={language} key={v.from} />

                }

                return <SyntaxHighlight text={v.lines.join("\n")} startingLineNumber={v.from} language={language} key={v.from} />

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

    const { clipboard, isInitiallyExpanded = true } = props;
    const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);

    return <div className={`rgp-base react-github-permalink ${props.className ?? ''} ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="header">
            <button 
                className="expand-button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label={isExpanded ? "Collapse details" : "Expand details"}
                title={isExpanded ? "Collapse details" : "Expand details"}
            >
                {isExpanded ? <ChevronDownSvg /> : <ChevronRightSvg />}
            </button>
            <div className={isExpanded ? "" : "github-icon-link"}>
                {isExpanded ? <GithubSvg /> : <a href={props.permalink} aria-label="View on GitHub" title="View on GitHub"><GithubSvg /></a>}
            </div>
            {isExpanded && <div className="link-wrapper">
                {props.header ?? <a href={props.permalink} className="file-link">{props.permalink}</a>}
            </div>}

            {clipboard && isExpanded && <div className="copy-button-container">
                <CopyButton clipboard={clipboard} />
            </div>}
        </div>
        {props.children}
    </div>
}



