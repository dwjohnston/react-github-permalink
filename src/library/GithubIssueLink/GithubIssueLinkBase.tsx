
import { PropsWithChildren } from "react";
import { GithubSvg } from "../GithubSvg/GithubSvg";
import {   GithubIssueLinkDataResponse } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";
import { Reactions } from "../common/Reactions/Reactions";


type GithubIssueLinkBaseProps = {
    className?: string;
    issueLink: string;
    data: GithubIssueLinkDataResponse;
}



export function GithubIssueLinkBase(props: GithubIssueLinkBaseProps) {
    const {data} =  props; 

    if (data.status === "ok") {
        return <GithubIssueLinkInner {...props} header={<>
          <div className="react-github-issuelink-repo">
            <GithubSvg />
            <p>
              {data.owner}/{data.repo}
            </p>
          </div>
    
          <div className="react-github-issuelink-body">
            <p><span className="react-github-issuelink-title">{data.issueTitle}</span><span className="react-github-issuelink-number"> #{data.issueNumber}</span> </p>
    
            {data.issueState === "open" ? <div className="react-github-issuelink-status open"><svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true" >
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
            </svg><span> Open</span></div> : <div className="react-github-issuelink-status closed"><svg aria-hidden="true" height="12" viewBox="0 0 16 16" version="1.1" width="12" data-view-component="true" >
              <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path>
            </svg><span> Closed</span></div>}

       
          </div>
          <div>
                {data.reactions && <Reactions reactions={data.reactions}/>}
            </div>
        </>}>
        </GithubIssueLinkInner>
    
      }
    
      return <GithubIssueLinkInner {...props}>
        <ErrorMessages data={data} />
      </GithubIssueLinkInner>

}


function GithubIssueLinkInner(props: PropsWithChildren<{
    header?: React.ReactNode
  } & {
    issueLink: string; 
    className?: string; 
  }>) {
    return <div className={`rgp-base react-github-issuelink ${props.className ?? ''} `}>
      <a href={props.issueLink}>
        <div className="header"> 
          {props.header ?? <a href={props.issueLink} className="file-link">{props.issueLink}</a>}
        </div>
        {props.children}
      </a>
    </div>
  }
  