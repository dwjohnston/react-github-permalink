import { PropsWithChildren } from "react";
import { StackOverflowSvg } from "../StackOverflowSvg/StackOverflowSvg";
import { StackOverflowLinkDataResponse } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";


export type StackOverflowLinkBaseProps = {
  className?: string;
  questionLink: string;
  data: StackOverflowLinkDataResponse;
  variant?: "inline" | "block"
}

function StackOverflowInline(props: {
    href: string; 
    text: string; 
}) {

    const {href, text} = props;
return <a href={href} className = "rgp-base react-stackoverflow-link-inline">
       <StackOverflowSvg/> <span>{text}</span></a>
}

export function StackOverflowLinkBase(props: StackOverflowLinkBaseProps) {
  const { data, variant ="block", questionLink} = props;

    if (variant === "inline"){
      if(data.status === "ok"){
        return <StackOverflowInline href={questionLink} text={`stackoverflow.com/q/${data.questionId}: ${data.questionTitle}`}/>
      }
      else {
        return <StackOverflowInline href={questionLink} text={questionLink}/>
      }
    }

    if (data.status === "ok") {
        return <StackOverflowLinkInner {...props} header={<>
          <div className="react-stackoverflow-link-header">
            <StackOverflowSvg />
            <p>
              Stack Overflow
            </p>
          </div>
    
          <div className="react-stackoverflow-link-body">
            <p><span className="react-stackoverflow-link-title">{data.questionTitle}</span></p>
    
            <div className="react-stackoverflow-link-stats">
              <div className="react-stackoverflow-link-score">
                <span className="stat-label">Score:</span> <span className="stat-value">{data.score}</span>
              </div>
              <div className="react-stackoverflow-link-answers">
                <span className="stat-label">Answers:</span> <span className="stat-value">{data.answerCount}</span>
                {data.isAnswered && <span className="answered-indicator"> ✓</span>}
              </div>
              <div className="react-stackoverflow-link-views">
                <span className="stat-label">Views:</span> <span className="stat-value">{data.viewCount.toLocaleString()}</span>
              </div>
            </div>

            {data.tags && data.tags.length > 0 && (
              <div className="react-stackoverflow-link-tags">
                {data.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </>}>
        </StackOverflowLinkInner>
    
      }
    
      return <StackOverflowLinkInner {...props}>
        <ErrorMessages data={data} />
      </StackOverflowLinkInner>

}


function StackOverflowLinkInner(props: PropsWithChildren<{
  header?: React.ReactNode
} & {
  questionLink: string;
  className?: string;
}>) {

  const {questionLink, className =''} = props;

  return <div className={`rgp-base react-stackoverflow-link ${className}`}>
    <a href={questionLink}>
      <div className="header">
        {props.header ?? <a href={questionLink} className="file-link">{questionLink}</a>}
      </div>
      {props.children}
    </a>
  </div>
}