import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../../RContext'
import { DesignContext } from '../../DesignContext';
import TeamItem from './TeamItem';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams } from 'react-router-dom';
import Btn from '../../Molecules/Btn'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteTeam } from "../actions/ajouterunjouer"


export default function Teams() {

    const dispatch = useDispatch();

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

                dispatch(deleteTeam(_id, config)); history.go(0)
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
        history.push(`/updateequipe/${_id}`);
    }


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
            history.push(`/players/${row.name}`);
        }} >{row.name}</div>
    );



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

        axios.post("/api/team/read/all", { dontReadPlayers: false }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)

                    // let teams = res.teams;

                    // let formattedTeams = [];

                    // for (const team of teams) {
                    //     let formattedTeam = { ...team, players: team.players.length, isBanned: team.isBanned ? "oui" : "non" }
                    //     formattedTeams.push(formattedTeam);
                    // }


                    // setItems(formattedTeams);

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

    const calculateScore = (team) => {
        let score = 0;
        // console.log(team)
        for (const teamMatch of team.matches1) {
            for (const match of teamMatch.matches) {
                score += (match.contest.player1Score > match.contest.player2Score ? 1 : 0)
            }
        }

        for (const teamMatch of team.matches2) {
            for (const match of teamMatch.matches) {
                score += (match.contest.player2Score > match.contest.player1Score ? 1 : 0)
            }
        }

        return score;
    }

    const columnsLoggedIn = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
            center: true,
            cell: row => <CustomName row={row} />,
        },
        {
            name: 'Poussins',
            selector: row => row.players_v2.filter(player => player.category == "615c7c026a276c684c988b61").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Pupilles',
            selector: row => row.players_v2.filter(player => player.category == "615c7c036a276c684c988e9e").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Minimes',
            selector: row => row.players_v2.filter(player => player.category == "615c7bfd6a276c684c9884b9").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Cadets',
            selector: row => row.players_v2.filter(player => player.category == "615c7bfe6a276c684c988553").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Juniors',
            selector: row => row.players_v2.filter(player => player.category == "615c7c006a276c684c988858").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Seniors',
            selector: row => row.players_v2.filter(player => player.category == "615c7c006a276c684c988938").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Zone',
            selector: row => row.zone,
            sortable: true,
            center: true
        },
        {
            name: 'Nombre de Joueurs',
            selector: row => row.players_v2.length,
            sortable: true,
            center: true
        },
        // {
        //     name: 'Score',
        //     selector: row => calculateScore(row),
        //     sortable: true,
        //     center: true
        // },
        {
            name: "l'equipe est bannie",
            selector: row => row.isBanned ? "oui" : "non",
            center: true,
            hide: "sm",
            maxWidth: '130px'
        },
        {
            name: "actions",
            maxWidth: '180px',
            cell: row => <CustomTitle row={row} />,
            center: true
        },

    ];

    const columns = [
        {
            name: 'Nom',
            selector: row => row.name,
            sortable: true,
            center: true
        },
        {
            name: 'Poussins',
            selector: row => row.players_v2.filter(player => player.category == "615c7c026a276c684c988b61").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Pupilles',
            selector: row => row.players_v2.filter(player => player.category == "615c7c036a276c684c988e9e").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Minimes',
            selector: row => row.players_v2.filter(player => player.category == "615c7bfd6a276c684c9884b9").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Cadets',
            selector: row => row.players_v2.filter(player => player.category == "615c7bfe6a276c684c988553").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Juniors',
            selector: row => row.players_v2.filter(player => player.category == "615c7c006a276c684c988858").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Seniors',
            selector: row => row.players_v2.filter(player => player.category == "615c7c006a276c684c988938").length,
            sortable: true,
            center: true,
            maxWidth: '130px'
        },
        {
            name: 'Zone',
            selector: row => row.zone,
            sortable: true,
            center: true
        },
        {
            name: 'Nombre de Joueurs',
            selector: row => row.players_v2.length,
            sortable: true,
            center: true
        },
        // {
        //     name: 'Score',
        //     selector: row => calculateScore(row),
        //     sortable: true,
        //     center: true
        // }

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


    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: 60, marginBottom: 20 }} >Les Équipes </h1>
            {isLoggedIn &&
                <Btn
                    onClick={() => {
                        history.push(`/equipejoueur/`);
                    }} style={{
                        float: 'right',
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        marginRight: "5%",
                        marginBottom: "20px",
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
                        <div style={{ padding: 30, fontSize: 17 }}>
                            il n'y a pas encore d'équipes à afficher
                        </div>
                    }
                />

            </div >
        </>
    )
}
