import { GithubRepositoryLinkBase, GithubRepositoryLinkBaseProps } from "./GithubRepositoryLinkBase";
import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig";

export type GithubRepositoryLinkRscProps = Omit<GithubRepositoryLinkBaseProps, "data"> & {
  repositoryLink: string;
};

export async function GithubRepositoryLinkRsc(props: GithubRepositoryLinkRscProps) {
  const { repositoryLink } = props;
  const { getRepositoryFn, githubToken, onError } = githubPermalinkRscConfig.getConfig();

  let data;
  try {
    data = await getRepositoryFn(repositoryLink, githubToken, onError);
  } catch (err) {
    onError?.(err);
    data = { status: "other-error" as const };
  }

  return <GithubRepositoryLinkBase {...props} data={data} />;
}