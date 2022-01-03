import React, { useContext, useEffect, useState } from 'react'
import { useStateWithCallbackLazy } from 'use-state-with-callback';
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
import profile from '../Medias/avatar.jpg'


export default function Profile() {

    const { id } = useParams();
    let history = useHistory();
    const [championship, setChampionship] = useStateWithCallbackLazy({})

    const [scores, setScores] = useState({})
    const [matchHistory, setMatchHistory] = useState([])


    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post(`/api/player/championship/read/one/${id}`, {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    console.log(res)

                    setChampionship(res.championship);




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


    const getIndex = (phase, id) => {
        // console.log(phase)
        if(!phase) return Infinity;
        let i = 0
        for (const element of phase) {
            if (element._id == id) {
                return i;
            }
            i++;
        }

        return Infinity;

    }

    const getScoreFronIndex = (index) => {

        if (index == 0) {
            return 100
        } else if (index == 1) {
            return 90
        } else if (index == 2) {
            return 84
        } else if (index == 3) {
            return 76
        } else if (index >= 4 && index <= 7) {
            return 65
        } else if (index >= 8 && index <= 15) {
            return 40
        } else if (index >= 16 && index <= 23) {
            return 15
        } else if (index >= 24 && index <= 31) {
            return 10
        } else {
            return 0
        }

    }

    const columns = [
        {
            name: 'Num',
            selector: row => row.number,
            sortable: true,
            center: true
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
            name: 'Sexe',
            selector: row => row.sex,
            sortable: true,
            center: true
        },
        {
            name: 'phase 1',
            selector: row => getScoreFronIndex(getIndex(championship.phase1, row._id)),
            sortable: true,
            center: true
        },
        {
            name: 'phase 2',
            selector: row => getScoreFronIndex(getIndex(championship.phase2, row._id)),
            sortable: true,
            center: true
        },
        {
            name: 'phase 3',
            selector: row => getScoreFronIndex(getIndex(championship.phase3, row._id)),
            sortable: true,
            center: true
        },
        {
            name: 'Total',
            selector: row => getScoreFronIndex(getIndex(championship.phase1, row._id)) + getScoreFronIndex(getIndex(championship.phase2, row._id)) + getScoreFronIndex(getIndex(championship.phase3, row._id)),
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

            {championship ?

                <div style={{ width: "80%", marginLeft: "10%", display: "flex", flexDirection: "column", justifyContent: "left", alignItems: 'left', marginTop: 40, marginBottom: 40 }}>
                    <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }} >Classement dans le Championnat</div>
                    <DataTable
                        columns={columns}
                        data={championship.phase1}
                        style={{ borderRadius: 20 }}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        noDataComponent={
                            <div style={{ padding: 30, fontSize: 17 }}>
                                il n'y a pas encore de joueurs à afficher
                            </div>
                        }
                        defaultSortFieldId="Total"
                        defaultSortAsc={false}
                    />
                </div>
                : <div style={{
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
