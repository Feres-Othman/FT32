import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';

import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';

export default function Players() {


    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const [items, setItems] = useState([])

    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/player/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    setItems(res.players);
                } else {
                    return res.json({
                        success: false
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getProducts();
    }, [])


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            width: "90%",
            height: "87vh",
            backgroundColor: design.backgroundColor,
            marginLeft: "5%",
            textAlign: 'center',
            overflowY: "scroll"
        }} >

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: design.accentColor, width: "100%", height: 50, marginBottom: 10 }} >
                <div style={{ width: "10%" }} >Rang</div>
                <div style={{ width: "10%" }} >Num</div>
                <div style={{ width: "15%" }} >Nom</div>
                <div style={{ width: "15%" }} >Prenom</div>
                <div style={{ width: "15%" }} >Categorie</div>
                <div style={{ width: "15%" }} >Club</div>
                <div style={{ width: "10%" }} >Sexe</div>
                <div style={{ width: "10%" }} >Points</div>
            </div>
            {items.map((item, index) => {
                return <PlayerItem key={item._id} rang={index} {...item} />
            })}



        </div >
    )
}
