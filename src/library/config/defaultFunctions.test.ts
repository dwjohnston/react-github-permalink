import { describe, it, expect } from 'vitest';
import { decodeBase64WithUTF8 } from './defaultFunctions';

describe('Base64 UTF-8 Decoding', () => {
    it('should match the deprecated escape/unescape pattern behavior', () => {
        const text = '// 👇 This is a comment with emoji';

        // We're using the deprecated pattern for a sanity check to see that the AI generated version is correct.
        const deprecatedEncodedString = btoa(unescape(encodeURIComponent(text)));

        // Verify our solution gives the same result as the deprecated method
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);


        expect(deprecatedEncodedString).toBe(base64);
        const modernResult = decodeBase64WithUTF8(base64);

        // The deprecated pattern: decodeURIComponent(escape(atob(base64)))
        // escape() converts the incorrectly-decoded UTF-8 bytes to percent-encoding
        // decodeURIComponent() then interprets those percent-encoded bytes as UTF-8
        const deprecatedResult = decodeURIComponent(escape(atob(base64)));

        expect(modernResult).toBe(deprecatedResult);
        expect(modernResult).toBe(text);
    });
});
