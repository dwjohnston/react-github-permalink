"use client"

import { useContext, useEffect, useState } from "react";
import { GithubPermalinkDataResponse, GithubPermalinkContext } from "../config/GithubPermalinkContext";
import { GithubPermalinkBase, GithubPermalinkBaseProps } from "./GithubPermalinkBase";

type GithubPermalinkProps = Omit<GithubPermalinkBaseProps, "data"> & { permalink: string };
export function GithubPermalink(props: GithubPermalinkProps) {

  const { permalink } = props;
  const [data, setData] = useState(null as null | GithubPermalinkDataResponse)
  const { getDataFn, githubToken, onError, initiallyExpandGithubPermalinks } = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDataFn(permalink, githubToken, onError).then((v) => {
      setIsLoading(false);
      setData(v);
    })
  }, [getDataFn, githubToken, onError, permalink])

  if (isLoading) {
    return null;
  }
  if (!data) {
    throw new Error("Loading is complete, but no data was returned.")
  }


  return <GithubPermalinkBase 
    data={data} 
    isInitiallyExpanded={props.isInitiallyExpanded ?? initiallyExpandGithubPermalinks}
    {...props} />
}


