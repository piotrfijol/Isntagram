import React from 'react';
import "./PopUp.scss";
import { FaPlus } from "react-icons/fa";

export const PopUp = ({ children, isVisible = false, onClose }) => {
    
    return (
    isVisible ? (
        <div className="popup">
            <div className="popup__box" onKeyDown={}>
                <div className="popup__box__cross" onClick={onClose}>
                    <FaPlus />
                </div>                
                { children }
            </div>
        </div>

    ) : null
  )
}
