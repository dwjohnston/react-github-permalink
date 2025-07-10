import { useContext, useEffect, useState } from "react";
import { GithubPermalinkContext } from "../config/GithubPermalinkContext";
import { GithubRepositoryLinkDataResponse } from "../config/GithubPermalinkContext";
import { GithubRepositoryLinkBase, GithubRepositoryLinkBaseProps } from "./GithubRepositoryLinkBase";

export type GithubRepositoryLinkProps = Omit<GithubRepositoryLinkBaseProps, "data"> & {
  repositoryLink: string;
};

export function GithubRepositoryLink(props: GithubRepositoryLinkProps) {
  const { getRepositoryFn, githubToken, onError } = useContext(GithubPermalinkContext);
  const [data, setData] = useState<GithubRepositoryLinkDataResponse>({ status: "other-error" });
  const { repositoryLink } = props;

  useEffect(() => {
    getRepositoryFn(repositoryLink, githubToken, onError).then((v) => {
      setData(v);
    }).catch((err) => {
      onError?.(err);
      setData({ status: "other-error" });
    });
  }, [repositoryLink, getRepositoryFn, githubToken, onError]);

  return <GithubRepositoryLinkBase {...props} data={data} />;
}