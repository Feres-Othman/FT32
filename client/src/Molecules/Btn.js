import React, { useContext } from 'react'
import { DesignContext } from '../DesignContext'
import "./Button.css"

export default function Btn({ type,content, onClick = null, children, style, isActive = true }) {

    const { design } = useContext(DesignContext)

    return (
        <div className="button hoverScale" onClick={(e) => { if (isActive && onClick) onClick(e); }} style={{ backgroundColor: design.primaryColor, color: design.backgroundColor, ...style, opacity: isActive ? 1 : .5 }} >
            {content || children}
        </div>
    )
}
