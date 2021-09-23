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

import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
const initialState = { Nom: '', Banned: '' };

const Updateequipe = () => {

    let { _id } = useParams();

    console.log(_id)


    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialState);

    const history = useHistory();

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






    const getTeam = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post(`/api/team/read/one1/${_id}`, {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    setTeam(res.team);
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

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleChange1 = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value.replace(/[^A-Za-z]/ig, '') });
    }



    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    const onlyletter = e => (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122);

    const updateequipe = (formData, router, _id) => async (dispatch) => {

        try {
            console.log(team._id)
            const { data } = await api.Updateequipe(formData, team._id);

            dispatch({ type: AJOUT, data });
            if (data.samename == true) {
                notifier.alert('l équipe existe déjà  ')
            } else if (data.success == true) {
                notifier.success('Succès')
            } else if (data.success == false) {
                notifier.alert('Erreur')
            }



        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = (e) => {

        form.Banned = banned



        if (form.Nom == '') {
            notifier.alert("Le champ Nom ne peut pas être vide et ne peut contenir que des lettres");
            return;


        }
        if (banned._id == undefined) {
            notifier.alert("please select banned or not ");
            console.log(form.Nom)

            return;

        }





        e.preventDefault();
        dispatch(updateequipe(form, history));


    };

    useEffect(() => {
        getTeam();
    }, [])
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
                <h1 style={{ textAlign: 'center', margin: 20 }}>Mise a jour d'une equipe</h1>

                <div >
                    <Input handleChange={handleChange1} name="Nom" placeholder={team.name} defaultValue={team.name} width="400px" maxLength="9" />

                </div>
                <br />

                <div>

                    <DrpDown name="Banned" handleChange={handleChange} style={{ width: "400px" }} dataset={banneds} setData={setBanned} data={banned} >l'équipe est bannie ? </DrpDown>

                </div>
                <br />

                <br />
                <Btn onClick={handleSubmit} style={{ width: 400 }}>Valider</Btn>

            </div >
        </form>
    )
};
export default Updateequipe;
