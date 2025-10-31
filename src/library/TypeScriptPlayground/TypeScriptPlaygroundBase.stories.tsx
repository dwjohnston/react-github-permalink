import type { Meta, StoryObj } from "@storybook/react";

import { TypeScriptPlaygroundBase } from "./TypeScriptPlaygroundBase";
import "../GithubPermalink/github-permalink.css";

const meta: Meta<typeof TypeScriptPlaygroundBase> = {
  component: TypeScriptPlaygroundBase,
};

export default meta;

type Story = StoryObj<typeof TypeScriptPlaygroundBase>;

export const WithData: Story = {
  render: () => (
    <TypeScriptPlaygroundBase 
      playgroundUrl="https://www.typescriptlang.org/play/#code/PTAEAEFMCdoe2gZwFygEwGYAsBWAUAJYB2ALgKYBG0A7AC4CeADgE4mgA0oA3pKKK2JACUQgL5A"
      data={{
        lines: [
          "const message: string = 'Hello, TypeScript!';",
          "console.log(message);"
        ],
        startLine: 1,
        endLine: 2,
        status: "ok"
      }}
    />
  ),
};

export const ErrorState: Story = {
  render: () => (
    <TypeScriptPlaygroundBase 
      playgroundUrl="https://www.typescriptlang.org/play/#code/invalid"
      data={{
        status: "other-error"
      }}
    />
  ),
};

export const LongCode: Story = {
  render: () => (
    <TypeScriptPlaygroundBase 
      playgroundUrl="https://www.typescriptlang.org/play/?ssl=44&ssc=1&pln=8&pc=1#code/C4TwDgpgBASg9gdwCIENgqgXlhAxnAJwBMAeAZ2AIEsA7AcwBooBXGgaxsRoD4oAyKAG8oVIgC4oFavSgBfANwAoRaEhQAwnAA2zALY1U6EgBV4yNBggAPYBBpEysRIZRNjAaQggo12-cdsXnAAZlCmzha82IKKUHFQgSASHl6x8QR2RBAELhIAFABuKDoQyWYuANopIAC6AJRYvFK0dEqyysGsuMBUcDRQYARwuBBkZMYoAEZaECblFj42mY7z6G6e3r7LCUGh4ebo3HlDCBIAggQEKCBzEYdM+Dr655fXJJpPBha3B65hG9xuA0Yop2spBsNRuMpjM8mk4hUYvFkSJxFAAEQARgATABmdEMeEolASTGElHxSYSJEUlFWUnk2nIpJQbFE5HtDk1JiI9nxRISdEoAl8uIZezZXJQQrFZgQBqYXg0plxAD0qulYBQV10EFsBAaRRKEhoekm2SgAB8hKKUeq6SazdklCr4vbmY7dOaCC7XVB7Zy-RlgMwCP0AAYAEkERrlsnDvopgbiskZcWVKIFGMmIqZ4qyOQs+Vj8saNttyPteS1Or12UNstKUFNXot1ozTPd8XpzadPorbo1Ht7rf7fv9GuTKvVAAUhpACKAoAByKzLqBEOCjZtwYCLKgUKB9KCqaDLlveq1CKA9i-OqAsu8+uTLgB0A7FetDEejJdfVlTX9G1fEB40TFEp1TRR6iUZRlCAA"
      data={{
        lines: [
          "type RowData = Record<string, unknown> & { id: string };",
          "",
          "type ColumnData<TRowData extends RowData, TKey extends keyof TRowData> = {",
          "    key: TKey",
          "    renderData: (value: TRowData[TKey]) => string;",
          "}",
          "",
          "function processTable<TRowData extends RowData, TKey extends keyof TRowData>(row: Array<TRowData>, column: Array<ColumnData<TRowData, TKey>>) {",
          "",
          "}",
          "",
          "",
          "processTable(",
          "    [{",
          "        id: \"123\",",
          "        a: 1,",
          "        b: {",
          "            x: 1,",
          "            y: 2",
          "        }",
          "    }], [{",
          "        key: \"a\",",
          "        renderData: (value) => {",
          "            // (parameter) value: number | {",
          "            //     x: number;",
          "            //     y: number;",
          "            // }",
          "            return `${value}`;",
          "        }",
          "    },",
          "    {",
          "        key: \"b\",",
          "        renderData: (value) => {",
          "",
          "            // (parameter) value: number | {",
          "            //     x: number;",
          "            //     y: number;",
          "            // }",
          "            //Property 'x' does not exist on type 'number | { x: number; y: number; }'.",
          "            return `${value.x},${value.y}`;",
          "        }",
          "    },",
          "]);"
        ],
        startLine: 44,
        endLine: 8,
        status: "ok"
      }}
    />
  ),
};
