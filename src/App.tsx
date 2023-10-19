import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GithubPermalink } from './GithubPermalink/GithubPermalink';

function App() {
  return (
    <div className="App">
      <GithubPermalink permalink='https://github.com/dwjohnston/blacksheepcode/blob/b9b4a4abef9a429cb27a4ba084da7f0ccc105f7d/app/routes/posts.tsx#L5-L13'/>
      <GithubPermalink permalink='https://github.com/dwjohnston/my-private-repo/blob/a053a5e05eb3793b7e217af0facbd2b336517cb9/file.md#L1-L2'/>

    </div>
  );
}

export default App;
