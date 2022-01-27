import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { useDispatch } from 'react-redux';
import Dialog from 'react-bootstrap-dialog'
import * as api from '../api/index';
import { AJOUT, DELETE } from '../constants/actionTypes';

import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { Row, Col } from 'react-bootstrap';
import { Dropdown, FormControl } from 'react-bootstrap'
import { ajout } from "./actions/ajouterunjouer"
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import Input from '../Molecules/Input';
import ImageInput from './ImageInput'


import { useHistory } from 'react-router-dom';
const initialState = { Nom: '', Prenom: '', Nationalité: '', UniqueNumber: '', Numero: '', Score: '', Category1: '', Gender: '', Date: '', Team: '' };

const Ajoutjouer = () => {

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <button ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="Primary"
            style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%", border: "0px" }}>

            {children}
            &#x25bc;

        </button>

    ));
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="tapez un filtre..."
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className="list-unstyled" style={{ maxHeight: 500, overflowY: "scroll" }}>
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );




    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const dispatch = useDispatch();

    const [form, setForm] = useState(initialState);

    const history = useHistory();
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState([])

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

    const getTeams = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/team/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    setTeams(res.teams);
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
    useEffect(() => {
        getTeams();
    }, [])


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleChange1 = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value.replace(/[^A-Za-z]/ig, '') });
    }



    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
    const onlyletter = e => (e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122);
    const ajout = (formData, router) => async (dispatch) => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        try {
            const { data } = await api.Ajout(formData, config);

            dispatch({ type: AJOUT, data });
            if (data.success == false) {
                notifier.alert('joueur avec ce Numéro Unique existe déjà')
            } else if (data.success == true) {
                notifier.success('Succès')
            }



        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = (e) => {
        form.Category1 = category
        form.Gender = gender
        form.Team = team



        if (form.Nom == '') {
            notifier.alert("Le champ Nom ne peut pas être vide et ne peut contenir que des lettres");
            return;
        } if (form.Prenom == '') {
            notifier.alert("Le champ Prenom ne peut pas être vide et ne peut contenir que des lettres");
            return;
        }
        if (gender._id == undefined) {
            notifier.alert("veuillez sélectionner un sexe");
            return;
        }
        if (category.name == undefined) {
            notifier.alert("Veuillez sélectionner une catégorie");
            return;
        } if (team.name == undefined) {
            notifier.alert("veuillez sélectionner une équipe");
            return;
        } if (form.Date == '') {
            notifier.alert("Le champ de date ne peut pas être vide");
            return;
        }
        if (form.Score == '') {
            notifier.alert("Le champ Score ne peut pas être vide et ne peut contenir que des chiffres");
            return;
        }

        if (form.Nationalité == '') {
            notifier.alert("le champ nationalité ne peut pas être vide et ne peut contenir que des lettres");
            return;
        } if (form.Numero == '') {
            notifier.alert("Le champ Numero ne peut pas être vide et ne peut contenir que des chiffre");
            return;
        }



        console.log(form.Category1)
        console.log(category)
        console.log(form)



        e.preventDefault();
        dispatch(ajout(form, history));


    };


    return (
        <form  >

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                padding: 100,
                //paddingTop: "20vh",
                // backgroundColor: design.backgroundColor,
                marginLeft: "5%",
                textAlign: 'center',
                // overflowY: "scroll"
            }} >
                <h1 style={{ textAlign: 'center', margin: 20 }}>Ajoute un joueur</h1>

                {/* <ImageInput /> */}

                <div style={{ marginTop: 20 }} >
                    <Row>

                        <Col>
                            <Input handleChangeEvent={handleChange1} name="Nom" placeholder="Nom" width="200px" maxLength="9" />
                        </Col>
                        <Col>
                            <Input handleChangeEvent={handleChange1} name="Prenom" placeholder="Prenom" width="200px" />
                        </Col>
                    </Row>
                </div>
                <br />
                <div >
                    <Row>

                        <Col><Input handleChangeEvent={handleChange1} name="Nationalité" placeholder="Nationalité" width="400px" ></Input></Col>

                        {/* <Col><Input handleChangeEvent={handleChange} name="UniqueNumber" placeholder="Numéro unique" width="200px" ></Input></Col> */}
                    </Row>

                </div>





                <br />
                <div >
                    <Row>
                        <Col><Input handleChangeEvent={handleChange} onKeyPress={blockInvalidChar} type="number" name="Numero" placeholder="Numero" width="200px" ></Input></Col>

                        <Col><Input handleChangeEvent={handleChange} type="number" onKeyPress={blockInvalidChar} name="Score" placeholder="Score" width="200px" ></Input></Col>
                    </Row>
                </div>            <br />
                <DrpDown handleChangeEvent={handleChange} value={category} name="Category" dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>
                <br />
                <div >
                    <h4 style={{ textAlign: 'left' }}>Date de naissance: </h4>
                    <Input handleChangeEvent={handleChange} name="Date" placeholder="Date de naissance" width="400px" type="date" ></Input>
                </div>

                <br />
                <div>
                    <Row>

                        <Col><DrpDown name="Gender" handleChangeEvent={handleChange} style={{ width: "200px", zIndex: 5 }} dataset={genders} setData={setGender} data={gender} > Selectionner un Genre </DrpDown></Col>


                        <Col>
                            <Dropdown name="team" handleChangeEvent={handleChange} drop="up" style={{ width: "200px", zIndex: 5 }} >
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    {team.name || `Selectionner l'equipe `}
                                </Dropdown.Toggle>

                                <Dropdown.Menu as={CustomMenu} >
                                    {teams.map((item, index) => (
                                        <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam(item) }} >
                                            {item.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                    </Row>
                </div>
                <br />

                <br />
                <Btn onClick={handleSubmit} style={{ width: 400 }}>Valider</Btn>

            </div ></form>
    )
};
export default Ajoutjouer;
