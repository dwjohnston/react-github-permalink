import { TypeScriptPlaygroundBase, TypeScriptPlaygroundBaseProps } from "./TypeScriptPlaygroundBase";
import { githubPermalinkRscConfig } from "../config/GithubPermalinkRscConfig";

type TypeScriptPlaygroundRscProps = Omit<TypeScriptPlaygroundBaseProps, "data"> & { playgroundUrl: string };

export async function TypeScriptPlaygroundRsc(props: TypeScriptPlaygroundRscProps) {
    const { playgroundUrl } = props;
    const getTypeScriptPlaygroundFn = githubPermalinkRscConfig.getTypeScriptPlaygroundFn();
    const githubToken = githubPermalinkRscConfig.getGithubToken();
    const onError = githubPermalinkRscConfig.getOnError();

    const data = await getTypeScriptPlaygroundFn(playgroundUrl, githubToken, onError);

    return <TypeScriptPlaygroundBase data={data} {...props} />
}
