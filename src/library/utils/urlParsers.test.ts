import { parseGithubPermalinkUrl } from "./urlParsers";

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
