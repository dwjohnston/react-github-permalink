import type { Meta, StoryObj } from "@storybook/react";

import { GithubPermalinkBase } from "./GithubPermalinkBase";
import "./github-permalink.css";

const meta: Meta<typeof GithubPermalinkBase> = {
    component: GithubPermalinkBase,
};

export default meta;

type Story = StoryObj<typeof GithubPermalinkBase>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: () => (
        <GithubPermalinkBase
            permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
            data={{
                lines: [
                    "package main",
                    "import \"fmt\"",
                    "func main() {",
                    "    fmt.Println(\"hello world\")",
                    "}"
                ],
                lineFrom: 1,
                lineTo: 5,
                commit: "5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                path: "sample_files/sample1.go",
                owner: "dwjohnston",
                repo: "react-github-permalink",
                commitUrl: "https://github.com/dwjohnston/react-github-permalink/commit/5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                status: "ok"
            }} />
    ),
};

export const WithLineExclusions: Story = {
    render: () => (
        <GithubPermalinkBase
            permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
            data={{
                lines: [
                  "a",
                  "b",
                  "c",
                  "d",
                  "e",
                  "f",
                  "g",
                  "h",
                  "i",
                  "j"
                ],
                lineFrom: 101,
                lineTo: 110,
                commit: "5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                path: "sample_files/sample1.go",
                owner: "dwjohnston",
                repo: "react-github-permalink",
                commitUrl: "https://github.com/dwjohnston/react-github-permalink/commit/5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                status: "ok"
            }} 
            excludeLines={[[105, 107]]}
            excludeText="custom exclusion text"
            
            />
    ),
};

const code =`
schemas.forEach(function (schema) {
    for (var ii = 0; ii < schema.length; ++ii) {
      var type = schema[ii]
      if (!types[type]) throw unknownType(ii, type)
    }
    if (/E.*E/.test(schema)) throw moreThanOneError(schema)
    addSchema(schema, arity)
    if (/E/.test(schema)) {
      addSchema(schema.replace(/E.*$/, 'E'), arity)
      addSchema(schema.replace(/E/, 'Z'), arity)
      if (schema.length === 1) addSchema('', arity)
    }
  })
`

export const WithLineExclusionsRealCode: Story = {
    render: () => (
        <GithubPermalinkBase
            permalink="https://github.com/dwjohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
            data={{
                lines: code.split('\n'),
                lineFrom: 101,
                lineTo: 110,
                commit: "5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                path: "sample_files/sample1.go",
                owner: "dwjohnston",
                repo: "react-github-permalink",
                commitUrl: "https://github.com/dwjohnston/react-github-permalink/commit/5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                status: "ok"
            }} 
            excludeLines={[[105, 107]]}
            excludeText="// snip"
            
            />
    ),
};