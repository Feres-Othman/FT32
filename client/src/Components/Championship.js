import React, { useContext, useEffect, useState, useMemo } from 'react'
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
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import profile from '../Medias/avatar.jpg'
import FilterComponent from './FilterComponent';
import stc from 'string-to-color';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner'
export default function Profile() {

    const { id } = useParams();
    let history = useHistory();
    const [championship, setChampionship] = useStateWithCallbackLazy({})
    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    const [chartData, setChartData] = useState({
        labels: [
            'Zone A',
            'Zone B',
            'Zone C',
            'Zone D'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [50, 50, 50, 50],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(25, 205, 86)'

            ],
            hoverOffset: 4
        }]
    })

    const [teamChartData, setTeamChartData] = useState({
        labels: [],
        datasets: [{
            label: 'My First Dataset',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
        }]
    })

    const doesExist = (id, teams) => {
        for (const team of teams) {
            if (team._id == id) {
                return true;
            }
        }

        return false
    }

    const getTeams = (players) => {
        let teams = []
        for (const player of players) {
            if (!doesExist(player.team._id, teams)) {
                teams.push(player.team)
            }

        }
        return teams;
    }

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


                    let tempPhase = res.championship.phase1;

                    for (const i in tempPhase) {

                        tempPhase[i].phase1 = getScoreFronIndex(i);
                        tempPhase[i].phase2 = getScoreFronIndex(getIndex(res.championship.phase2, tempPhase[i]._id));
                        tempPhase[i].phase3 = getScoreFronIndex(getIndex(res.championship.phase3, tempPhase[i]._id));
                        tempPhase[i].total = tempPhase[i].phase1 + tempPhase[i].phase2 + tempPhase[i].phase3;

                    }

                    const reducer = (previousValue, currentValue) => previousValue + currentValue.total;
                    let zoneA = tempPhase.filter((item) => (item.team.zone === "A")).reduce(reducer, 0);
                    let zoneB = tempPhase.filter((item) => (item.team.zone === "B")).reduce(reducer, 0);
                    let zoneC = tempPhase.filter((item) => (item.team.zone === "C")).reduce(reducer, 0);
                    let zoneD = tempPhase.filter((item) => (item.team.zone === "D")).reduce(reducer, 0);
                    console.log(zoneA);
                    let tempData = { ...chartData }
                    tempData.datasets[0].data = [zoneA, zoneB, zoneC, zoneD]
                    setChartData({ ...tempData })

                    console.log(tempData);
                    let teams = getTeams(tempPhase)

                    let tempTeamData = { ...teamChartData };

                    tempTeamData.labels = teams.map(item => item.name)
                    tempTeamData.datasets[0].backgroundColor = teams.map(item => stc(item._id))

                    tempTeamData.datasets[0].data = teams.map(team => tempPhase.filter((item) => (item.team._id === team._id)).reduce(reducer, 0))

                    setTeamChartData(tempTeamData)


                    let tempPhaseSorted = tempPhase.sort((firstEl, secondEl) => {

                        // console.log(getTotal(res.championship.phase1, res.championship.phase2, res.championship.phase3, firstEl._id))
                        // console.log(getTotal(res.championship.phase1, res.championship.phase2, res.championship.phase3, secondEl._id))

                        if (firstEl.total < secondEl.total) {
                            return 1;
                        }
                        if (firstEl.total > secondEl.total) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;

                    })

                    tempPhase = [...tempPhaseSorted];

                    for (const i in tempPhase) {

                        tempPhase[i].rang = i;

                    }

                    let tempchampionship = res.championship;

                    tempchampionship.phase1 = [...tempPhase];

                    setChampionship({ ...tempchampionship });




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
        if (!phase) return Infinity;
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

    // const getTotal = (phase1, phase2, phase3, id) => getScoreFronIndex(getIndex(phase1, id)) + getScoreFronIndex(getIndex(phase2, id)) + getScoreFronIndex(getIndex(phase3, id))

    const columns = [
        {
            name: 'Rang',
            selector: row => -(-row.rang - 1),
            sortable: true,
            center: true
        },
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
            name: 'Equipe',
            selector: row => row.team.name,
            sortable: true,
            center: true
        },
        {
            name: 'Zone',
            selector: row => row.team.zone,
            sortable: true,
            center: true
        },
        {
            name: 'phase 1',
            selector: row => row.phase1,
            sortable: true,
            center: true
        },
        {
            name: 'phase 2',
            selector: row => row.phase2,
            sortable: true,
            center: true
        },
        {
            name: 'phase 3',
            selector: row => row.phase3,
            sortable: true,
            center: true
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
            center: true
        }

    ];

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
    const filteredItems = championship.phase1?.filter(
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

            {championship ?

                <div style={{ width: "80%", marginLeft: "10%", display: "flex", flexDirection: "column", justifyContent: "left", alignItems: 'left', marginTop: 40, marginBottom: 40 }}>
                    <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 40, textAlign: 'center', width: "100%" }} >Classement</div>

                    <div style={{ display: 'flex', flexDirection: isSmall ? "column" : "row", justifyContent: "space-around", alignItems: "center", marginBottom: 50 }}>
                        <div style={{ width: isSmall ? "70vw" : "20vw" }}>
                            <Doughnut
                                key={Math.random()}
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

                        <div style={{ width: isSmall ? "80vw" : "20vw" }}>
                            <Pie
                                key={Math.random()}
                                data={teamChartData}
                                style={{ width: 500, marginTop: 40 }}
                                options={{
                                    legend: {
                                        display: false,
                                        position: 'right'
                                    }
                                }}
                            />

                        </div>

                    </div>

                    <DataTable
                        columns={columns}
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
                            <div style={{ padding: 30, fontSize: 17, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                                Veuillez patienter pendant que nous apportons les données souhaitées
                                <Bars
                                    heigth="100"
                                    width="100"
                                    color='grey'
                                />
                            </div>
                        }
                    // defaultSortFieldId="Total"
                    // defaultSortAsc={false}
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
