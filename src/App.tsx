import React from 'react';
import logo from './logo.svg';
import { GithubPermalink } from './GithubPermalink/GithubPermalink';

import "./GithubPermalink/github-permalink.css";
import "./App.css";


const links = [{
  link: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
},
{
  link: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.js#L5-L23"
},
{
  link: "https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.sql#L5-L21"
}
]

function App() {
  return (
    <div className="App">
      
      {links.map((v) => <GithubPermalink permalink={v.link}/>)}
    </div>
  );
}

export default App;
