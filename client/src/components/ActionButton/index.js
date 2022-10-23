import React from 'react'
import ToolTip from '../ToolTip'
import './ActionButton.scss'

export default function ActionButton({ icon: Icon, name, direction}) {
    return (
    <ToolTip name={name} direction={direction}>
        <button className="action-button">
            <Icon />
        </button>
    </ToolTip>
  )
}
