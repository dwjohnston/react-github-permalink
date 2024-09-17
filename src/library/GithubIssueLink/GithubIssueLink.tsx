"use client"

import {  useContext, useEffect, useState } from "react";

import {  GithubPermalinkContext, GithubIssueLinkDataResponse } from "../config/GithubPermalinkContext";
import { GithubIssueLinkBase, GithubIssueLinkBaseProps } from "./GithubIssueLinkBase";

type GithubIssueLinkProps = Omit<GithubIssueLinkBaseProps, "data">;

export function GithubIssueLink(props: GithubIssueLinkProps) {

  const { issueLink } = props;
  const [data, setData] = useState(null as null | GithubIssueLinkDataResponse)
  const { getIssueFn, githubToken, onError} = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getIssueFn(issueLink, githubToken, onError).then((v) => {
      setIsLoading(false);
      setData(v);
    })
  }, [getIssueFn, githubToken, issueLink, onError])

  if (isLoading) {
    return null;
  }
  if (!data) {
    throw new Error("Loading is complete, but no data was returned.")
  }

  return <GithubIssueLinkBase {...props} data={data}/>

}


