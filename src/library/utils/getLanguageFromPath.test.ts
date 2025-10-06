import { describe, it, expect } from 'vitest';
import { getLanguageFromPath } from './getLanguageFromPath';

describe('getLanguageFromPath', () => {
    it('should return typescript for .tsx files', () => {
        expect(getLanguageFromPath('ReactRenders3.tsx')).toBe('typescript');
    });

    it('should return typescript for .ts files', () => {
        expect(getLanguageFromPath('component.ts')).toBe('typescript');
    });

    it('should return javascript for .js files', () => {
        expect(getLanguageFromPath('script.js')).toBe('javascript');
    });

    it('should return javascript for .jsx files', () => {
        expect(getLanguageFromPath('component.jsx')).toBe('javascript');
    });

    it('should return python for .py files', () => {
        expect(getLanguageFromPath('script.py')).toBe('python');
    });

    it('should return go for .go files', () => {
        expect(getLanguageFromPath('main.go')).toBe('go');
    });

    it('should return html for .html files', () => {
        expect(getLanguageFromPath('index.html')).toBe('html');
    });

    it('should return css for .css files', () => {
        expect(getLanguageFromPath('styles.css')).toBe('css');
    });

    it('should return json for .json files', () => {
        expect(getLanguageFromPath('package.json')).toBe('json');
    });

    it('should return markdown for .md files', () => {
        expect(getLanguageFromPath('README.md')).toBe('markdown');
    });

    it('should return yaml for .yaml files', () => {
        expect(getLanguageFromPath('config.yaml')).toBe('yaml');
    });

    it('should return yaml for .yml files', () => {
        expect(getLanguageFromPath('config.yml')).toBe('yaml');
    });

    it('should return javascript as fallback for unknown extensions', () => {
        expect(getLanguageFromPath('file.unknown')).toBe('text');
    });

    it('should return javascript as fallback for files without extension', () => {
        expect(getLanguageFromPath('asdf')).toBe('text');
    });

    it('should handle paths with multiple dots', () => {
        expect(getLanguageFromPath('src/components/MyComponent.tsx')).toBe('typescript');
    });

    it('should handle case insensitive extensions', () => {
        expect(getLanguageFromPath('Component.TSX')).toBe('typescript');
        expect(getLanguageFromPath('Script.JS')).toBe('javascript');
    });
});