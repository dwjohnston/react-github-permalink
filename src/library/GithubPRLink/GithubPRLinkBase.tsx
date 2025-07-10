import { PropsWithChildren } from "react";
import { GithubSvg } from "../GithubSvg/GithubSvg";
import { GithubPRLinkDataResponse } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { Reactions } from "../common/Reactions/Reactions";
import { Inline } from "../common/Inline/Inline";


export type GithubPRLinkBaseProps = {
  className?: string;
  prLink: string;
  data: GithubPRLinkDataResponse;
  variant?: "inline" | "block"
}



export function GithubPRLinkBase(props: GithubPRLinkBaseProps) {
  const { data, variant ="block", prLink} = props;

    if (variant === "inline"){
      if(data.status === "ok"){
        return <Inline href={prLink} text={`${data.owner}/${data.repo}#${data.prNumber}  ${data.prTitle}`}/>
      }
      else {
        return <Inline href={prLink} text={prLink}/>
      }
    }

    if (data.status === "ok") {
        return <GithubPRLinkInner {...props} header={<>
          <div className="react-github-prlink-repo">
            <GithubSvg />
            <p>
              {data.owner}/{data.repo}
            </p>
          </div>
    
          <div className="react-github-prlink-body">
            <p><span className="react-github-prlink-title">{data.prTitle}</span><span className="react-github-prlink-number"> #{data.prNumber}</span> </p>
    
            {data.isDraft ? <div className="react-github-prlink-status draft">
              <svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true">
                <path d="M3.25 1A2.25 2.25 0 0 0 1 3.25v9.5A2.25 2.25 0 0 0 3.25 15h9.5A2.25 2.25 0 0 0 15 12.75v-9.5A2.25 2.25 0 0 0 12.75 1h-9.5ZM2.5 3.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75v-9.5Z"></path>
              </svg>
              <span> Draft</span>
            </div> : data.merged ? <div className="react-github-prlink-status merged">
              <svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true">
                <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.25 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"></path>
              </svg>
              <span> Merged</span>
            </div> : data.prState === "open" ? <div className="react-github-prlink-status open">
              <svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true">
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
              </svg>
              <span> Open</span>
            </div> : <div className="react-github-prlink-status closed">
              <svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true">
                <path d="M3.25 1A2.25 2.25 0 0 0 1 3.25v9.5A2.25 2.25 0 0 0 3.25 15h9.5A2.25 2.25 0 0 0 15 12.75v-9.5A2.25 2.25 0 0 0 12.75 1h-9.5ZM2.5 3.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75h-9.5a.75.75 0 0 1-.75-.75v-9.5Z"></path><path d="M6.72 7.47a.75.75 0 1 1 1.06 1.06L6.06 10.25a.75.75 0 0 1-1.06-1.06L6.72 7.47Z"></path><path d="M5.47 6.72a.75.75 0 0 1 1.06 0l1.72 1.72a.75.75 0 1 1-1.06 1.06L5.47 7.78a.75.75 0 0 1 0-1.06Z"></path>
              </svg>
              <span> Closed</span>
            </div>}

       
          </div>
          <div>
                {data.reactions && <Reactions reactions={data.reactions}/>}
            </div>
        </>}>
        </GithubPRLinkInner>
    
      }
    
      return <GithubPRLinkInner {...props}>
        <ErrorMessages data={data} />
      </GithubPRLinkInner>

}


function GithubPRLinkInner(props: PropsWithChildren<{
  header?: React.ReactNode
} & {
  prLink: string;
  className?: string;
}>) {

  const {prLink, className =''} = props;

  return <div className={`rgp-base react-github-prlink ${className}`}>
    <a href={prLink}>
      <div className="header">
        {props.header ?? <a href={prLink} className="file-link">{prLink}</a>}
      </div>
      {props.children}
    </a>
  </div>
}