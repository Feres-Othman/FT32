import React, { useState } from 'react'
import LeagueDays from './LeagueDays'
import Pools from './Pools'
import TeamPoints from './TeamPoints'

function League() {

    const [selectedPool, setSelectedPool] = useState({
        _id: 0,
        name: "Poule A"
    })

    const data = {
        type: {
            _id: 5,
            name: "Championnat par équipe - super div nationale",
            isTeam: true,
        },
        title: "Calendrier et résultats Ligue des champions 2021-2022",
        pools: [
            {
                name: "Poule A",
                teams: [
                    {
                        name: "AchS",
                        points: 12,
                        played: 6,
                        won: 4,
                        forfit: 0,
                        lost: 2,
                        p: 18,
                        c: 10,
                        scoreChange: 8
                    },
                    {
                        name: "Ars",
                        points: 11,
                        played: 6,
                        won: 3,
                        forfit: 2,
                        lost: 1,
                        p: 13,
                        c: 8,
                        scoreChange: 5
                    },
                    {
                        name: "Ams",
                        points: 7,
                        played: 6,
                        won: 2,
                        forfit: 1,
                        lost: 3,
                        p: 15,
                        c: 14,
                        scoreChange: 1
                    },
                    {
                        name: "As",
                        points: 4,
                        played: 6,
                        won: 1,
                        forfit: 1,
                        lost: 4,
                        p: 6,
                        c: 20,
                        scoreChange: -14
                    }
                ],
                days: [
                    {
                        date: "15 sep",
                        matches: [
                            {
                                team1: "AchS",
                                team2: "Ams",
                                team1Score: 6,
                                team2Score: 3,
                            },
                            {
                                team1: "As",
                                team2: "Ars",
                                team1Score: 6,
                                team2Score: 3,
                            }
                        ]
                    },
                    {
                        date: "28 sep",
                        matches: [
                            {
                                team1: "AchS",
                                team2: "Ams",
                                team1Score: 6,
                                team2Score: 3,
                            },
                            {
                                team1: "As",
                                team2: "Ars",
                                team1Score: 6,
                                team2Score: 3,
                            }
                        ]
                    },
                    {
                        date: "19 oct",
                        matches: [
                            {
                                team1: "AchS",
                                team2: "Ams",
                                team1Score: 6,
                                team2Score: 3,
                            },
                            {
                                team1: "As",
                                team2: "Ars",
                                team1Score: 6,
                                team2Score: 3,
                            }
                        ]
                    },
                    {
                        date: "3 nov",
                        matches: [
                            {
                                team1: "AchS",
                                team2: "Ams",
                                team1Score: 6,
                                team2Score: 3,
                            },
                            {
                                team1: "As",
                                team2: "Ars",
                                team1Score: 6,
                                team2Score: 3,
                            }
                        ]
                    }
                ]
            }
        ]


    }

    return (
        <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", paddingTop: 100, paddingBottom: 100 }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 50, flexWrap: "wrap" }}>
                <h2 style={{ marginBottom: 70 }}>{data.type.name}</h2>
                <Pools pools={data.pools} selectedPool={selectedPool} setSelectedPool={setSelectedPool} />
            </div>
            <h3 style={{ marginBottom: 70, marginTop: 70 }}>{data.title} : {data.pools[selectedPool._id].name}</h3>
            <TeamPoints teams={data.pools[selectedPool._id].teams} />
            <LeagueDays days={data.pools[selectedPool._id].days} />
        </div>
    )
}

export default League