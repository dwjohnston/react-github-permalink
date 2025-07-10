
import { CaniuseLink } from "../library/CaniuseLink/CaniuseLink";
import { CaniuseLinkBase } from "../library/CaniuseLink/CaniuseLinkBase";
import { GithubPermalinkProvider } from "../library/config/GithubPermalinkContext";
import "../library/GithubPermalink/github-permalink.css";

// Mock data for demonstration
const mockFlexboxData = {
  title: "CSS Flexible Box Layout Module",
  description: "Method of positioning elements in horizontal or vertical stacks. Support includes all properties prefixed with `flex`, as well as `display: flex`, `display: inline-flex`, `align-content`, `align-items`, `align-self`, `justify-content` and `order`.",
  stats: {
    chrome: { "89": "y", "90": "y", "91": "y", "92": "y", "93": "y" },
    firefox: { "84": "y", "85": "y", "86": "y", "87": "y", "88": "y" },
    safari: { "14.0": "y", "14.1": "y", "15.0": "y", "15.1": "y", "15.2": "y" },
    edge: { "89": "y", "90": "y", "91": "y", "92": "y", "93": "y" },
    ie: { "8": "n", "9": "n", "10": "a x", "11": "a" }
  },
  status: "ok" as const
};

export default function Home() {
  return (
    <main>
      <div>
        <h1>React Github Permalink</h1>
        <p>See the <a href="/storybook-static/index.html">Storybook</a></p>
        
        <h2>CaniuseLink Demo</h2>
        <GithubPermalinkProvider>
          <div style={{ margin: "20px 0" }}>
            <h3>Live API Example</h3>
            <CaniuseLink feature="flexbox" />
          </div>
          
          <div style={{ margin: "20px 0" }}>
            <h3>Mock Data Example</h3>
            <CaniuseLinkBase feature="flexbox" data={mockFlexboxData} />
          </div>
          
          <div style={{ margin: "20px 0" }}>
            <h3>Inline Usage</h3>
            <p>
              This layout uses <CaniuseLink feature="flexbox" variant="inline" /> for positioning elements.
            </p>
          </div>
        </GithubPermalinkProvider>
      </div>
    </main>
  );
}
