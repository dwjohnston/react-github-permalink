"use client"

import { useContext, useEffect, useState } from "react";
import { GithubPermalinkContext, CaniuseLinkDataResponse } from "../config/GithubPermalinkContext";
import { CaniuseLinkBase, CaniuseLinkBaseProps } from "./CaniuseLinkBase";

type CaniuseLinkProps = Omit<CaniuseLinkBaseProps, "data">;

export function CaniuseLink(props: CaniuseLinkProps) {
  const { feature } = props;
  const [data, setData] = useState(null as null | CaniuseLinkDataResponse);
  const { getCaniuseFn, githubToken, onError } = useContext(GithubPermalinkContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCaniuseFn(feature, githubToken, onError).then((v) => {
      setIsLoading(false);
      setData(v);
    });
  }, [getCaniuseFn, githubToken, feature, onError]);

  if (isLoading) {
    return null;
  }
  if (!data) {
    throw new Error("Loading is complete, but no data was returned.");
  }

  return <CaniuseLinkBase {...props} data={data} />;
}