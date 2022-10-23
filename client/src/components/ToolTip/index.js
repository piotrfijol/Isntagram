import React, { useRef, useState } from 'react'
import './ToolTip.scss'

export default function ToolTip({ name = "", direction = "right", children }) {
    
    const tooltipTarget = useRef(null);
    const toolTip = useRef(null);
    let [isVisible, setVisibility] = useState(false);

    const showToolTip = (e) => {
        setVisibility(true);
        if(e.target === toolTip.current)
            setVisibility(false);
    };

    const hideToolTip = (e) => {
        e.preventDefault();
        setVisibility(false);
    };

    return (
        <div 
            ref={tooltipTarget}
            onMouseEnter={showToolTip} 
            onMouseLeave={hideToolTip} 
            onTouchStart={showToolTip}
            onTouchEnd={hideToolTip}
            className="tool-tip-target"
        >
            <div 
                className={"tool-tip not-interactive " + (["left", "right", "bottom", "top"].includes(direction) ? direction : "")}
                style={ { display: isVisible ? 'block' : 'none'} }
                ref={toolTip}
                onMouseOver={hideToolTip}
                onTouchStart={hideToolTip}
            >
                {name}
            </div>
            { children }
        </div>
  )
}
