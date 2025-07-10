import { defaultGetPermalinkFn } from "./defaultFunctions";
import { defaultGetIssueFn } from "./defaultFunctions";
import { defaultGetRepositoryFn } from "./defaultFunctions";


export type BaseConfiguration = {
    /**
     * Function to provide permalink data payload 
     */
    getDataFn: typeof defaultGetPermalinkFn;
    
    /** Function to provide issue data payload */
    getIssueFn: typeof defaultGetIssueFn;

    /** Function to provide repository data payload */
    getRepositoryFn: typeof defaultGetRepositoryFn;

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
};


