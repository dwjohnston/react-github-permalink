
import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig"
import { GithubPermalinkBase, GithubPermalinkBaseProps } from "./GithubPermalinkBase";

export type GithubPermalinkRscProps = Omit<GithubPermalinkBaseProps, "data"> & {
    permalink: string;
}

export async function GithubPermalinkRsc(props: GithubPermalinkRscProps) {

    const { permalink } = props; 
    const dataFn = githubPermalinkRscConfig.getPermalinkFn();
    const token = githubPermalinkRscConfig.getGithubToken();
    const onError = githubPermalinkRscConfig.getOnError();

    const data = await dataFn(permalink, token, onError);
    return <GithubPermalinkBase  data={data} {...props}/>
}
