import { defaultGetPermalinkFn } from "./defaultFunctions";
import { defaultGetIssueFn } from "./defaultFunctions";


export type BaseConfiguration = {
    getDataFn: typeof defaultGetPermalinkFn;
    getIssueFn: typeof defaultGetIssueFn;
    githubToken?: string;
    onError?: (e: unknown) => void;
};
