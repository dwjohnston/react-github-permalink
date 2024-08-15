
import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig"
import { GithubIssueLinkBase } from "./GithubIssueLinkBase";

export type GithubIssueLinkRscProps = {
    className?: string;
    issueLink: string;
}

export async function GithubIssueLinkRsc(props: GithubIssueLinkRscProps) {
    const dataFn = githubPermalinkRscConfig.getIssueFn();
    const token = githubPermalinkRscConfig.getGithubToken();
    const onError = githubPermalinkRscConfig.getOnError();

    const data = await dataFn(props.issueLink, token, onError);
    return <GithubIssueLinkBase issueLink={props.issueLink} data={data} className={props.className}/>
}
