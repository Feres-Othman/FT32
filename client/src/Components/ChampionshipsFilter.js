import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';

import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import { useHistory } from 'react-router-dom';

export default function Players() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    const genders = [{
        _id: "F",
        name: "Femme"
    },
    {
        _id: "M",
        name: "Homme"
    },
    {
        _id: "X",
        name: "Tout"
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


                    let tempCategories = res.categories;

                    tempCategories.push({
                        _id: "X",
                        name: "Tout",
                        ages: "tout ages"
                    })

                    setCategories(tempCategories);


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
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: "87vh",
            // paddingTop: "20vh",
            // backgroundColor: design.backgroundColor,
            marginLeft: "5%",
            textAlign: 'center',
            // overflowY: "scroll"
        }} >

            <DrpDown dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>
            <br />
            <DrpDown dataset={genders} setData={setGender} data={gender} > Selectionner un Genre </DrpDown>
            <br />
            <Btn onClick={() => {
                if (gender._id == undefined) {
                    notifier.alert("please select a gender");
                    return;
                }

                if (category.name == undefined) {
                    notifier.alert("please select a category");
                    return;
                }

                history.push(`/championships/${gender._id.toLowerCase()}/${category.name.toLowerCase()}`);
            }} style={{ width: 400 }}>Valider</Btn>

        </div >
    )
}
