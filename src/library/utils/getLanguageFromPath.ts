import { AvailableLanguagesPrism } from "../SyntaxHighlight/availableLanguagesPrism";

/**
 * Maps file extensions to syntax highlighting languages supported by react-syntax-highlighter
 */
export function getLanguageFromPath(filePath: string): AvailableLanguagesPrism {
    const extension = filePath.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'js':
        case 'jsx':
        case 'mjs':
        case 'cjs':
            return 'javascript';
        case 'ts':
        case 'tsx':
            return 'typescript';
        case 'py':
        case 'python':
            return 'python';
        case 'java':
            return 'java';
        case 'cpp':
        case 'cc':
        case 'cxx':
        case 'c++':
            return 'cpp';
        case 'c':
        case 'h':
            return 'c';
        case 'cs':
            return 'csharp';
        case 'php':
            return 'php';
        case 'rb':
        case 'ruby':
            return 'ruby';
        case 'go':
            return 'go';
        case 'rs':
            return 'rust';
        case 'swift':
            return 'swift';
        case 'kt':
        case 'kts':
            return 'kotlin';
        case 'scala':
            return 'scala';
        case 'sh':
        case 'bash':
            return 'bash';
        case 'ps1':
            return 'powershell';
        case 'sql':
            return 'sql';
        case 'html':
        case 'htm':
            return 'html';
        case 'css':
            return 'css';
        case 'scss':
        case 'sass':
            return 'scss';
        case 'json':
            return 'json';
        case 'xml':
            return 'xml';
        case 'yaml':
        case 'yml':
            return 'yaml';
        case 'md':
        case 'markdown':
            return 'markdown';
        case 'dockerfile':
            return 'dockerfile';
        case 'r':
            return 'r';
        case 'dart':
            return 'dart';
        case 'lua':
            return 'lua';
        case 'perl':
        case 'pl':
            return 'perl';
        case 'vim':
            return 'vim';
        default:
            return 'javascript'; // fallback to javascript for unknown extensions
    }
}