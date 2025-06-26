"use client"

import {  useContext, useEffect, useState } from "react";

import {  GithubPermalinkContext, StackOverflowLinkDataResponse } from "../config/GithubPermalinkContext";
import { StackOverflowLinkBase, StackOverflowLinkBaseProps } from "./StackOverflowLinkBase";

type StackOverflowLinkProps = Omit<StackOverflowLinkBaseProps, "data">;

export function StackOverflowLink(props: StackOverflowLinkProps) {

  const { questionLink } = props;
  const [data, setData] = useState(null as null | StackOverflowLinkDataResponse)
  const { getStackOverflowFn, onError} = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStackOverflowFn(questionLink, onError).then((v) => {
      setIsLoading(false);
      setData(v);
    })
  }, [getStackOverflowFn, questionLink, onError])

  if (isLoading) {
    return null;
  }
  if (!data) {
    throw new Error("Loading is complete, but no data was returned.")
  }

  return <StackOverflowLinkBase {...props} data={data}/>

}
