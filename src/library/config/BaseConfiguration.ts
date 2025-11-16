import { defaultGetPermalinkFn } from "./defaultFunctions";
import { defaultGetIssueFn } from "./defaultFunctions";


export type BaseConfiguration = {
    /**
     * Function to provide permalink data payload 
     */
    getDataFn: typeof defaultGetPermalinkFn;
    
    /** Function to provide issue data payload */
    getIssueFn: typeof defaultGetIssueFn;

    /**
     * A github personal access token - will be passed to the data fetching functions
     */
    githubToken?: string;


    /**
     * If an error occurs while fetching the data this function will be called. 
     * You can use this to report to Sentry etc
     * @param e 
     * @returns 
     */
    onError?: (e: unknown) => void;

    /**
     * Default value for whether GitHub permalinks should be initially expanded.
     * When false, permalinks will be collapsed by default showing only the code block.
     * Default: true
     */
    initiallyExpandGithubPermalinks?: boolean;
};


