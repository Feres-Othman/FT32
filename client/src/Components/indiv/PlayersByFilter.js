import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams } from 'react-router-dom';
import Btn from '../Molecules/Btn'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteJouer } from "./actions/ajouterunjouer"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner'

export default function PlayersByFilter() {

    const dispatch = useDispatch();
    let { sex, category } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    const [items, setItems] = useState([])
    const [rawitems, setRawItems] = useState([])
    const [isPayed, setIsPayed] = useState(true)
    const [isNotPayed, setIsNotPayed] = useState(true)


    const handleDelete = (e, _id) => {
        e.preventDefault();
        notifier.confirm(
            'Es-tu sûr?',
            () => {

                var session = Ls.getObject('session', { 'isLoggedIn': false });
                let config = {
                    headers: {
                        "auth-token": session.token,
                    }
                }

                dispatch(deleteJouer(_id, config)); history.go(0)
            },
            () => { },
            {
                labels: {
                    confirm: ''
                }
            }
        )

    }



    const handleUpdate = (e, _id) => {
        e.preventDefault();
        history.push(`/updatejoueur/${_id}`);
    }

    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/player/read/all", { sex: sex, category: category }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)

                    let players = res.players;

                    let formattedPlayers = [];

                    for (const index in players) {
                        let player = players[index];


                        let chosenScore = player.scores.filter(scoreItem => scoreItem.category === res.chosenCategory._id)[0].score

                        let formattedPlayer = { ...player, score: chosenScore }

                        formattedPlayers.push(formattedPlayer);
                    }

                    formattedPlayers.sort((a, b) => {
                        if (a.score >= b.score) {
                            return -1;
                        }
                        if (a.score < b.score) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    })

                    for (const index in formattedPlayers) {
                        let player = formattedPlayers[index];
                        formattedPlayers[index] = { ...player, rang: parseInt(index) + 1 }
                    }


                    setItems(formattedPlayers);
                    setRawItems(formattedPlayers);
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


    const CustomTitle = ({ row }) => (
        <div>
            <Btn onClick={e => handleUpdate(e, row._id)} style={{ margin: "10px" }}>
                {true ? <Icon icon={faEdit} className="hoverScale" size="sm" /> : "mettre à jour"}
            </Btn>
            <Btn onClick={e => handleDelete(e, row._id)} style={{ backgroundColor: "red", margin: "10px" }}>
                {true ? <Icon icon={faTrash} className="hoverScale" size="sm" /> : "Supprimer"}
            </Btn>
        </div>
    );

    const CustomName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/players/${row.team.name}`);
        }} >{row.team.name}</div>
    );

    const CustomFirstName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/player/${row._id}`);
        }} >{row.firstName}</div>
    );

    const CustomLastName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/player/${row._id}`);
        }} >{row.lastName}</div>
    );

    const CustomState = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" >

            {row.isValid ? <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#3b0" }} /> : <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#fb0" }} />}


            {new Date() - new Date(row.changedTeam) < (1000 * 60 * 60 * 24 * 365 * 2) && <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#33b" }} />}

        </div>
    );


    const columnsLoggedIn = [
        {
            name: 'Rang',
            selector: row => row.rang,
            sortable: true,
            center: true,
            maxWidth: '150px',
        },
        {
            name: 'Num',
            selector: row => row.number,
            sortable: true,
            center: true,
            maxWidth: '150px',
        },
        {
            name: 'Nom',
            selector: row => row.lastName,
            sortable: true,
            center: true,
            cell: row => <CustomLastName row={row} />,
            maxWidth: '220px',
        },
        {
            name: 'Prenom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
            cell: row => <CustomFirstName row={row} />,
            maxWidth: '220px',
        },
        {
            name: 'Club',
            selector: row => row.team.name,
            sortable: true,
            center: true,
            cell: row => <CustomName row={row} />,
            maxWidth: '220px',
        },
        {
            name: 'Categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            // cell: row => <CustomName row={row} />,
        },
        {
            name: 'Etat',
            selector: row => row.isValid,
            sortable: true,
            center: true,
            cell: row => <CustomState row={row} />,
        },
        {
            name: 'Points',
            selector: row => row.score,
            sortable: true,
            center: true,
        },
        {
            name: "actions",
            maxWidth: '170px',
            cell: row => <CustomTitle row={row} />,
            center: true
        },

    ];

    const columns = [
        {
            name: 'Rang',
            selector: row => row.rang,
            sortable: true,
            center: true,
            maxWidth: '150px',
        },
        {
            name: 'Num',
            selector: row => row.number,
            sortable: true,
            center: true,
            maxWidth: '150px',
        },
        {
            name: 'Nom',
            selector: row => row.lastName,
            sortable: true,
            center: true,
            cell: row => <CustomLastName row={row} />,
            maxWidth: '220px',
        },
        {
            name: 'Prenom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
            cell: row => <CustomFirstName row={row} />,
            maxWidth: '220px',
        },
        {
            name: 'Club',
            selector: row => row.team.name,
            sortable: true,
            center: true,
            cell: row => <CustomName row={row} />,
        },
        {
            name: 'Categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            // cell: row => <CustomName row={row} />,
        },
        {
            name: 'Etat',
            selector: row => row.isValid,
            sortable: true,
            center: true,
            cell: row => <CustomState row={row} />,
        },
        {
            name: 'Points',
            selector: row => row.score,
            sortable: true,
            center: true,
        }

    ];

    // const data = [
    //     {
    //         id: 1,
    //         title: 'Beetlejuice',
    //         year: '1988',
    //     },
    //     {
    //         id: 2,
    //         title: 'Ghostbusters',
    //         year: '1984',
    //     },
    // ]

    const paginationComponentOptions = {
        noRowsPerPage: true,
        rangeSeparatorText: 'de',
    };

    useEffect(() => {

        let tempItems = []

        if (isPayed && !isNotPayed) {
            tempItems = rawitems.filter((item) => item.isValid === true)
        } else if (!isPayed && isNotPayed) {
            tempItems = rawitems.filter((item) => item.isValid === false)
        } else {
            tempItems = rawitems;
        }

        setItems(tempItems)

    }, [isPayed, isNotPayed])

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: 60, marginBottom: 20 }} >{sex.toUpperCase() == "M" ? "Homme" : sex.toUpperCase() == "F" ? "Femme" : ""} {category.toUpperCase().includes("TOUT") ? "" : <>: {category.toLowerCase()[0].toUpperCase() + category.toLowerCase().substring(1)}</>}</h1>
            {isLoggedIn &&

                <Btn
                    onClick={() => {
                        history.push(`/Ajouterjoueur/`);
                    }}
                    style={{
                        float: 'right',
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        marginRight: "5%",
                        marginBottom: "20px",
                        textAlign: 'center',
                    }}>Ajouter un joueur</Btn>
            }

            <div style={{ position: 'absolute', top: 30, left: 100, width: 300, height: 89, backgroundColor: "white", borderRadius: 20, padding: 10, fontSize: 12 }} >

                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "start", alignItems: "center", gap: 10 }}>
                    <input type="checkbox" checked={isPayed} onChange={(e) => { setIsPayed(e.target.checked) }} style={{ marginTop: -8 }} /> <label><Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#3b0" }} /> le joueur a payé sa licence</label>
                </div>

                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "start", alignItems: "center", gap: 10 }}>
                    <input type="checkbox" checked={isNotPayed} onChange={(e) => { setIsNotPayed(e.target.checked) }} style={{ marginTop: -8 }} /> <label><Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#fb0" }} /> le joueur n'a pas payé sa licence</label>
                </div>


                <div>
                    <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#33b" }} /> le joueur est mutee
                </div>

            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "90%",
                marginLeft: "5%",
                textAlign: 'center',
                overflow: 'hidden',
                borderRadius: 20
            }} >

                <DataTable
                    columns={isLoggedIn ? columnsLoggedIn : columns}
                    data={items}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    noDataComponent={
                        <div style={{ padding: 30, fontSize: 17, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                            Veuillez patienter pendant que nous apportons les données souhaitées
                            <Bars
                                heigth="100"
                                width="100"
                                color='grey'
                            />
                        </div>
                    }
                />

            </div >

        </>
    )
}
