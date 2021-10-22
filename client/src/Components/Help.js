import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import image1 from '../Medias/Screenshot_10.jpg'
import image2 from '../Medias/Screenshot_1.jpg'

export default function Players() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)



    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            height: "87vh",
            // paddingTop: "20vh",
            // backgroundColor: design.backgroundColor,
            marginLeft: "5%",
            textAlign: 'center',
            // overflowY: "scroll"
        }} >

            <img src={image1} style={{ height: "50vh" }} />
            <img src={image2} style={{ height: "50vh" }} />

        </div >
    )
}
