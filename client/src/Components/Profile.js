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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner'

export default function Profile() {

    const { playerId } = useParams();
    let history = useHistory();
    const [player, setPlayer] = useStateWithCallbackLazy({})

    const [scores, setScores] = useState({})
    const [matchHistory, setMatchHistory] = useState([])

    const [categories, setCategories] = useState([])

    const [chartData, setChartData] = useState({
        labels: ['septembre', 'octobre', 'novembre', 'décembre', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août'],
        datasets: [
            {
                display: false,
                label: 'Cadets',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                // data: [500, 500, 450, 400, 490, 650, 700, 680, 680, 650, 640, 790]
                data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
            },
            {
                display: false,
                label: 'Juniors',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(192,75,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                // data: [500, 480, 550, 600, 790, 750, 600, 720, 780, 750, 540, 590]
                data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
            },
            {
                display: false,
                label: 'Seniors',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(192,192,75,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                // data: [500, 520, 550, 530, 500, 500, 500, 480, 470, 490, 500, 500]
                data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
            }
        ]
    })

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const getMatchHistory = (categId, matchHistoryFiltered, player) => {

        let tempArray = []

        tempArray = matchHistoryFiltered.filter(match => match.category._id === categId)

        // console.log(tempArray)

        let months = []
        let currentValueMatch = 500;

        const monthCount = (new Date().getMonth() >= 8 ? (new Date().getMonth()) - 8 : (new Date().getMonth()) + 8) + 1

        for (let i = 0; i < monthCount; i++) {

            let monthValues = tempArray.filter(match => (new Date(match.date).getMonth() >= 8 ? (new Date(match.date).getMonth()) - 8 : (new Date(match.date).getMonth()) + 8) == i)
            // console.log(i)
            // console.log(monthValues)
            if (monthValues.length != 0) {
                let test = monthValues.reduce((previousValue, currentValue) => {
                    let currPoints = ((player._id == currentValue.winner._id) ? currentValue.winnerPoints : currentValue.looserPoints)

                    // console.log(currentValue.winnerPoints)
                    // console.log(currentValue.looserPoints)
                    // console.log(currPoints)
                    return previousValue + currPoints
                }, 0)
                console.log(currentValueMatch)
                currentValueMatch += test
            }


            let value = currentValueMatch;

            months.push(value)
        }

        // tempArray = tempArray.map(row => (player._id == row.winner?._id ? (row.winnerPoints + row.winnerPreviousPoints) : (row.looserPoints + row.looserPreviousPoints)))

        // console.log(tempArray)

        return months
    }

    const fillChartData = (matchCategories, matchHistoryFiltered, player) => {

        let tempChartData = { ...chartData }
        tempChartData.datasets = []

        for (const categ of matchCategories) {
            tempChartData.datasets.push({
                display: false,
                label: categ.name,
                fill: false,
                lineTension: 0.3,
                backgroundColor: `rgba(${getRandomInt(75, 230)},${getRandomInt(75, 230)},${getRandomInt(75, 230)},1)`,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                // data: [500, 500, 450, 400, 490, 650, 700, 680, 680, 650, 640, 790]
                data: getMatchHistory(categ._id, matchHistoryFiltered, player)
            })
        }

        setChartData(tempChartData);
    }

    const getCategories = async (playerTemp, matchHistoryFiltered) => {

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


                    let tempCategories = [];

                    let startCount = false;

                    console.log(player);

                    let TempScores = {};


                    for (const categ of res.categories) {

                        if (categ._id == playerTemp.category._id) {
                            startCount = true;
                        }

                        if (startCount) {
                            tempCategories.push({
                                _id: categ._id,
                                name: categ.name,
                                center: true,
                                selector: row => row[categ.name],
                            })

                        }

                    }

                    tempCategories.reverse();

                    let tempScoresReversed = playerTemp.scores;
                    tempScoresReversed.reverse();

                    let index = 0;

                    for (const categ of tempCategories) {
                        TempScores[categ.name] = tempScoresReversed[index].score;
                        index++;
                    }

                    setScores([TempScores])


                    tempCategories.reverse();

                    setCategories(tempCategories);

                    fillChartData(tempCategories, matchHistoryFiltered, playerTemp)


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

                    let tempHistory = [...res.player.history]

                    let filteredData = tempHistory.filter(row => ((player._id == row.winner?._id ? row.winnerPoints : row.looserPoints) != 0))

                    setMatchHistory(filteredData)

                    getCategories(res.player, filteredData);



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

    const matchColumns = [
        {
            name: 'Competition',
            selector: row => row.competition.name,
            sortable: true,
            center: true,
            maxWidth: '220px',
        },
        {
            name: 'Categorie',
            selector: row => row.category.name,
            sortable: true,
            center: true,
            maxWidth: '220px',
        },
        {
            name: 'Vs',
            selector: row => player._id == row.winner._id ? `${row.looser.firstName} ${row.looser.lastName}` : `${row.winner.firstName} ${row.winner.lastName}`,
            sortable: true,
            center: true
        },
        {
            name: 'Points',
            selector: row => player._id == row.winner?._id ? row.winnerPoints : row.looserPoints,
            sortable: true,
            center: true
        },
        {
            id: "date",
            name: 'date',
            selector: row => (new Date(row.date)).getTime(),
            sortable: true,
            center: true,
            cell: row => <>{(new Date(row.date)).toLocaleDateString("fr-FR")}</>
        }

    ];

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
            selector: row => row.scores[player.category.__v - 1].score,
            sortable: true,
            center: true
        }

    ];

    const paginationComponentOptions = {
        noRowsPerPage: true,
        rangeSeparatorText: 'de',
    };


    const conditionalRowStyles = [
        {
            when: row => (player._id == row.winner?._id ? row.winnerPoints : row.looserPoints) > 0,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.3)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => (player._id == row.winner?._id ? row.winnerPoints : row.looserPoints) < 0,
            style: {
                backgroundColor: 'rgba(248, 148, 6, 0.3)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        // {
        //     when: row => (player._id == row.winner?._id ? row.winnerPoints : row.looserPoints) == 0,
        //     style: {
        //         backgroundColor: 'rgba(242, 38, 19, 0.9)',
        //         color: 'white',
        //         '&:hover': {
        //             cursor: 'not-allowed',
        //         },
        //     },
        // },
    ];


    return (
        <>

            {player.number && categories.length != 0 ?
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

                                {/* <div style={{ width: 150, height: 150, borderRadius: 15, overflow: "hidden", marginRight: 20 }}>
                                    <img src={profile} style={{ width: 150, height: 150 }} />
                                </div> */}

                                <div style={{ fontSize: 60, marginRight: 25 }}>{player.sex === "M" ? <Icon icon={faMale} /> : <Icon icon={faFemale} />}</div>

                                <div style={{ fontSize: 30, fontWeight: "bold" }}> {player.lastName} {player.firstName} {player.team?.name == "LB" && "(Joueur Libre)"} </div>

                            </div>

                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20, height: 110, borderRadius: 20 }}>

                                {/* <div style={{ fontSize: 20, fontWeight: "bold" }}>Score : {player.score}</div> */}

                                <DataTable
                                    columns={categories}
                                    data={scores}
                                    style={{ borderRadius: 20 }}
                                    paginationComponent={<></>}
                                    noHeader
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

                            </div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20 }}>
                                <div style={{ fontSize: 20, fontWeight: "bold" }}>Numero : {player.number}</div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", marginTop: 20 }}>
                                <div style={{ fontSize: 20, fontWeight: "bold" }}>Categorie : {player.category?.name}</div>
                            </div>

                            <Line
                                data={chartData}
                                style={{ width: 500, marginTop: 40 }}
                                options={{
                                    legend: {
                                        display: false,
                                        position: 'right'
                                    }
                                }}
                            />

                        </div>
                        {player.team?.name != "LB" &&
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: 550, gap: 15 }}>
                                <div style={{ fontSize: 20, fontWeight: "bold" }} >Equipe : {player.team?.name}</div>

                                <DataTable
                                    columns={columns}
                                    data={player.team?.players_v2}
                                    style={{ borderRadius: 20 }}
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

                            </div>}


                    </div>

                    <div style={{ width: "80%", marginLeft: "10%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
                        <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }} >Historique des matches</div>
                        <DataTable
                            columns={matchColumns}
                            data={matchHistory}
                            style={{ borderRadius: 20 }}
                            conditionalRowStyles={conditionalRowStyles}
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
                            defaultSortFieldId="date"
                            defaultSortAsc={false}
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
