
import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig"
import { GithubIssueLinkBase, GithubIssueLinkBaseProps } from "./GithubIssueLinkBase";

export type GithubIssueLinkRscProps = Omit<GithubIssueLinkBaseProps, "data">;

export async function GithubIssueLinkRsc(props: GithubIssueLinkRscProps) {
    const dataFn = githubPermalinkRscConfig.getIssueFn();
    const token = githubPermalinkRscConfig.getGithubToken();
    const onError = githubPermalinkRscConfig.getOnError();

    const data = await dataFn(props.issueLink, token, onError);
    return <GithubIssueLinkBase {...props} data={data}/>
}
