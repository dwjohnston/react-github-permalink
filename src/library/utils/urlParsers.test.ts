import { expect, test, it, describe } from 'vitest'
import { parseGithubPermalinkUrl, parseGithubPRLink } from "./urlParsers";

describe(parseGithubPermalinkUrl, () => {
    it("behaves correctly for correct urls", () => {
        expect(
            parseGithubPermalinkUrl(
                "https://github.com/djohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1-L5"
            )
        ).toEqual(
            {
                "commit": "5b15aa07e60af4e317086f391b28cadf9aae8e1b",
                "lineFrom": 1,
                "lineTo": 5,
                "owner": "djohnston",
                "path": "sample_files/sample1.go",
                "repo": "react-github-permalink",
            }
        );
    });

    it("behaves for single line permalinks", () => {
        expect(parseGithubPermalinkUrl(
            "https://github.com/djohnston/react-github-permalink/blob/5b15aa07e60af4e317086f391b28cadf9aae8e1b/sample_files/sample1.go#L1"
        )).toEqual({
            "commit": "5b15aa07e60af4e317086f391b28cadf9aae8e1b",
            "lineFrom": 1,
            "lineTo": 1,
            "owner": "djohnston",
            "path": "sample_files/sample1.go",
            "repo": "react-github-permalink",
        })
    })
});

describe(parseGithubPRLink, () => {
    it("behaves correctly for correct PR URLs", () => {
        expect(
            parseGithubPRLink(
                "https://github.com/facebook/react/pull/24652"
            )
        ).toEqual(
            {
                "owner": "facebook",
                "repo": "react",
                "pr": "24652",
            }
        );
    });

    it("behaves correctly for http PR URLs", () => {
        expect(
            parseGithubPRLink(
                "http://github.com/facebook/react/pull/12345"
            )
        ).toEqual(
            {
                "owner": "facebook",
                "repo": "react",
                "pr": "12345",
            }
        );
    });

    it("throws error for issue URLs", () => {
        expect(() => parseGithubPRLink(
            "https://github.com/facebook/react/issues/24652"
        )).toThrow("Invalid PR link URL");
    });

    it("throws error for invalid URLs", () => {
        expect(() => parseGithubPRLink(
            "https://github.com/facebook/react/blob/main/src/index.js"
        )).toThrow("Invalid PR link URL");
    });
});
