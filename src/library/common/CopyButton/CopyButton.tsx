"use client"

import { useEffect, useId, useRef, useState } from "react";
import { CopySvg } from "../../images/CopySvg";


export function CopyButton(props: { clipboard: string }) {
    const { clipboard } = props;

    const idCopy = useId();
    const idCopied = useId();

    const copyRef = useRef<HTMLDivElement>(null);
    const [isClicked, setIsClicked] = useState(false);





    return <div className="copy-wrapper">
        <div className="tooltip" id={idCopy} popover="auto" ref={copyRef}>Copy snippet</div>
        <div className="tooltip" id={idCopied} popover="auto">Copied!</div>

        <button 

        className={isClicked? "clicked": "not-clicked"}
        onMouseEnter={() =>{
            copyRef.current?.showPopover()
        }}

        onMouseLeave={(()=>{
            copyRef.current?.hidePopover()
        })}

        popoverTarget={idCopied}
        title="Copy snippet" 
        onClick={() => {
        navigator.clipboard.writeText(clipboard);
        setIsClicked(true);


    }}>
        <CopySvg />
    </button>
    </div>

}