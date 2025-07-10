import { BaseConfiguration } from "./BaseConfiguration";
import { defaultGetIssueFn, defaultGetPermalinkFn, defaultGetCaniuseFn } from "./defaultFunctions";

const defaultConfiguration = {
  getDataFn: defaultGetPermalinkFn,
  getIssueFn: defaultGetIssueFn,
  getCaniuseFn: defaultGetCaniuseFn,
};

class GithubPermalinkRscConfig {
  private baseConfiguration: BaseConfiguration = defaultConfiguration;
  public setConfig(options?: Partial<BaseConfiguration>) {
    this.baseConfiguration = {
      ...defaultConfiguration,
      ...(options ?? {}),
    };
  }

  public getPermalinkFn() {
    return this.baseConfiguration.getDataFn;
  }

  public getIssueFn() {
    return this.baseConfiguration.getIssueFn;
  }

  public getCaniuseFn() {
    return this.baseConfiguration.getCaniuseFn;
  }

  public getGithubToken() {
    return this.baseConfiguration.githubToken;
  }

  public getOnError() {
    return this.baseConfiguration.onError;
  }
}

export const githubPermalinkRscConfig = new GithubPermalinkRscConfig();
