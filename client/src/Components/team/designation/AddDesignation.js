import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../../../RContext'
import { DesignContext } from '../../../DesignContext';
import { Dropdown, FormControl, Form } from 'react-bootstrap'
import axios from 'axios'

import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../../../Molecules/DrpDown';
import Btn from '../../../Molecules/Btn';
import Input from '../../../Molecules/Input';

import { useHistory, useParams } from 'react-router-dom';

import PlayersBonusList from '../../PlayersBonusListClassement';

export default function AddMatch() {

    const history = useHistory();

    const { comp, cat } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)


    const [teams, setTeams] = useState([])
    const [arbitres, setArbitres] = useState([])
    const [team1, setTeam1] = useState({})
    const [arbitre, setArbitre] = useState({})
    const [team2, setTeam2] = useState({})
    const [lieu, setLieu] = useState("")
    const [dateTime, setDateTime] = useState("")




    const getTeams = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/team/read/all", { dontReadPlayers: true }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    setTeams(res.teams);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getTeams();
    }, [])


    const getArbitres = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/designation/arbitres/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    setArbitres(res.arbitres);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getArbitres();
    }, [])


    const submit = async (isTeam) => {


        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let content = {
            dateTime: dateTime,
            lieu: lieu,
            team1: team1._id,
            team2: team2._id,
            arbitre: arbitre._id,
        }

        axios.post("/api/designation/add", content, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    // if (isTeam) {
                    //     notifier.success("match ajoutee");
                    //     history.push("/");
                    // } else {
                    //     notifier.success("match ajoutee");
                    //     history.go(0)
                    // }
                    notifier.success("Classement ajoute");
                    history.push("/");
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <button ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="Primary"
            style={{ backgroundColor: 'white', borderRadius: 15, height: 50, maxWidth: 600, minWidth: 400, border: "0px" }}>

            {children}
            &#x25bc;

        </button>

    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
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


    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                width: "90%",
                marginTop: 160,
                // paddingTop: "20vh",
                // backgroundColor: "red",
                marginLeft: "5%",
                textAlign: 'center',
                gap: 20
                // overflowY: "scroll"
            }} >


                {/* <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={genders} setData={setGender} data={gender} > Selectionner un Genre </DrpDown> */}

                <h1>Ajouter une Designation</h1>

                <Dropdown style={{ marginTop: 60, maxWidth: 600, minWidth: 400 }}>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {team1.name || `Selectionner l'equipe 1`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu} >
                        {teams.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam1(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {item.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown style={{ maxWidth: 600, minWidth: 400 }}>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {team2.name || `Selectionner l'equipe 2`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu} >
                        {teams.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam2(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {item.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown style={{ maxWidth: 600, minWidth: 400 }}>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {arbitre.name || `Selectionner l'arbitre`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu} >
                        {arbitres.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setArbitre(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {`${item.number} - ${item.name}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Form.Control type="datetime-local" onChange={(e) => { setDateTime(e.target.value) }} placeholder="Entrer une date" style={{ padding: 30, borderRadius: 15, maxWidth: 400, minWidth: 400 }} />

                <Input handleChange={(value) => { setLieu(value) }} value={lieu} style={{ maxWidth: 400, minWidth: 400 }} name="lieu" placeholder="Lieu" type="text" width="400px" />

                <Btn style={{ backgroundColor: "green", width: "400px", marginTop: 40, marginBottom: 40 }} onClick={e => { submit(false) }} >
                    Valider
                </Btn>
            </div >



        </div >

    )
}
