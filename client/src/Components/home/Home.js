import React, { useContext, useEffect, useState } from 'react'
import { DesignContext } from '../../DesignContext';
// import Prd from '../../Molecules/Prd';
import { RContext } from '../../RContext'
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { UserContext } from '../../UserContext';
import bg from "../../Medias/background.jpg"
import logo from "../../Medias/logo.png"
import i1 from "../../Medias/1.jpg"
import i2 from "../../Medias/2.jpg"
import i3 from "../../Medias/3.jpg"
import i4 from "../../Medias/4.jpg"
import i5 from "../../Medias/5.jpg"
import i6 from "../../Medias/6.jpg"
import i7 from "../../Medias/7.jpg"
// import Menu from './Menu'
// import Filtering from './Filtering'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

export default function Home() {

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const images = [
        {
            src: i1
        },
        {
            src: i2
        },
        {
            src: i3
        },
        {
            src: i4
        },
        {
            src: i5
        },
        {
            src: i6
        },
        {
            src: i7
        }
    ]

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100vw",
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${bg})`,
            gap: 30
        }}>
            <div style={{ width: '50vw', height: '25vh', backgroundColor: "#333b", borderRadius: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20 }}>

                <img src={logo} style={{ width: 100 }} />
                <div style={{ textAlign: 'center', fontSize: 17, fontWeight: 'bolder', color: "#fff" }}>
                    platforme de ranking de
                    <br />Federation Tunisienne de Tennis de Table
                </div>

            </div>

            <div style={{ width: '50vw', height: '60vh', backgroundColor: "#333b", borderRadius: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 20, overflow: "hidden" }}>
                <Carousel images={images} hasIndexBoard={false} style={{ height: "100%", width: "100%" }} />
            </div>


        </div>
    )
}
