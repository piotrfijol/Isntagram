import React, { useRef } from 'react'
import './TextInput.scss';

export default function TextInput({ 
    name, 
    id, 
    label, 
    value, 
    onChange, 
    type = "text" 
}) {

    const labelRef = useRef(null);

    const liftLabel = (e) => {
        labelRef.current.classList.add('floating-label');
    };

    const dropLabel = (e) => {
        if(e.currentTarget.value === '')
            labelRef.current.classList.remove('floating-label');
    };

    return (
        <React.Fragment>
            <div onFocus={liftLabel} className='label-wrapper'>
                <label ref={labelRef} htmlFor={id}>{label}</label>
            </div>
            <input 
                type={type} 
                onChange={onChange} 
                onFocus={liftLabel} 
                onBlur={dropLabel}
                id={id} 
                name={name} 
                value={value}
            />
        </React.Fragment>
    )
}
