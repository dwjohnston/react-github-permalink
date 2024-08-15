"use client"

import {useContext, useEffect, useState } from "react";
import { GithubPermalinkDataResponse, GithubPermalinkContext } from "../config/GithubPermalinkContext";
import { useMediaQuery } from "react-responsive";
import { GithubPermalinkBase } from "./GithubPermalinkBase";

type GithubPermalinkProps = {
  permalink: string;
  className?: string;
};
export function GithubPermalink(props: GithubPermalinkProps) {

  const { permalink, className } = props;
  const [data, setData] = useState(null as null | GithubPermalinkDataResponse)
  const { getDataFn, githubToken, onError } = useContext(GithubPermalinkContext);
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


  return <GithubPermalinkBase className={className} permalink={permalink} data={data}/>
}


