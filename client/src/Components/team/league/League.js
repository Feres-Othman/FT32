
import LeagueDays from './LeagueDays'
import Pools from './Pools'
import TeamPoints from './TeamPoints'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { RContext } from '../../../RContext'

function League() {
    const { id } = useParams();
    const [selectedPool, setSelectedPool] = useState({
        _id: 0,
        name: "Poule A"
    })

    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    const [data, setData] = useState({
        type: {
            _id: 5,
            name: "Championnat par équipe - super div nationale",
            isTeam: true,
        },
        title: "Calendrier et résultats Ligue des champions 2021-2022",
        pools: [
            // {
            //     name: "Poule A",
            //     teams: [
            //         {
            //             name: "AchS",
            //             won: 4,
            //             forfit: 0,
            //             lost: 2,
            //             p: 18,
            //             c: 10,
            //         },
            //         {
            //             name: "Ars",
            //             points: 11,
            //             played: 6,
            //             won: 3,
            //             forfit: 2,
            //             lost: 1,
            //             p: 13,
            //             c: 8,
            //             scoreChange: 5
            //         },
            //         {
            //             name: "Ams",
            //             points: 7,
            //             played: 6,
            //             won: 2,
            //             forfit: 1,
            //             lost: 3,
            //             p: 15,
            //             c: 14,
            //             scoreChange: 1
            //         },
            //         {
            //             name: "As",
            //             points: 4,
            //             played: 6,
            //             won: 1,
            //             forfit: 1,
            //             lost: 4,
            //             p: 6,
            //             c: 20,
            //             scoreChange: -14
            //         }
            //     ],
            //     days: [
            //         {
            //             date: "15 sep",
            //             matches: [
            //                 {
            //                     team1: "AchS",
            //                     team2: "Ams",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 },
            //                 {
            //                     team1: "As",
            //                     team2: "Ars",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 },
            //                 {
            //                     team1: "As",
            //                     team2: "Ars",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 },
            //                 {
            //                     team1: "As",
            //                     team2: "Ars",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 }
            //             ]
            //         },
            //         {
            //             date: "28 sep",
            //             matches: [
            //                 {
            //                     team1: "AchS",
            //                     team2: "Ams",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 },
            //                 {
            //                     team1: "As",
            //                     team2: "Ars",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 }
            //             ]
            //         },
            //         {
            //             date: "19 oct",
            //             matches: [
            //                 {
            //                     team1: "AchS",
            //                     team2: "Ams",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 },
            //                 {
            //                     team1: "As",
            //                     team2: "Ars",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 }
            //             ]
            //         },
            //         {
            //             date: "3 nov",
            //             matches: [
            //                 {
            //                     team1: "AchS",
            //                     team2: "Ams",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 },
            //                 {
            //                     team1: "As",
            //                     team2: "Ars",
            //                     team1Score: 6,
            //                     team2Score: 3,
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ]
    })

    const [day, setDay] = useState({})

    const history = useHistory();

    const playLeague = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }
        if (!day) return;
        axios.post(`/api/league/play`, {
            _id: id,
            pool: selectedPool._id,
            day: day

        }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) history.go(0)
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

        axios.post(`/api/league/read/one/${id}`, {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    console.log(res)

                    let tempData = { ...data }

                    tempData.pools = [...res.league.pools]
                    tempData.title = res.league.calendar.name + " - " + new Date(res.league.calendar.startDate).toLocaleDateString("fr-FR")

                    setData({ ...tempData });




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


    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 50, flexWrap: "wrap" }}>
                <h2 style={{ marginBottom: 70 }}>{data.type.name}</h2>
                <Pools pools={data.pools} selectedPool={selectedPool} setSelectedPool={setSelectedPool} />
            </div>
            <h3 style={{ marginBottom: 70, marginTop: 70 }}>{data.title} : {data?.pools[selectedPool._id]?.name}</h3>
            <TeamPoints teams={data?.pools[selectedPool._id]?.teams || []} />
            <LeagueDays isLoggedIn={isLoggedIn} playLeague={playLeague} setDay={setDay} day={day} days={data?.pools[selectedPool._id]?.days || []} />
        </div>
    )
}

export default League