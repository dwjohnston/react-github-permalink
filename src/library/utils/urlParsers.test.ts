import { expect, test, it, describe } from 'vitest'
import { parseGithubPermalinkUrl, parseTypeScriptPlaygroundUrl } from "./urlParsers";

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

describe(parseTypeScriptPlaygroundUrl, () => {
    it("parses TypeScript playground URL with line numbers", () => {
        expect(
            parseTypeScriptPlaygroundUrl(
                "https://www.typescriptlang.org/play/?ssl=44&ssc=1&pln=8&pc=1#code/C4TwDgpgBASg9gdwCIENgqgXlhAxnAJwBMAeAZ2AIEsA7AcwBooBXGgaxsRoD4oAyKAG8oVIgC4oFavSgBfANwAoRaEhQAwnAA2zALY1U6EgBV4yNBggAPYBBpEysRIZRNjAaQggo12-cdsXnAAZlCmzha82IKKUHFQgSASHl6x8QR2RBAELhIAFABuKDoQyWYuANopIAC6AJRYvFK0dEqyysGsuMBUcDRQYARwuBBkZMYoAEZaECblFj42mY7z6G6e3r7LCUGh4ebo3HlDCBIAggQEKCBzEYdM+Dr655fXJJpPBha3B65hG9xuA0Yop2spBsNRuMpjM8mk4hUYvFkSJxFAAEQARgATABmdEMeEolASTGElHxSYSJEUlFWUnk2nIpJQbFE5HtDk1JiI9nxRISdEoAl8uIZezZXJQQrFZgQBqYXg0plxAD0qulYBQV10EFsBAaRRKEhoekm2SgAB8hKKUeq6SazdklCr4vbmY7dOaCC7XVB7Zy-RlgMwCP0AAYAEkERrlsnDvopgbiskZcWVKIFGMmIqZ4qyOQs+Vj8saNttyPteS1Or12UNstKUFNXot1ozTPd8XpzadPorbo1Ht7rf7fv9GuTKvVAAUhpACKAoAByKzLqBEOCjZtwYCLKgUKB9KCqaDLlveq1CKA9i-OqAsu8+uTLgB0A7FetDEejJdfVlTX9G1fEB40TFEp1TRR6iUZRlCAA"
            )
        ).toEqual({
            code: "C4TwDgpgBASg9gdwCIENgqgXlhAxnAJwBMAeAZ2AIEsA7AcwBooBXGgaxsRoD4oAyKAG8oVIgC4oFavSgBfANwAoRaEhQAwnAA2zALY1U6EgBV4yNBggAPYBBpEysRIZRNjAaQggo12-cdsXnAAZlCmzha82IKKUHFQgSASHl6x8QR2RBAELhIAFABuKDoQyWYuANopIAC6AJRYvFK0dEqyysGsuMBUcDRQYARwuBBkZMYoAEZaECblFj42mY7z6G6e3r7LCUGh4ebo3HlDCBIAggQEKCBzEYdM+Dr655fXJJpPBha3B65hG9xuA0Yop2spBsNRuMpjM8mk4hUYvFkSJxFAAEQARgATABmdEMeEolASTGElHxSYSJEUlFWUnk2nIpJQbFE5HtDk1JiI9nxRISdEoAl8uIZezZXJQQrFZgQBqYXg0plxAD0qulYBQV10EFsBAaRRKEhoekm2SgAB8hKKUeq6SazdklCr4vbmY7dOaCC7XVB7Zy-RlgMwCP0AAYAEkERrlsnDvopgbiskZcWVKIFGMmIqZ4qyOQs+Vj8saNttyPteS1Or12UNstKUFNXot1ozTPd8XpzadPorbo1Ht7rf7fv9GuTKvVAAUhpACKAoAByKzLqBEOCjZtwYCLKgUKB9KCqaDLlveq1CKA9i-OqAsu8+uTLgB0A7FetDEejJdfVlTX9G1fEB40TFEp1TRR6iUZRlCAA",
            startLine: 44,
            startColumn: 1,
            endLine: 8,
            endColumn: 1,
        });
    });

    it("parses TypeScript playground URL without line numbers", () => {
        expect(
            parseTypeScriptPlaygroundUrl(
                "https://www.typescriptlang.org/play/#code/PTAEAEFMCdoe2gZwFygEwGY"
            )
        ).toEqual({
            code: "PTAEAEFMCdoe2gZwFygEwGY",
            startLine: undefined,
            startColumn: undefined,
            endLine: undefined,
            endColumn: undefined,
        });
    });

    it("throws error for invalid TypeScript playground URL", () => {
        expect(() => parseTypeScriptPlaygroundUrl(
            "https://example.com/play/#code/abc123"
        )).toThrow("Invalid TypeScript playground URL");
    });

    it("throws error for TypeScript playground URL without code", () => {
        expect(() => parseTypeScriptPlaygroundUrl(
            "https://www.typescriptlang.org/play/"
        )).toThrow("No code found in TypeScript playground URL");
    });
});
