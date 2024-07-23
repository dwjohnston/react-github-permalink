import ReactSyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { github, tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export function SyntaxHighlight(props: {
    text: string; 
    isDarkMode: boolean; 
    startingLineNumber: number; 
}) {

    const {isDarkMode, startingLineNumber, text} = props; 

    return <ReactSyntaxHighlighter style={isDarkMode ? tomorrowNight : github} language="javascript" showLineNumbers startingLineNumber={startingLineNumber}>{text}</ReactSyntaxHighlighter>

}
