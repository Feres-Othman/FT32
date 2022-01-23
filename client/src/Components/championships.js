import React, { useContext, useEffect, useState, useMemo } from 'react'
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
import { deleteChampionship } from "./actions/ajouterunjouer"
import FilterComponent from './FilterComponent';


export default function PlayersByFilter({ canShow500 = true }) {

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

                dispatch(deleteChampionship(_id, config)); history.go(0)
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

        axios.post("/api/player/championship/read/all", { sex: sex, category: category }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)

                    let championships = res.championships;


                    setItems(championships);
                    setRawItems(championships);
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


    const CustomFirstName = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" onClick={() => {
            history.push(`/championship/${row._id}`);
        }} >{row.type.name}</div>
    );


    const CustomState = ({ row }) => (
        <div style={{ cursor: "pointer" }} className="hoverScale" >

            {row.isValid ? <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#3b0" }} /> : <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#fb0" }} />}


            {new Date() - new Date(row.changedTeam) < (1000 * 60 * 60 * 24 * 365 * 2) && <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#33b" }} />}

        </div>
    );


    const columnsLoggedIn = [
        {
            name: 'type',
            selector: row => row.type._id,
            sortable: true,
            center: true,
            cell: row => <CustomFirstName row={row} />,
        },
        {
            name: 'categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            cell: row => row.category.name,
            maxWidth: '250px',
        },
        {
            name: 'gender',
            selector: row => row.gender,
            sortable: true,
            center: true,
            maxWidth: '220px',
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
            name: 'type',
            selector: row => row.type._id,
            sortable: true,
            center: true,
            cell: row => <CustomFirstName row={row} />,
        },
        {
            name: 'categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            cell: row => row.category.name,
            maxWidth: '250px',
        },
        {
            name: 'gender',
            selector: row => row.gender,
            sortable: true,
            center: true,
            maxWidth: '220px',
        },

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
        noRowsPerPage: false,
        rowsPerPageText: 'Lignes par page:',
        rangeSeparatorText: 'de'
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
            <h1 style={{ textAlign: 'center', marginTop: 60, marginBottom: 20 }} >{sex.toUpperCase() == "M" ? "Homme" : sex.toUpperCase() == "F" ? "Femme" : ""} {category.toUpperCase().includes("TOUT") ? "" : <>: {category.toLowerCase()[0].toUpperCase() + category.toLowerCase().substring(1)}</>}</h1>
            {isLoggedIn &&

                <Btn
                    onClick={() => {
                        history.push(`/classement/indiv/add`);
                    }}
                    style={{
                        float: 'right',
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        marginRight: "5%",
                        marginBottom: "20px",
                        textAlign: 'center',
                    }}>Ajouter un Classement</Btn>
            }

            {/* <div style={{ position: 'absolute', top: 30, left: 100, width: 300, height: 89, backgroundColor: "white", borderRadius: 20, padding: 10, fontSize: 12 }} >

                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "start", alignItems: "center", gap: 10 }}>
                    <input type="checkbox" checked={isPayed} onChange={(e) => { setIsPayed(e.target.checked) }} style={{ marginTop: -8 }} /> <label><Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#3b0" }} /> le joueur a payé sa licence</label>
                </div>

                <div style={{ display: 'flex', flexDirection: "row", justifyContent: "start", alignItems: "center", gap: 10 }}>
                    <input type="checkbox" checked={isNotPayed} onChange={(e) => { setIsNotPayed(e.target.checked) }} style={{ marginTop: -8 }} /> <label><Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#fb0" }} /> le joueur n'a pas payé sa licence</label>
                </div>


                <div>
                    <Icon icon={faCircle} className="hoverScale" size="lg" style={{ color: "#33b" }} /> le joueur est mutee
                </div>

            </div> */}

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                width: "90%",
                marginLeft: "5%",
                textAlign: 'center',
                overflow: 'hidden',
                // borderRadius: 20
            }} >

                <DataTable
                    columns={isLoggedIn ? columnsLoggedIn : columns}
                    data={filteredItems}
                    pagination
                    responsive={true}

                    paginationComponentOptions={paginationComponentOptions}
                    paginationPerPage={10}

                    subHeader
                    subHeaderComponent={subHeaderComponent}

                    // fixedHeader={true}
                    // fixedHeaderScrollHeight={"70vh"}
                    paginationRowsPerPageOptions={[10, 20, 30, 70, 100, 300]}
                    noDataComponent={
                        <div style={{ padding: 30, fontSize: 17 }}>
                            il n'y a pas encore de joueurs à afficher
                        </div>
                    }
                />

            </div >

        </>
    )
}