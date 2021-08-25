import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { Dropdown } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import { useHistory } from 'react-router-dom';

export default function AddMatch() {


    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    const types = [
        "Championnat individuel – phase nationale + TOP 6",
        "Championnat individuel – phase régionale ",
        "Critérium national",
        "Critérium régional ",
        "Championnat par équipe – super div nationale",
        "Championnat par équipe –div nationale 1 et 2",
        "Championnat par équipe jeune – phase régionale et inter - régionale",
        "Championnat par équipe jeune –phase finale ",
        "Coupe de Tunisie par équipes"
    ]

    const genders = [{
        _id: "F",
        name: "Femme"
    },
    {
        _id: "M",
        name: "Homme"
    }]
    const [gender, setGender] = useState({})

    const getCategories = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/category/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    setCategories(res.categories);
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
        getCategories();
    }, [])

    let history = useHistory();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "90%",
            height: "87vh",
            // paddingTop: "20vh",
            // backgroundColor: design.backgroundColor,
            marginLeft: "5%",
            textAlign: 'center',
            // overflowY: "scroll"
        }} >
            <Dropdown style={{ width: 600 }}>

                <Dropdown.Toggle variant="success" variant="Primary"
                    style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%" }}>
                    Choisir le type de compétition
                </Dropdown.Toggle>

                <div style={{ borderRadius: 15, zIndex: 100 }}>
                    <Dropdown.Menu style={{ width: '100%', zIndex: 100 }}>

                        {types.map((item, index) => (
                            <Dropdown.Item key={item._id} onClick={() => { }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                <div style={{ paddingTop: 10 }} >{item}</div>
                            </Dropdown.Item>
                        ))}

                    </Dropdown.Menu>
                </div>

            </Dropdown>

        </div >
    )
}
