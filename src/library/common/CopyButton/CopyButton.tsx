"use client"

import { CopySvg } from "../../images/CopySvg";


export function CopyButton(props: { clipboard: string }) {
    const { clipboard } = props;
    return <button title="Copy snippet" onClick={() => {
        navigator.clipboard.writeText(clipboard)
    }}>
        <CopySvg />
    </button>
}