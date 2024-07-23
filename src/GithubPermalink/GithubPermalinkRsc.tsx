
import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig"
import { GithubPermalinkBase } from "./GithubPermalinkBase";




export type GithubPermalinkRscProps = {
    className?: string;
    permalink: string;
}



export async function GithubPermalinkRsc(props: GithubPermalinkRscProps) {
    const dataFn = githubPermalinkRscConfig.getPermalinkFn();
    const token = githubPermalinkRscConfig.getGithubToken();
    const onError = githubPermalinkRscConfig.getOnError();

    const data = await dataFn(props.permalink, token, onError);

    return <GithubPermalinkBase permalink={props.permalink} data={data} className={props.className} isDarkMode={true} />


}
