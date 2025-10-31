import { TypeScriptPlayground } from "@/library/TypeScriptPlayground/TypeScriptPlayground";
import "@/library/GithubPermalink/github-permalink.css";

export default function Home() {
  return (
    <main>
      <div >
        <h1>React Github Permalink</h1>

        <p>This library now supports TypeScript Playground links!</p>

        <h2>Example: TypeScript Playground</h2>
        <TypeScriptPlayground playgroundUrl="https://www.typescriptlang.org/play/?ssl=44&ssc=1&pln=8&pc=1#code/C4TwDgpgBASg9gdwCIENgqgXlhAxnAJwBMAeAZ2AIEsA7AcwBooBXGgaxsRoD4oAyKAG8oVIgC4oFavSgBfANwAoRaEhQAwnAA2zALY1U6EgBV4yNBggAPYBBpEysRIZRNjAaQggo12-cdsXnAAZlCmzha82IKKUHFQgSASHl6x8QR2RBAELhIAFABuKDoQyWYuANopIAC6AJRYvFK0dEqyysGsuMBUcDRQYARwuBBkZMYoAEZaECblFj42mY7z6G6e3r7LCUGh4ebo3HlDCBIAggQEKCBzEYdM+Dr655fXJJpPBha3B65hG9xuA0Yop2spBsNRuMpjM8mk4hUYvFkSJxFAAEQARgATABmdEMeEolASTGElHxSYSJEUlFWUnk2nIpJQbFE5HtDk1JiI9nxRISdEoAl8uIZezZXJQQrFZgQBqYXg0plxAD0qulYBQV10EFsBAaRRKEhoekm2SgAB8hKKUeq6SazdklCr4vbmY7dOaCC7XVB7Zy-RlgMwCP0AAYAEkERrlsnDvopgbiskZcWVKIFGMmIqZ4qyOQs+Vj8saNttyPteS1Or12UNstKUFNXot1ozTPd8XpzadPorbo1Ht7rf7fv9GuTKvVAAUhpACKAoAByKzLqBEOCjZtwYCLKgUKB9KCqaDLlveq1CKA9i-OqAsu8+uTLgB0A7FetDEejJdfVlTX9G1fEB40TFEp1TRR6iUZRlCAA" />

        <br />
        <br />

        See the <a href="/storybook-static/index.html">Storybook</a> for more examples
      </div>
    </main>
  );
}
