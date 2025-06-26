import { expect, it, describe } from 'vitest'
import { parseGithubPermalinkUrl, parseStackOverflowLink } from "./urlParsers";

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

describe(parseStackOverflowLink, () => {
    it("behaves correctly for basic stackoverflow urls", () => {
        expect(
            parseStackOverflowLink("https://stackoverflow.com/questions/123456/some-question-title")
        ).toEqual({
            "questionId": "123456",
        });
    });

    it("behaves correctly for stackoverflow urls without title", () => {
        expect(
            parseStackOverflowLink("https://stackoverflow.com/questions/123456")
        ).toEqual({
            "questionId": "123456",
        });
    });

    it("behaves correctly for stackoverflow urls with query parameters", () => {
        expect(
            parseStackOverflowLink("https://stackoverflow.com/questions/123456/some-title?noredirect=1&lq=1")
        ).toEqual({
            "questionId": "123456",
        });
    });
});
