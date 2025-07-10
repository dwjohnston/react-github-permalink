import { PropsWithChildren } from "react";
import { CaniuseLinkDataResponse } from "../config/GithubPermalinkContext";
import { ErrorMessages } from "../ErrorMessages/ErrorMessages";

export type CaniuseLinkBaseProps = {
  className?: string;
  feature: string;
  data: CaniuseLinkDataResponse;
  variant?: "inline" | "block";
}

export function CaniuseLinkBase(props: CaniuseLinkBaseProps) {
  const { data, variant = "block", feature } = props;

  if (variant === "inline") {
    if (data.status === "ok") {
      return (
        <span className="react-caniuse-inline">
          <a href={`https://caniuse.com/${feature}`} target="_blank" rel="noopener noreferrer">
            {data.title}
          </a>
        </span>
      );
    } else {
      return (
        <span className="react-caniuse-inline">
          <a href={`https://caniuse.com/${feature}`} target="_blank" rel="noopener noreferrer">
            {feature}
          </a>
        </span>
      );
    }
  }

  if (data.status === "ok") {
    return (
      <CaniuseLinkInner {...props} header={
        <div className="react-caniuse-header">
          <div className="react-caniuse-title">
            <h3>{data.title}</h3>
            <a href={`https://caniuse.com/${feature}`} target="_blank" rel="noopener noreferrer" className="react-caniuse-link">
              View on caniuse.com
            </a>
          </div>
          {data.description && (
            <p className="react-caniuse-description">{data.description}</p>
          )}
        </div>
      }>
        <div className="react-caniuse-table">
          <div className="react-caniuse-browsers">
            {Object.entries(data.stats).map(([browser, versions]) => (
              <div key={browser} className="react-caniuse-browser">
                <div className="react-caniuse-browser-name">
                  {getBrowserName(browser)}
                </div>
                <div className="react-caniuse-versions">
                  {Object.entries(versions).slice(-5).map(([version, support]) => (
                    <div 
                      key={version} 
                      className={`react-caniuse-version ${getSupportClass(support)}`}
                      title={getSupportTitle(support)}
                    >
                      {version}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CaniuseLinkInner>
    );
  }

  return (
    <CaniuseLinkInner {...props}>
      <ErrorMessages data={data} />
    </CaniuseLinkInner>
  );
}

function CaniuseLinkInner(props: PropsWithChildren<{
  header?: React.ReactNode
} & {
  feature: string;
  className?: string;
}>) {
  const { feature, className = '' } = props;
  const caniuseUrl = `https://caniuse.com/${feature}`;

  return (
    <div className={`rgp-base react-caniuse-link ${className}`}>
      <div className="header">
        {props.header ?? <a href={caniuseUrl} className="file-link" target="_blank" rel="noopener noreferrer">{feature}</a>}
      </div>
      {props.children}
    </div>
  );
}

function getBrowserName(browser: string): string {
  const browserNames: Record<string, string> = {
    chrome: "Chrome",
    firefox: "Firefox",
    safari: "Safari",
    edge: "Edge",
    ie: "IE",
    opera: "Opera",
    ios_saf: "iOS Safari",
    and_chr: "Android Chrome",
    and_ff: "Android Firefox",
    samsung: "Samsung Internet"
  };
  return browserNames[browser] || browser;
}

function getSupportClass(support: string): string {
  if (support === "y") return "supported";
  if (support === "n") return "not-supported";
  if (support.startsWith("a")) return "partial";
  return "unknown";
}

function getSupportTitle(support: string): string {
  if (support === "y") return "Supported";
  if (support === "n") return "Not supported";
  if (support.startsWith("a")) return "Partial support";
  return "Unknown support";
}