import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig";
import { CaniuseLinkBase, CaniuseLinkBaseProps } from "./CaniuseLinkBase";

export type CaniuseLinkRscProps = Omit<CaniuseLinkBaseProps, "data">;

export async function CaniuseLinkRsc(props: CaniuseLinkRscProps) {
  const dataFn = githubPermalinkRscConfig.getCaniuseFn();
  const token = githubPermalinkRscConfig.getGithubToken();
  const onError = githubPermalinkRscConfig.getOnError();

  const data = await dataFn(props.feature, token, onError);
  return <CaniuseLinkBase {...props} data={data} />;
}