import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig";
import { GithubPRLinkBase, GithubPRLinkBaseProps } from "./GithubPRLinkBase";

type GithubPRLinkRscProps = Omit<GithubPRLinkBaseProps, "data">;

export async function GithubPRLinkRsc(props: GithubPRLinkRscProps) {
  const { prLink } = props;
  const prFunction = githubPermalinkRscConfig.getPRFn();
  const githubToken = githubPermalinkRscConfig.getGithubToken();
  const onError = githubPermalinkRscConfig.getOnError();
  const data = await prFunction(prLink, githubToken, onError);

  return <GithubPRLinkBase {...props} data={data} />;
}