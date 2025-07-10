"use client"

import {  useContext, useEffect, useState } from "react";

import {  GithubPermalinkContext, GithubPRLinkDataResponse } from "../config/GithubPermalinkContext";
import { GithubPRLinkBase, GithubPRLinkBaseProps } from "./GithubPRLinkBase";

type GithubPRLinkProps = Omit<GithubPRLinkBaseProps, "data">;

export function GithubPRLink(props: GithubPRLinkProps) {

  const { prLink } = props;
  const [data, setData] = useState(null as null | GithubPRLinkDataResponse)
  const { getPRFn, githubToken, onError} = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPRFn(prLink, githubToken, onError).then((v) => {
      setIsLoading(false);
      setData(v);
    })
  }, [getPRFn, githubToken, prLink, onError])

  if (isLoading) {
    return null;
  }
  if (!data) {
    throw new Error("Loading is complete, but no data was returned.")
  }

  return <GithubPRLinkBase {...props} data={data}/>

}