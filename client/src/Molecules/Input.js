import React, { useState, useContext, useEffect, useRef } from "react";
import { RContext } from "../RContext";
import { DesignContext } from "../DesignContext";

export default function Input({ name, label, type = "text", placeholder, value, defaultValue, handleChange, handleChangeEvent, onKeyPress, disabled = false, width = "65%" }) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    return (
        <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? '' : 'center', alignContent: 'right' }}>
            <div style={{ fontSize: isSmall ? 13 : 15, marginRight: 15 }}>{label}</div>
            <br />
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                {...(() => { if (value) return { value: value }; else return {}; })()}
                defaultValue={defaultValue}
                onChange={(e) => { if (handleChange) handleChange(e.target.value); if (handleChangeEvent) handleChangeEvent(e); }}
                style={{ borderRadius: 15, height: 45, width: isSmall ? '' : width, backgroundColor: 'white' }}
                onKeyPress={onKeyPress}
                className='form-control'
                disabled={disabled}
            />
        </div>
    )
}

