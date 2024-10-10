"use client"

import { useEffect, useId, useRef, useState } from "react";
import { CopySvg } from "../../images/CopySvg";
import { TickSvg } from "../../images/TickSvg";


export function CopyButton(props: { clipboard: string }) {
    const { clipboard } = props;

    const idCopy = useId();
    const idCopied = useId();

    const copyRef = useRef<HTMLDivElement>(null);
    const copiedRef = useRef<HTMLDivElement>(null);

    const [isClicked, setIsClicked] = useState(false);



    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsClicked(false);
            copiedRef.current?.hidePopover();
        }, 2000)

        return () => {
            clearTimeout(timeout);

            
        }
    }, [isClicked])


    return <div className="tooltip-container">

        <div className="tooltip-target" id={idCopy} popover="auto" ref={copyRef}></div>
        <div className="tooltip-content" >Copy snippet</div>
        <div className="tooltip-target" id={idCopied} popover="auto" ref={copiedRef}></div>
        <div className="tooltip-content">Copied!</div>
        <button 
        className={isClicked? "clicked": "not-clicked"}
        onMouseEnter={() =>{

            if(!isClicked){
                copyRef.current?.showPopover();
            }
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

        {isClicked ? <TickSvg/>:
        <CopySvg />}
    </button>
    </div>

}