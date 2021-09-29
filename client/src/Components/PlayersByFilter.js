import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams } from 'react-router-dom';
import Btn from '../Molecules/Btn'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteJouer } from "./actions/ajouterunjouer"


export default function PlayersByFilter() {

    const dispatch = useDispatch();
    let { sex, category } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    const [items, setItems] = useState([])


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
        history.push(`/updatejouer/${_id}`);
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
                        let formattedPlayer = { ...player, rang: parseInt(index) + 1 }
                        formattedPlayers.push(formattedPlayer);
                    }


                    setItems(formattedPlayers);
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
                {isSmall ? <Icon icon={faEdit} className="hoverScale" size="sm" /> : "mettre à jour"}
            </Btn>
            <Btn onClick={e => handleDelete(e, row._id)} style={{ backgroundColor: "red", margin: "10px" }}>
                {isSmall ? <Icon icon={faTrash} className="hoverScale" size="sm" /> : "Supprimer"}

            </Btn>
        </div>
    );

    const CustomName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/players/${row.team.name}`);
        }} >{row.team.name}</div>
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
            maxWidth: '220px',
        },
        {
            name: 'Prenom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
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
            name: 'Points',
            selector: row => row.score,
            sortable: true,
            center: true
        },
        {
            name: "actions",
            maxWidth: '600px',
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
        },
        {
            name: 'Prenom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
        },
        {
            name: 'Club',
            selector: row => row.team.name,
            sortable: true,
            center: true,
            cell: row => <CustomName row={row} />,
        },
        {
            name: 'Points',
            selector: row => row.score,
            sortable: true,
            center: true
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


    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: 60, marginBottom: 20 }} >{sex.toUpperCase() == "M" ? "Homme" : "Femme"} : {category.toLowerCase()[0].toUpperCase() + category.toLowerCase().substring(1)}</h1>
            {isLoggedIn &&

                <Btn
                    onClick={() => {
                        history.push(`/Ajouterjouer/`);
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
                />

            </div >

            {/* <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "90%",
                height: "75vh",
                backgroundColor: design.accentColor,
                marginLeft: "5%",
                textAlign: 'center',
                overflowY: "scroll"
            }} >

                {
                    isLoggedIn ?


                        <>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: "white", width: "100%", height: 50, marginBottom: 10, paddingTop: 20, paddingBottom: 20 }} >

                                <div style={{ width: "10%" }} >rang</div>
                                <div style={{ width: "10%" }} >Num</div>
                                <div style={{ width: "15%" }} >Nom</div>
                                <div style={{ width: "15%" }} >Prenom</div>
                                <div style={{ width: "15%" }} >Club</div>
                                <div style={{ width: "10%" }} >Points</div>

                            </div>
                            {items.map((item, index) => {
                                // remove the last filtered item
                                return <PlayerItem isLoggedIn={true} isByFilter={true} key={item._id} rang={index} {...item} filteredScore={item[`${category}Score`]} filteredScore={item[`score`]} />
                            })}
                        </>

                        :

                        <>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: "white", width: "100%", height: 50, marginBottom: 10, paddingTop: 20, paddingBottom: 20 }} >

                                <div style={{ width: "10%" }} >rang</div>
                                <div style={{ width: "15%" }} >Num</div>
                                <div style={{ width: "20%" }} >Nom</div>
                                <div style={{ width: "20%" }} >Prenom</div>
                                <div style={{ width: "20%" }} >Club</div>
                                <div style={{ width: "15%" }} >Points</div>

                            </div>
                            {items.map((item, index) => {
                                // remove the last filtered item
                                return <PlayerItem isLoggedIn={false} isByFilter={true} key={item._id} rang={index} {...item} filteredScore={item[`${category}Score`]} filteredScore={item[`score`]} />
                            })}

                        </>

                }




            </div> */}
        </>
    )
}
