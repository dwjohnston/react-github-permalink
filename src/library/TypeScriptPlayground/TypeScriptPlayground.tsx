"use client"

import { useContext, useEffect, useState } from "react";
import { TypeScriptPlaygroundDataResponse, GithubPermalinkContext } from "../config/GithubPermalinkContext";
import { TypeScriptPlaygroundBase, TypeScriptPlaygroundBaseProps } from "./TypeScriptPlaygroundBase";

type TypeScriptPlaygroundProps = Omit<TypeScriptPlaygroundBaseProps, "data"> & { playgroundUrl: string };

export function TypeScriptPlayground(props: TypeScriptPlaygroundProps) {
    const { playgroundUrl } = props;
    const [data, setData] = useState(null as null | TypeScriptPlaygroundDataResponse);
    const { getTypeScriptPlaygroundFn, githubToken, onError } = useContext(GithubPermalinkContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTypeScriptPlaygroundFn(playgroundUrl, githubToken, onError).then((v) => {
            setIsLoading(false);
            setData(v);
        })
    }, [getTypeScriptPlaygroundFn, githubToken, onError, playgroundUrl])

    if (isLoading) {
        return null;
    }
    if (!data) {
        throw new Error("Loading is complete, but no data was returned.")
    }

    return <TypeScriptPlaygroundBase data={data} {...props} />
}
