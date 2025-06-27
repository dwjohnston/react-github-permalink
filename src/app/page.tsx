import Image from "next/image";
import styles from "./page.module.css";
import { GithubPermalinkRsc } from "../library/GithubPermalink/GithubPermalinkRsc";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import "../library/GithubPermalink/github-permalink.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>React Github Permalink</h1>


        See the <a href="/storybook-static/index.html">Storybook</a>
      </div>
    </main>
  );
}
