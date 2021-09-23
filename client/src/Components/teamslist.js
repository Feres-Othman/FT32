import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import TeamItem from './TeamItem';

import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams } from 'react-router-dom';
import Btn from '../Molecules/Btn'
import { useHistory } from 'react-router-dom';

export default function Teams() {




    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    const [items, setItems] = useState([])

    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/team/read/all", config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    setItems(res.teams);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getProducts();
    }, [])

    let history = useHistory();

    return (
        <>
            <h1 style={{ textAlign: 'center', margin: 20 }} >Les Équipes </h1>
            {isLoggedIn &&
                <Btn
                    onClick={() => {
                        history.push(`/equipejouer/`);
                    }} style={{
                        float: 'right',
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        marginRight: "5%",
                        marginBottom: "5px",

                        textAlign: 'center',

                    }}>
                    Ajouter une Équipe
                </Btn>
            }

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "90%",
                height: "75vh",
                backgroundColor: design.accentColor,
                marginLeft: "5%",
                textAlign: 'center',
                overflowY: "scroll"
            }} >

                {
                    isLoggedIn ?

                        <>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: "white", width: "100%", height: 50, marginBottom: 5, paddingTop: 20, paddingBottom: 20 }} >

                                <div style={{ width: "10%" }} >rang</div>
                                <div style={{ width: "30%" }} >Nom</div>
                                <div style={{ width: "30%" }} >l'équipe est bannie</div>

                            </div>

                            {items.map((item, index) => {
                                // remove the last filtered item
                                return <TeamItem isLoggedIn={true} isByFilter={true} key={item._id} rang={index} {...item} />
                            })}
                        </>

                        :

                        <>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: "white", width: "100%", height: 50, marginBottom: 5, paddingTop: 20, paddingBottom: 20 }} >

                                <div style={{ width: "10%" }} >rang</div>
                                <div style={{ width: "30%" }} >Nom</div>
                                <div style={{ width: "30%" }} >l'équipe est bannie</div>

                            </div>

                            {items.map((item, index) => {
                                // remove the last filtered item
                                return <TeamItem isLoggedIn={false} isByFilter={true} key={item._id} rang={index} {...item} />
                            })}
                        </>
                }




            </div >
        </>
    )
}
