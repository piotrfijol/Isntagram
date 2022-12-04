import React from 'react';
import "./PopUp.scss";
import { FaPlus } from "react-icons/fa";

export const PopUp = ({ title, children, isVisible = false, onClose }) => {
    
    return (
    isVisible ? (
        <div className="popup">
            <div className="popup__box" >
                <div className="popup__box__cross" onClick={onClose}>
                    <FaPlus />
                </div>                
                <h2 style={{textAlign: 'center', fontSize: '1.2rem'}}>{title}</h2>
                { children }
            </div>
        </div>

    ) : null
  )
}
