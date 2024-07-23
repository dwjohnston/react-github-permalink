import { BaseConfiguration } from "./BaseConfiguration";
import { defaultGetIssueFn, defaultGetPermalinkFn } from "./defaultFunctions";

const defaultConfiguration = {
  getDataFn: defaultGetPermalinkFn,
  getIssueFn: defaultGetIssueFn,
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

  public getGithubToken() {
    return this.baseConfiguration.githubToken;
  }

  public getOnError() {
    return this.baseConfiguration.onError;
  }
}

export const githubPermalinkRscConfig = new GithubPermalinkRscConfig();
