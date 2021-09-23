import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { useDispatch } from 'react-redux';
import Dialog from 'react-bootstrap-dialog'
import * as api from '../api/index';
import { AJOUT, DELETE } from '../constants/actionTypes';

import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { Row, Col } from 'react-bootstrap';
import TeamPlayers from './TeamPlayers';
import { Dropdown, FormControl } from 'react-bootstrap'
import { ajout } from "./actions/ajouterunjouer"
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import Input from '../Molecules/Input';


import { useHistory } from 'react-router-dom';
const initialState = { Nom: '', Banned: '' };

const Ajoutequipe = () => {






    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialState);

    const history = useHistory();
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState([])

    const banneds = [{
        _id: "F",
        name: "Non"
    },
    {
        _id: "O",
        name: "Oui"
    }]
    const [banned, setBanned] = useState({})







    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleChange1 = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value.replace(/[^A-Za-z]/ig, '') });
    }



    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    const onlyletter = e => (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122);
    const ajoutequipe = (formData, router) => async (dispatch) => {

        try {
            const { data } = await api.Ajoutequipe(formData);

            if (data.samename == true) {
                notifier.alert('léquipe existe déjà')
            } else if (data.success == true) {
                notifier.success('Succès')
            }



        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {


        if (form.Nom == '') {
            notifier.alert("Le champ Nom ne peut pas être vide et ne peut contenir que des lettres");
            return;


        }



        e.preventDefault();
        dispatch(ajoutequipe(form, history));


    };


    return (
        <form  >

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                height: "87vh",
                //paddingTop: "20vh",
                // backgroundColor: design.backgroundColor,
                marginLeft: "5%",
                textAlign: 'center',
                // overflowY: "scroll"
            }} >
                <h1 style={{ textAlign: 'center', margin: 20 }}>Ajoute une equipe</h1>

                <div >
                    <Input handleChange={handleChange1} name="Nom" placeholder="Nom" width="400px" maxLength="9"
                    ></Input>

                </div>
                <br />

                <Btn onClick={handleSubmit} style={{ width: 400 }}>Valider</Btn>

            </div ></form>
    )
};
export default Ajoutequipe;
