"use client"

import {  useContext, useEffect, useState } from "react";

import {  GithubPermalinkContext, GithubIssueLinkDataResponse } from "../config/GithubPermalinkContext";
import { GithubIssueLinkBase } from "./GithubIssueLinkBase";

type GithubIssueLinkProps = {
  issueLink: string;
  className?: string;
};
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

  return <GithubIssueLinkBase issueLink={issueLink} data={data} className={props.className}/>

}


