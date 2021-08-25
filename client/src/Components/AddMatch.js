import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { Dropdown, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import { useHistory } from 'react-router-dom';

export default function AddMatch() {



    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <button ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="Primary"
            style={{ backgroundColor: 'white', borderRadius: 15, height: 50, width: 600, border: "0px" }}>

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
                        placeholder="Type to filter..."
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className="list-unstyled">
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

    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    const [teams, setTeams] = useState([])
    const [team1, setTeam1] = useState({})
    const [team2, setTeam2] = useState({})

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
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getCategories();
    }, [])


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

    const [items, setItems] = useState([])

    const getPlayers = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/player/read/category/all", { category: category.name.toLowerCase() }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    setItems(res.players);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        if (category.name)
            getPlayers();
    }, [category])


    let history = useHistory();

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "start",
                flexWrap: "wrap",
                width: "90%",
                // paddingTop: "20vh",
                // backgroundColor: "red",
                marginLeft: "5%",
                textAlign: 'center',
                gap: 20
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

                <DrpDown style={{ width: 600 }} dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>

            </div >

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "start",
                flexWrap: "wrap",
                width: "90%",
                // paddingTop: "20vh",
                // backgroundColor: "red",
                marginLeft: "5%",
                textAlign: 'center',
                gap: 20,
                marginTop: 20
                // overflowY: "scroll"
            }} >
                <div style={{ width: 600 }}>
                    <input
                        type="text"
                        list="teams"
                        placeholder="Ecrire le numero de joueur"
                        // value={value}
                        // onChange={(e) => { onChange(e.target.value); }}
                        style={{ borderRadius: 15, height: 45, backgroundColor: 'white' }}
                        // onKeyPress={onKeyPress}
                        className='form-control'
                    // disabled={disabled}
                    />

                    <datalist id="teams" >
                        {teams.map((item, index) => (
                            <option value={item.name} />
                        ))}
                    </datalist>
                </div>

                <DrpDown style={{ width: 600 }} dataset={teams} setData={setTeam2} data={team2} > Selectionner une Equipe </DrpDown>

            </div >


            <div style={{ width: 400 }}>
                <input
                    type="text"
                    list="players"
                    placeholder="Ecrire le numero de joueur"
                    // value={value}
                    // onChange={(e) => { onChange(e.target.value); }}
                    style={{ borderRadius: 15, height: 45, backgroundColor: 'white' }}
                    // onKeyPress={onKeyPress}
                    className='form-control'
                // disabled={disabled}
                />

                <datalist id="players" >
                    {items.map((item, index) => (
                        <option value={item.firstName + " " + item.lastName}  > {item.number}</option>
                    ))}
                </datalist>
            </div>


            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {team2.name || "Select a team"}
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                    {teams.map((item, index) => (
                        <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam2(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                            {item.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div >

    )
}
