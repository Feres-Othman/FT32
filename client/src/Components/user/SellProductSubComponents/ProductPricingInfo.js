import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { DesignContext } from '../../../DesignContext'
import { RContext } from '../../../RContext'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import Input from '../../../Molecules/Input'

export default function ProductPricingInfo({ price, setPrice, discount, setDiscount }) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    return (
        <div style={{
            minHeight: isSmall ? "15vh" : isMedium ? '10vh' : isLarge ? '10vh' : '20vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-around",
            gap: 20,
            width: isSmall ? "95%" : isMedium ? 600 : isLarge ? 800 : 700,
            maxWidth: "95%",
            padding: 20,
            borderRadius: 30,
            border: `2px solid ${design.backgroundColor}`,
            backgroundColor: design.backgroundColor,
            filter: 'drop-shadow(4px 6px 8px #555)',
        }}>

            <Input
                name="price"
                label="Prix"
                type="text"
                value={price}
                onChange={setPrice}
            />

            <Input
                name="discount"
                label="Code promo"
                type="text"
                value={discount}
                onChange={setDiscount}
            />

        </div>
    )
}
