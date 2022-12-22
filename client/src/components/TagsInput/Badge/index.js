import React from 'react'
import './Badge.scss'
import { AiOutlineClose } from "react-icons/ai"

export const Badge = ({ value, className, onClose }) => {
    
    const handleClose = (ev) => {
        ev.preventDefault();
        if(onClose && typeof onClose === 'function')
            onClose(ev);
        
        ev.currentTarget.parentNode.remove();
    };

    return (
        <div className={"badge " + className}>
            {value}
            <div className="badge__close" onClick={handleClose}>
                <AiOutlineClose />
            </div>
        </div>
    )
}
