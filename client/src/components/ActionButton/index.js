import React from 'react'
import ToolTip from '../ToolTip'
import './ActionButton.scss'

export default function ActionButton({ icon: Icon, name, direction, className, onClick}) {
    return (
    <ToolTip name={name} direction={direction}>
        <button className={"action-button " + className} onClick={onClick}>
            <Icon />
        </button>
    </ToolTip>
  )
}
