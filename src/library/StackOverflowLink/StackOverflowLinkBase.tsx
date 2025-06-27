import { PropsWithChildren, ReactNode } from "react";
import { StackOverflowSvg } from "../images/StackOverflowSvg/StackOverflowSvg";
import { StackOverflowLinkDataResponse } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";


export type StackOverflowLinkBaseProps = {
  className?: string;
  stackoverflowLink: string;
  data: StackOverflowLinkDataResponse;
  variant?: "inline" | "block",
  showTags?: boolean;
}

function StackOverflowInline(props: {
  href: string;
  text: string;
} | {
  href: string;
  data: StackOverflowLinkDataResponse & { status: "ok" }
}) {
  const { href } = props;


  let textToDisplay = null;
  let startAdornment: null | ReactNode = null;

  if ("data" in props) {
    textToDisplay = props.data.questionTitle;
    startAdornment = <div className={`react-stackoverflow-inline-vote-count ${props.data.isAnswered ? "answered" : "not-answered"}`}> {props.data.score}</ div>
  }
  else {
    textToDisplay = props.text;
  }

  return <a href={href} className="rgp-base react-stackoverflow-link-inline">
    <StackOverflowSvg />{startAdornment} <span>{textToDisplay}</span>
  </a>
}

export function StackOverflowLinkBase(props: StackOverflowLinkBaseProps) {
  const { data, variant = "block", stackoverflowLink, showTags } = props;

  if (variant === "inline") {
    if (data.status === "ok") {
      return <StackOverflowInline href={stackoverflowLink} data={data} />
    }
    else {
      return <StackOverflowInline href={stackoverflowLink} text={stackoverflowLink} />
    }
  }

  if (data.status === "ok") {
    return <StackOverflowLinkFrame {...props} header={<>
      <div className="react-stackoverflow-link-header">
        <StackOverflowSvg />
        <span className="react-stackoverflow-link-title">{data.questionTitle}</span>
      </div>
    </>}>

      <div className="react-stackoverflow-link-body">
        <div className="react-stackoverflow-link-stats">
          <div className="react-stackoverflow-link-score">
            <span className="stat-label">Score:</span> <span className="stat-value">{data.score}</span>
          </div>
          <div className="react-stackoverflow-link-answers">
            <span className="stat-label">Answers:</span> <span className="stat-value">{data.answerCount}</span>
            {data.isAnswered && <span className="answered-indicator"> ✓</span>}
          </div>
        </div>

        {showTags && data.tags && data.tags.length > 0 && (
          <div className="react-stackoverflow-link-tags">
            {data.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </StackOverflowLinkFrame>

  }

  return <StackOverflowLinkFrame  {...props} header={
    <div className="react-stackoverflow-link-header">
      <StackOverflowSvg />
      <span className="react-stackoverflow-link-title">{props.stackoverflowLink}</span>
    </div>
  }>

  </StackOverflowLinkFrame>

}


function StackOverflowLinkFrame(props: PropsWithChildren<{
  header?: React.ReactNode
} & {
  stackoverflowLink: string;
  className?: string;
}>) {

  const { stackoverflowLink, className = '' } = props;

  return <div className={`rgp-base react-stackoverflow-link ${className}`}>
    <a href={stackoverflowLink}>
      <div className="header">
        {props.header ?? <a href={stackoverflowLink} className="file-link">{stackoverflowLink}</a>}
      </div>
      {props.children}
    </a>
  </div>
}