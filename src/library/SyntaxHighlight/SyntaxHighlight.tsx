"use client";
import ReactSyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { github, tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

const noTheme = {
    "hljs": {
        "display": "block",
        "overflowX": "auto",
        "padding": "0.5em",
        "color": "inherit",
        "background": "inherit",
    },
    "hljs-comment": {
        "color": "inherit",
        "fontStyle": "italic"
    },
    "hljs-quote": {
        "color": "inherit",
        "fontStyle": "italic"
    },
    "hljs-keyword": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-selector-tag": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-subst": {
        "color": "inherit",
        "fontWeight": "normal"
    },
    "hljs-number": {
        "color": "inherit",
    },
    "hljs-literal": {
        "color": "inherit",
    },
    "hljs-variable": {
        "color": "inherit",
    },
    "hljs-template-variable": {
        "color": "inherit",
    },
    "hljs-tag .hljs-attr": {
        "color": "inherit",
    },
    "hljs-string": {
        "color": "inherit",
    },
    "hljs-doctag": {
        "color": "inherit",
    },
    "hljs-title": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-section": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-selector-id": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-type": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-class .hljs-title": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-tag": {
        "color": "inherit",
        "fontWeight": "normal"
    },
    "hljs-name": {
        "color": "inherit",
        "fontWeight": "normal"
    },
    "hljs-attribute": {
        "color": "inherit",
        "fontWeight": "normal"
    },
    "hljs-regexp": {
        "color": "inherit",
    },
    "hljs-link": {
        "color": "inherit",
    },
    "hljs-symbol": {
        "color": "inherit",
    },
    "hljs-bullet": {
        "color": "inherit",
    },
    "hljs-built_in": {
        "color": "inherit",
    },
    "hljs-builtin-name": {
        "color": "inherit",
    },
    "hljs-meta": {
        "color": "inherit",
        "fontWeight": "bold"
    },
    "hljs-deletion": {
        "background": "inherit",
    },
    "hljs-addition": {
        "background": "inherit",
    },
    "hljs-emphasis": {
        "fontStyle": "italic"
    },
    "hljs-strong": {
        "fontWeight": "bold"
    }
} as const


export function SyntaxHighlight(props: {
    text: string;
    startingLineNumber: number;
}) {

    const { startingLineNumber, text } = props;

    const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" })

    // SSR doesn't know what the preferred theme is. 
    // So we have this ready flag, while it's not ready we show an unstyled theme that will inherit style
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, [])


    return <ReactSyntaxHighlighter style={ready ? isDarkMode ? tomorrowNight : github : noTheme} language="javascript" showLineNumbers startingLineNumber={startingLineNumber}>{text}</ReactSyntaxHighlighter>

}
