import React, { useContext, useEffect, useState, useMemo } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faMap, faPhone, faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteJouer } from "./actions/ajouterunjouer"
import Btn from '../Molecules/Btn'

import FilterComponent from './FilterComponent';

export default function Players() {

    const dispatch = useDispatch();
    let history = useHistory();
    let { clubName } = useParams();

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
        history.push(`/updatejoueur/${_id}`);
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
        },
        {
            name: 'Prenom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
            cell: row => <CustomFirstName row={row} />,
        },
        {
            name: 'Categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            maxWidth: '220px',
        },
        {
            name: 'Etat',
            selector: row => row.isValid,
            sortable: true,
            center: true,
            cell: row => <CustomState row={row} />,
        },
        {
            name: 'Sexe',
            selector: row => row.sex,
            sortable: true,
            center: true,
            maxWidth: '150px',
        },
        // {
        //     name: 'Points',
        //     selector: row => row.score,
        //     sortable: true,
        //     center: true
        // },
        {
            name: "actions",
            cell: row => <CustomTitle row={row} />,
            center: true
        },

    ];

    const columns = [
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
        },
        {
            name: 'Prenom',
            selector: row => row.firstName,
            sortable: true,
            center: true,
            cell: row => <CustomFirstName row={row} />,
        },
        {
            name: 'Categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            maxWidth: '220px',
        },
        {
            name: 'Etat',
            selector: row => row.isValid,
            sortable: true,
            center: true,
            cell: row => <CustomState row={row} />,
        },
        {
            name: 'Sexe',
            selector: row => row.sex,
            sortable: true,
            center: true
        },
        // {
        //     name: 'Points',
        //     selector: row => row.score,
        //     sortable: true,
        //     center: true
        // }

    ];


    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/team/read/one", { clubName: clubName }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    let players = res.team.players;

                    let formattedPlayers = [];

                    for (const index in players) {
                        let player = players[index];
                        let formattedPlayer = { ...player, rang: parseInt(index) + 1 }
                        formattedPlayers.push(formattedPlayer);
                    }


                    setItems(formattedPlayers);

                    // setItems(res.team.players);
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

    const paginationComponentOptions = {
        noRowsPerPage: false,
        rowsPerPageText: 'Lignes par page:',
        rangeSeparatorText: 'de'
    };




    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    // const filteredItems = data.filter(
    //   item => item.name && item.name.includes(filterText)
    // );
    const filteredItems = items.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>

                <h1 style={{ textAlign: 'center', margin: 20, flex: 1 }} >{clubName}</h1>

                <div style={{ width: "20%" }}>

                    <Icon icon={faMap} className="hoverScale" size="lg" style={{ marginRight: 20, cursor: 'pointer' }} />
                    <Icon icon={faPhone} className="hoverScale" size="lg" style={{ cursor: 'pointer' }} />

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
                borderRadius: 0
            }} >

                <DataTable
                    columns={isLoggedIn ? columnsLoggedIn : columns}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                    noDataComponent={
                        <div style={{ padding: 30, fontSize: 17 }}>
                            il n'y a pas encore de joueurs à afficher
                        </div>
                    }
                    data={filteredItems}
                    pagination
                    responsive={true}
                    paginationPerPage={10}
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                    paginationRowsPerPageOptions={[10, 20, 30, 70, 100, 300]}


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

                                <div style={{ width: "10%" }} >Num</div>
                                <div style={{ width: "15%" }} >Nom</div>
                                <div style={{ width: "15%" }} >Prenom</div>
                                <div style={{ width: "15%" }} >Categorie</div>
                                <div style={{ width: "10%" }} >Sexe</div>
                                <div style={{ width: "10%" }} >Points</div>

                            </div>
                            {items.map((item, index) => {
                                return <PlayerItem isByTeam={true} key={item._id} rang={index} {...item} />
                            })}
                        </>

                        :

                        <>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: "white", width: "100%", height: 50, marginBottom: 10, paddingTop: 20, paddingBottom: 20 }} >

                                <div style={{ width: "10%" }} >Num</div>
                                <div style={{ width: "20%" }} >Nom</div>
                                <div style={{ width: "20%" }} >Prenom</div>
                                <div style={{ width: "20%" }} >Categorie</div>
                                <div style={{ width: "15%" }} >Sexe</div>
                                <div style={{ width: "15%" }} >Points</div>

                            </div>
                            {items.map((item, index) => {
                                return <PlayerItem isByTeam={true} key={item._id} rang={index} {...item} />
                            })}

                        </>

                }


            </div > */}
        </>
    )
}
