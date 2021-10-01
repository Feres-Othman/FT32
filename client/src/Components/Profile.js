import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faFemale, faMale, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import Btn from '../Molecules/Btn'
import { useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';

const state = {
    labels: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    datasets: [
        {
            display: false,
            label: 'JUNIORS',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [500, 500, 450, 400, 490, 650, 700, 680, 680, 650, 640, 790]
        },
        {
            display: false,
            label: 'ESPOIRES',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(192,75,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [500, 480, 550, 600, 790, 750, 600, 720, 780, 750, 540, 490]
        },
        {
            display: false,
            label: 'SENIORES',
            fill: false,
            lineTension: 0.3,
            backgroundColor: 'rgba(192,192,75,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [500, 580, 650, 700, 690, 720, 650, 620, 600, 550, 580, 590]
        }
    ]
}

export default function Profile() {

    const { playerId } = useParams();
    let history = useHistory();
    const [player, setPlayer] = useState({})

    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post(`/api/player/read/one/${playerId}`, {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    console.log(res)

                    setPlayer(res.player);

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

    const CustomFirstName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/player/${row._id}`);
            history.go(0);
        }} >{row.firstName}</div>
    );

    const CustomLastName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/player/${row._id}`);
            history.go(0);
        }} >{row.lastName}</div>
    );

    const columns = [
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
            name: 'Sexe',
            selector: row => row.sex,
            sortable: true,
            center: true
        },
        {
            name: 'Points',
            selector: row => row.score,
            sortable: true,
            center: true
        }

    ];

    const matchColumns = [
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
            name: 'Sexe',
            selector: row => row.sex,
            sortable: true,
            center: true
        },
        {
            name: 'Points',
            selector: row => row.score,
            sortable: true,
            center: true
        }

    ];

    const paginationComponentOptions = {
        noRowsPerPage: true,
        rangeSeparatorText: 'de',
    };

    return (
        <>

            {player.number ?
                <div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "start",
                        width: "90%",
                        marginLeft: "5%",
                        textAlign: 'center',
                        overflow: 'hidden',
                        borderRadius: 20,
                        padding: 20,
                        paddingTop: 60
                    }}>
                        <div>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 50 }}>

                                <div style={{ fontSize: 60, marginRight: 25 }}>{player.sex === "M" ? <Icon icon={faMale} /> : <Icon icon={faFemale} />}</div>

                                <div style={{ fontSize: 30, fontWeight: "bold" }}> {player.lastName} {player.firstName} </div>

                            </div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20 }}>
                                <div style={{ fontSize: 20, fontWeight: "bold" }}>Score : {player.score}</div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20 }}>
                                <div style={{ fontSize: 20, fontWeight: "bold" }}>Numero : {player.number}</div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20 }}>
                                <div style={{ fontSize: 20, fontWeight: "bold" }}>Categorie : {player.category?.name}</div>
                            </div>

                            <Line
                                data={state}
                                style={{ width: 500, marginTop: 40 }}
                                options={{
                                    legend: {
                                        display: false,
                                        position: 'right'
                                    }
                                }}
                            />

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: 550, gap: 15 }}>
                            <div style={{ fontSize: 20, fontWeight: "bold" }} >Equipe : {player.team?.name}</div>

                            <DataTable
                                columns={columns}
                                data={player.team?.players}
                                style={{ borderRadius: 20 }}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                noDataComponent={
                                    <div style={{ padding: 30, fontSize: 17 }}>
                                        il n'y a pas encore de joueurs à afficher
                                    </div>
                                }
                            />

                        </div>

                    </div>

                    <div style={{ width: "80%", marginLeft: "10%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
                        <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }} >Historique des matches</div>
                        <DataTable
                            columns={matchColumns}
                            data={player.history}
                            style={{ borderRadius: 20 }}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            noDataComponent={
                                <div style={{ padding: 30, fontSize: 17 }}>
                                    il n'y a pas encore de matchs à afficher
                                </div>
                            }
                        />
                    </div>

                </div> :
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "90%",
                    height: "90vh",
                    marginLeft: "5%",
                    textAlign: 'center',
                    overflow: 'hidden',
                    borderRadius: 20,
                    padding: 20,
                    paddingTop: 60,
                    fontSize: 30,
                }}>
                    Vueillez attendre ...
                </div>
            }

        </>

    )
}
