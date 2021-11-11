import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import image1 from '../Medias/Screenshot_10.jpg'
import image2 from '../Medias/Screenshot_1.jpg'
import image4 from '../Medias/Screenshot_2.jpg'
import image3 from '../Medias/Screenshot_18.jpg'
import Carousel from 'react-gallery-carousel';

export default function Players() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const images = [
        {
            src: image1
        },
        {
            src: image2
        },
        {
            src: image3
        },
        {
            src: image4
        },
    ]

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)



    return (
        <div>
            <h1 style={{ marginTop: 20, textAlign: 'center' }} >Aide</h1>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                height: "87vh",
                // paddingTop: "20vh",
                // backgroundColor: design.backgroundColor,
                marginLeft: "4%",
                textAlign: 'center',
                gap: 10
                // overflowY: "scroll"
            }} >

                {/* <img src={image1} style={{ height: "50vh", borderRadius: 20 }} />
                <img src={image2} style={{ height: "50vh", borderRadius: 20 }} /> */}
                <Carousel objectFit="contain" isAutoPlaying canAutoPlay={false} hasThumbnails={false} images={images} hasIndexBoard={false} style={{ height: "80vh", width: "80vw", backgroundColor: "#fff" }} />

            </div >
        </div>

    )
}
