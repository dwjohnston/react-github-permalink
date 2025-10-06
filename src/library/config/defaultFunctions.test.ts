import { describe, it, expect } from 'vitest';

/**
 * This is a copy of the helper function from defaultFunctions.ts for testing purposes.
 */
function decodeBase64WithUTF8(base64: string): string {
    const cleanedBase64 = base64.replace(/\s/g, '');
    const binaryString = atob(cleanedBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
}

describe('Base64 UTF-8 Decoding', () => {
    it('should correctly decode base64 with ASCII text', () => {
        // Simple ASCII text
        const text = 'Hello World';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        
        const result = decodeBase64WithUTF8(base64);
        expect(result).toBe(text);
    });

    it('should correctly decode base64 with emoji', () => {
        // Text with emoji - the actual issue from GitHub
        const text = '// 👇 Check this out';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        
        const result = decodeBase64WithUTF8(base64);
        expect(result).toBe(text);
        expect(result).toContain('👇');
    });

    it('should correctly decode base64 with pointing up emoji', () => {
        // The specific emoji mentioned in the user's comment
        const text = '☝️';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        
        const result = decodeBase64WithUTF8(base64);
        expect(result).toBe(text);
    });

    it('should correctly decode base64 with multiple emojis', () => {
        const text = '👍 👎 😕 ❤️ 🎉';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        
        const result = decodeBase64WithUTF8(base64);
        expect(result).toBe(text);
    });

    it('should correctly decode base64 with mixed content', () => {
        const text = 'export function Example() {\n    // 👇 This is a comment\n    return <div>Hello</div>;\n}';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        
        const result = decodeBase64WithUTF8(base64);
        expect(result).toBe(text);
        expect(result).toContain('👇');
    });

    it('should handle base64 with whitespace (as GitHub API might return)', () => {
        const text = 'Test 👍';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        const base64WithWhitespace = base64.slice(0, 5) + '\n' + base64.slice(5);
        
        const result = decodeBase64WithUTF8(base64WithWhitespace);
        expect(result).toBe(text);
    });

    it('should match the deprecated escape/unescape pattern behavior', () => {
        // Verify our solution gives the same result as the deprecated method
        const text = '// 👇 This is a comment with emoji';
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const binaryString = String.fromCharCode(...bytes);
        const base64 = btoa(binaryString);
        
        const modernResult = decodeBase64WithUTF8(base64);
        
        // The deprecated pattern: decodeURIComponent(escape(atob(base64)))
        // escape() converts the incorrectly-decoded UTF-8 bytes to percent-encoding
        // decodeURIComponent() then interprets those percent-encoded bytes as UTF-8
        const deprecatedResult = decodeURIComponent(escape(atob(base64)));
        
        expect(modernResult).toBe(deprecatedResult);
        expect(modernResult).toBe(text);
    });
});
