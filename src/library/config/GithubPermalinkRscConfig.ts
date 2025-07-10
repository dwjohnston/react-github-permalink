import { BaseConfiguration } from "./BaseConfiguration";
import { defaultGetIssueFn, defaultGetPermalinkFn, defaultGetRepositoryFn } from "./defaultFunctions";

const defaultConfiguration = {
  getDataFn: defaultGetPermalinkFn,
  getIssueFn: defaultGetIssueFn,
  getRepositoryFn: defaultGetRepositoryFn,
};

class GithubPermalinkRscConfig {
  private baseConfiguration: BaseConfiguration = defaultConfiguration;
  public setConfig(options?: Partial<BaseConfiguration>) {
    this.baseConfiguration = {
      ...defaultConfiguration,
      ...(options ?? {}),
    };
  }

  public getConfig() {
    return this.baseConfiguration;
  }

  public getPermalinkFn() {
    return this.baseConfiguration.getDataFn;
  }

  public getIssueFn() {
    return this.baseConfiguration.getIssueFn;
  }

  public getRepositoryFn() {
    return this.baseConfiguration.getRepositoryFn;
  }

  public getGithubToken() {
    return this.baseConfiguration.githubToken;
  }

  public getOnError() {
    return this.baseConfiguration.onError;
  }
}

export const githubPermalinkRscConfig = new GithubPermalinkRscConfig();
