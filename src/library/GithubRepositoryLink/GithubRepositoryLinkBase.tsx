import { PropsWithChildren } from "react";
import { GithubSvg } from "../GithubSvg/GithubSvg";
import { GithubRepositoryLinkDataResponse } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";

export type GithubRepositoryLinkBaseProps = {
  className?: string;
  repositoryLink: string;
  data: GithubRepositoryLinkDataResponse;
  variant?: "inline" | "block";
  showDescription?: boolean;
  showCounts?: boolean;
}

export function GithubRepositoryLinkBase(props: GithubRepositoryLinkBaseProps) {
  const { 
    data, 
    variant = "block", 
    repositoryLink, 
    showDescription = true, 
    showCounts = true 
  } = props;

  if (data.status === "ok") {
    if (variant === "inline") {
      return (
        <a href={data.htmlUrl} className="react-github-repository-link-inline">
          <GithubSvg />
          <span>{data.fullName}</span>
          {showCounts && (
            <span className="react-github-repository-link-counts">
              ⭐ {data.stargazersCount} 🍴 {data.forksCount}
            </span>
          )}
        </a>
      );
    }

    return (
      <GithubRepositoryLinkInner {...props}>
        <div className="react-github-repository-link-header">
          <div className="react-github-repository-link-repo">
            <GithubSvg />
            <a href={data.htmlUrl} className="react-github-repository-link-name">
              {data.fullName}
            </a>
          </div>
          {showCounts && (
            <div className="react-github-repository-link-stats">
              <span className="react-github-repository-link-stars">
                ⭐ {data.stargazersCount}
              </span>
              <span className="react-github-repository-link-forks">
                🍴 {data.forksCount}
              </span>
            </div>
          )}
        </div>
        {showDescription && data.description && (
          <div className="react-github-repository-link-description">
            {data.description}
          </div>
        )}
      </GithubRepositoryLinkInner>
    );
  }

  return <ErrorMessages data={data} />;
}

export function GithubRepositoryLinkInner(props: PropsWithChildren<GithubRepositoryLinkBaseProps>) {
  return (
    <div className={`react-github-repository-link ${props.className ?? ""}`}>
      {props.children}
    </div>
  );
}