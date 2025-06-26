import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig"
import { StackOverflowLinkBase, StackOverflowLinkBaseProps } from "./StackOverflowLinkBase";

export type StackOverflowLinkRscProps = Omit<StackOverflowLinkBaseProps, "data">;

export async function StackOverflowLinkRsc(props: StackOverflowLinkRscProps) {
    const dataFn = githubPermalinkRscConfig.getStackOverflowFn();
    const onError = githubPermalinkRscConfig.getOnError();

    const data = await dataFn(props.questionLink, onError);
    return <StackOverflowLinkBase {...props} data={data}/>
}