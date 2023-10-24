# React Github Permalink

A simple React component that given a Github permalink, shows the code block. 

![screenshot of the tool in action](./screenshot.png)

## Demo

https://codesandbox.io/s/exciting-nova-js5zlk?file=/src/App.js

## Usage

```jsx
import { GithubPermalink } from 'react-github-permalink';
import "react-github-permalink/dist/github-permalink.css"; // Or provide your own styles

export function MyApp() {
    return  <GithubPermalink permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"/>
}
```

I also highly rate the [`vscode-copy-github-permalink` plugin](https://marketplace.visualstudio.com/items?itemName=hogashi.vscode-copy-github-permalink) which makes for ease in generating the permalinks from within VSCode.

## Rate Limits and Authentication

This component makes unauthenticated requests against Github's API. The rate limit for such requests is 60/hour and only publicly visible repositories are available. 

If you need to avoid rate limits or allow users to view private repos, you can implement your own data fetching function. 

## Configuration 

You can provide your own data fetching function via a context provider. 

```jsx
import { GithubPermalink, GithubPermalinkContext } from 'react-github-permalink';
import "react-github-permalink/dist/github-permalink.css";

export function MyApp() {
    return <GithubPermalinkContext.Provider value={{getDataFn : (permalink: string) => {
        // Your implementation here
    }}}>  
        <GithubPermalink permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"/>
    </GithubPermalinkContext.Provider>
}    
```

