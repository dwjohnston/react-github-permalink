import Image from "next/image";
import styles from "./page.module.css";
import { GithubPermalinkRsc } from "../library/GithubPermalink/GithubPermalinkRsc";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import "../library/GithubPermalink/github-permalink.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>

        <ReactSyntaxHighlighter>
          asd
          asdasd
          asd
        </ReactSyntaxHighlighter>

        <GithubPermalinkRsc permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5" />


      </div>
    </main>
  );
}
