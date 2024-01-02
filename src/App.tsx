import React from 'react';
import logo from './logo.svg';
import { GithubPermalink,  } from './GithubPermalink/GithubPermalink';
import {GithubPermalinkProvider} from "./GithubPermalinkContext"; 

import "./GithubPermalink/github-permalink.css";
import "./App.css";


const links = [
  {
  link: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
},
{
  link: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.js#L5-L23"
},
{
  link: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.sql#L5-L21"
}, 
{
  link: "https://github.com/dwjohnston/blacksheepcode/blob/69005aa52d9b80ba81904fc6012d5afcc1889bc6/remix.config.js#L13-L23", 

}, {
  link: "https://github.com/dwjohnston/blacksheepcode/blob/020ff44a2b20db79aab9b47f04ccc91554a26056/tsconfig.json#L10-L11"
}
]

function App() {
  return (
    <div className="App">
      <GithubPermalinkProvider githubToken={process.env.REACT_APP_GITHUB_TOKEN}>
      {links.map((v) => <GithubPermalink permalink={v.link}/>)}
      </GithubPermalinkProvider>
    </div>
  );
}

export default App;
