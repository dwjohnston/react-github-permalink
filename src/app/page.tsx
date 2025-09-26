
export default function Home() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>React Github Permalink</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#666' }}>
          Display Github permalinks as codeblocks and Github issue links in your React applications.
        </p>

        {/* Screenshots */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <img src="/screenshot-permalink-dark.png" alt="Github Permalink in dark mode" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
          <img src="/screenshot-permalink-light.png" alt="Github Permalink in light mode" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
        </div>

        {/* Installation */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>📦 Installation</h2>
          <div style={{ backgroundColor: '#f6f8fa', padding: '1rem', borderRadius: '8px', border: '1px solid #d0d7de' }}>
            <code style={{ fontSize: '1.1rem' }}>npm install react-github-permalink</code>
          </div>
          <p style={{ marginTop: '0.5rem', color: '#666' }}>
            Also install the peer dependency: <code style={{ backgroundColor: '#f6f8fa', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>npm install react</code>
          </p>
        </section>

        {/* RSC Instructions */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>⚛️ React Server Components (RSC)</h2>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            This package is compatible with Next.js 13+ and offers three variants of each component:
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '1.5rem', color: '#666' }}>
            <li><strong>GithubPermalink/GithubIssueLink</strong> - Client component that fetches data in useEffect</li>
            <li><strong>GithubPermalinkBase/GithubIssueLinkBase</strong> - Base component with no data fetching</li>
            <li><strong>GithubPermalinkRsc/GithubIssueLinkRsc</strong> - React Server Component</li>
          </ul>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Client Component Usage</h3>
          <div style={{ backgroundColor: '#f6f8fa', padding: '1rem', borderRadius: '8px', border: '1px solid #d0d7de', marginBottom: '1.5rem' }}>
            <pre style={{ margin: 0, overflow: 'auto' }}><code>{`import { GithubPermalink } from 'react-github-permalink';
import "react-github-permalink/dist/github-permalink.css";

export function MyApp() {
  return (
    <GithubPermalink 
      permalink="https://github.com/dwjohnston/react-github-permalink/blob/main/sample_files/sample1.go#L1-L5"
    />
  );
}`}</code></pre>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>RSC Usage</h3>
          <div style={{ backgroundColor: '#f6f8fa', padding: '1rem', borderRadius: '8px', border: '1px solid #d0d7de', marginBottom: '1.5rem' }}>
            <pre style={{ margin: 0, overflow: 'auto' }}><code>{`import { GithubPermalinkRsc } from 'react-github-permalink/dist/rsc';
import "react-github-permalink/dist/github-permalink.css";

export function MyApp() {
  return (
    <GithubPermalinkRsc 
      permalink="https://github.com/dwjohnston/react-github-permalink/blob/main/sample_files/sample1.go#L1-L5"
    />
  );
}`}</code></pre>
          </div>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Base Component with Custom Data</h3>
          <div style={{ backgroundColor: '#f6f8fa', padding: '1rem', borderRadius: '8px', border: '1px solid #d0d7de' }}>
            <pre style={{ margin: 0, overflow: 'auto' }}><code>{`import { GithubPermalinkBase } from 'react-github-permalink';
import "react-github-permalink/dist/github-permalink.css";

export function MyApp() {
  return (
    <GithubPermalinkBase
      permalink="https://github.com/dwjohnston/react-github-permalink/blob/main/sample_files/sample1.go#L1-L5"
      data={{
        lines: [
          "package main",
          "import \\"fmt\\"",
          "func main() {",
          "    fmt.Println(\\"hello world\\")",
          "}"
        ],
        lineFrom: 1,
        lineTo: 5,
        commit: "5b15aa07e60af4e317086f391b28cadf9aae8e1b",
        path: "sample_files/sample1.go",
        owner: "dwjohnston",
        repo: "react-github-permalink",
        status: "ok"
      }}
    />
  );
}`}</code></pre>
          </div>
        </section>

        {/* Demo Usage */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>🚀 Demo Usage</h2>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            Try out the components in this interactive CodeSandbox demo:
          </p>
          <a 
            href="https://codesandbox.io/s/exciting-nova-js5zlk?file=/src/App.js" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block', 
              backgroundColor: '#0969da', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '6px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}
          >
            🔗 Open Interactive Demo
          </a>

          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Issue Links</h3>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            You can also display GitHub issue links with status and reactions:
          </p>
          <div style={{ backgroundColor: '#f6f8fa', padding: '1rem', borderRadius: '8px', border: '1px solid #d0d7de', marginBottom: '1rem' }}>
            <pre style={{ margin: 0, overflow: 'auto' }}><code>{`import { GithubIssueLink } from 'react-github-permalink';

// Block variant (default)
<GithubIssueLink issueLink="https://github.com/dwjohnston/react-github-permalink/issues/2" />

// Inline variant
<GithubIssueLink 
  issueLink="https://github.com/dwjohnston/react-github-permalink/issues/2" 
  variant="inline"
/>`}</code></pre>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <img src="/screenshot-issuelink-dark.png" alt="Issue Link in dark mode" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
            <img src="/screenshot-issuelink-light.png" alt="Issue Link in light mode" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
          </div>
        </section>

        {/* Links */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>📚 Resources</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <a 
              href="/storybook-static/index.html"
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#ff4785', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                textDecoration: 'none', 
                fontWeight: 'bold'
              }}
            >
              📖 View Storybook
            </a>
            <a 
              href="https://github.com/dwjohnston/ultimate-react-package-template"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-block', 
                backgroundColor: '#21262d', 
                color: 'white', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '6px', 
                textDecoration: 'none', 
                fontWeight: 'bold'
              }}
            >
              🛠️ Package Template
            </a>
          </div>
        </section>

        {/* Features */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>✨ Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#f6f8fa', borderRadius: '8px', border: '1px solid #d0d7de' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#333' }}>🎨 Syntax Highlighting</h3>
              <p style={{ color: '#666', margin: 0 }}>Beautiful code highlighting with automatic language detection</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f6f8fa', borderRadius: '8px', border: '1px solid #d0d7de' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#333' }}>🌙 Dark Mode</h3>
              <p style={{ color: '#666', margin: 0 }}>Automatic dark/light mode support based on user preference</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f6f8fa', borderRadius: '8px', border: '1px solid #d0d7de' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#333' }}>📱 Responsive</h3>
              <p style={{ color: '#666', margin: 0 }}>Mobile-friendly design that works on all screen sizes</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f6f8fa', borderRadius: '8px', border: '1px solid #d0d7de' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#333' }}>⚡ RSC Compatible</h3>
              <p style={{ color: '#666', margin: 0 }}>Full support for React Server Components in Next.js 13+</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f6f8fa', borderRadius: '8px', border: '1px solid #d0d7de' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#333' }}>📋 Copy to Clipboard</h3>
              <p style={{ color: '#666', margin: 0 }}>One-click copying of code snippets</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f6f8fa', borderRadius: '8px', border: '1px solid #d0d7de' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#333' }}>🔗 Issue Links</h3>
              <p style={{ color: '#666', margin: 0 }}>Display GitHub issues with status, reactions, and metadata</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #d0d7de', textAlign: 'center', color: '#666' }}>
          <p>
            Built with ❤️ by{' '}
            <a href="https://github.com/dwjohnston" target="_blank" rel="noopener noreferrer" style={{ color: '#0969da' }}>
              @dwjohnston
            </a>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Recommended: Use the{' '}
            <a 
              href="https://marketplace.visualstudio.com/items?itemName=hogashi.vscode-copy-github-permalink" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#0969da' }}
            >
              vscode-copy-github-permalink
            </a>
            {' '}plugin for easy permalink generation in VS Code.
          </p>
        </footer>
      </div>
    </main>
  );
}
