import React, { useContext, useEffect, useState } from 'react'
import { DesignContext } from '../../DesignContext';
// import Prd from '../../Molecules/Prd';
import { RContext } from '../../RContext'
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { UserContext } from '../../UserContext';
import bg from "../../Medias/background.jpg"
// import Menu from './Menu'
// import Filtering from './Filtering'

export default function Home() {

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${bg})`
        }}>


        </div>
    )
}
