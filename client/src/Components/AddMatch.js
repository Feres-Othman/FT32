import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { Dropdown, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import { useHistory } from 'react-router-dom';
import TeamPlayers from './TeamPlayers';
import Contest from './Contest';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

export default function AddMatch() {


    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const types = [
        "Championnat individuel – phase nationale + TOP 6",
        "Championnat individuel – phase régionale ",
        "Critérium national",
        "Critérium régional ",
        "Championnat par équipe – super div nationale",
        "Championnat par équipe –div nationale 1 et 2",
        "Championnat par équipe jeune – phase régionale et inter - régionale",
        "Championnat par équipe jeune –phase finale ",
        "Coupe de Tunisie par équipes"
    ]

    const genders = [{
        _id: "F",
        name: "Femme"
    },
    {
        _id: "M",
        name: "Homme"
    }]
    const [gender, setGender] = useState({})

    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [category, setCategory] = useState({})

    const [teams, setTeams] = useState([])
    const [team1, setTeam1] = useState({})
    const [team2, setTeam2] = useState({})

    const [playerA, setPlayerA] = useState({})
    const [playerB, setPlayerB] = useState({})
    const [playerC, setPlayerC] = useState({})
    const [playerX, setPlayerX] = useState({})
    const [playerY, setPlayerY] = useState({})
    const [playerZ, setPlayerZ] = useState({})


    const [isValidated, setIsValidated] = useState(false)

    const [contests, setContests] = useState([
        {
            player1Score: 0,
            player2Score: 0,
            matches: [
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                }
            ]
        },

        {
            player1Score: 0,
            player2Score: 0,
            matches: [
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                }
            ]
        },

        {
            player1Score: 0,
            player2Score: 0,
            matches: [
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                }
            ]
        },

        {
            player1Score: 0,
            player2Score: 0,
            matches: [
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                }
            ]
        },

        {
            player1Score: 0,
            player2Score: 0,
            matches: [
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                }
            ]
        },

        {
            player1Score: 0,
            player2Score: 0,
            matches: [
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                },
                {
                    player1Score: 0,
                    player2Score: 0
                }
            ]
        },
    ])


    const setMatches = (array, index, sc1, sc2) => {

        let temp = contests;

        temp[index].matches = array;
        temp[index].player1Score = sc1;
        temp[index].player2Score = sc2;

        setContests([...temp]);

    }



    const teamScore = (array, side) => {

        let score = 0;

        if (side == 1) {
            for (const item of array) {
                if (item.player1Score == 3) {
                    score++;
                }
            }
        } else {
            for (const item of array) {
                if (item.player2Score == 3) {
                    score++;
                }
            }
        }

        return score;

    }


    const getCategories = async () => {

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


                    setCategories(res.categories);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getCategories();
    }, [])


    const getTeams = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/team/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    setTeams(res.teams);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getTeams();
    }, [])

    useEffect(() => {

        if (categories.length == 0) {
            return;
        }

        let finalCategories = [];

        let i = 0;

        for (i = 0; i < categories.length; i++) {
            const element = categories[i];

            if (element._id == category._id) {
                break;
            }

        }

        for (let j = 0; j <= i; j++) {
            const element = categories[j];
            finalCategories.push(element._id);
        }

        console.log(finalCategories)
        setSelectedCategories([...finalCategories]);

    }, [category])

    // let history = useHistory();

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "start",
                flexWrap: "wrap",
                width: "90%",
                // paddingTop: "20vh",
                // backgroundColor: "red",
                marginLeft: "5%",
                textAlign: 'center',
                gap: 20
                // overflowY: "scroll"
            }} >
                <Dropdown style={{ maxWidth: 600, minWidth: 400 }}>

                    <Dropdown.Toggle variant="success" variant="Primary"
                        style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%" }}>
                        Selectionner une type de compétition
                    </Dropdown.Toggle>

                    <div style={{ borderRadius: 15, zIndex: 100 }}>
                        <Dropdown.Menu style={{ width: '100%', zIndex: 100 }}>

                            {types.map((item, index) => (
                                <Dropdown.Item key={item._id} onClick={() => { }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                    <div style={{ paddingTop: 10 }} >{item}</div>
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </div>

                </Dropdown>

                <div style={{ maxWidth: 100, minWidth: 50 }}>

                </div>

                <DrpDown style={{ maxWidth: 600, minWidth: 400 }} dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>

            </div >

            {
                selectedCategories.length > 0 && <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    flexWrap: "wrap",
                    width: "90%",
                    // paddingTop: "20vh",
                    // backgroundColor: "red",
                    marginLeft: "5%",
                    textAlign: 'center',
                    gap: 20,
                    marginTop: 20
                    // overflowY: "scroll"
                }} >

                    <TeamPlayers
                        number={1}
                        team={team1}
                        setTeam={setTeam1}
                        teams={teams}
                        player1={playerA}
                        setPlayer1={setPlayerA}
                        player2={playerB}
                        setPlayer2={setPlayerB}
                        player3={playerC}
                        setPlayer3={setPlayerC}
                        categories={selectedCategories}
                        isValidated={isValidated}
                        teamScore={teamScore(contests, 1)}
                    />
                    <div style={{ maxWidth: 100, minWidth: 50, fontSize: 20, textAlign: 'center', color: isValidated ? "#bb5555" : "#55bb55", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        {(playerA.number && playerB.number && playerC.number && playerX.number && playerY.number && playerZ.number && !isValidated) && <Icon onClick={() => { setIsValidated(true) }} icon={faCheckCircle} size="lg" />}
                        {(playerA.number && playerB.number && playerC.number && playerX.number && playerY.number && playerZ.number && isValidated) && <Icon onClick={() => { setIsValidated(false) }} icon={faTimesCircle} size="lg" />}
                    </div>
                    <TeamPlayers
                        number={2}
                        team={team2}
                        setTeam={setTeam2}
                        teams={teams}
                        player1={playerX}
                        setPlayer1={setPlayerX}
                        player2={playerY}
                        setPlayer2={setPlayerY}
                        player3={playerZ}
                        setPlayer3={setPlayerZ}
                        categories={selectedCategories}
                        isValidated={isValidated}
                        teamScore={teamScore(contests, 2)}
                    />
                </div >
            }


            {
                (playerA.number && playerB.number && playerC.number && playerX.number && playerY.number && playerZ.number) && <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    // paddingTop: "20vh",
                    // backgroundColor: "red",
                    marginLeft: "5%",
                    textAlign: 'center',
                    gap: 20,
                    marginTop: 20,
                    flexWrap: "wrap"
                    // overflowY: "scroll"
                }} >

                    <Contest
                        player1={playerA}
                        player2={playerX}
                        player1Order={"A"}
                        player2Order={"X"}
                        contestIndex={0}
                        matches={contests[0].matches}
                        setMatches={setMatches}
                    />

                    <Contest
                        player1={playerB}
                        player2={playerY}
                        player1Order={"B"}
                        player2Order={"Y"}
                        contestIndex={1}
                        matches={contests[1].matches}
                        setMatches={setMatches}
                    />

                    <Contest
                        player1={playerC}
                        player2={playerZ}
                        player1Order={"C"}
                        player2Order={"Z"}
                        contestIndex={2}
                        matches={contests[2].matches}
                        setMatches={setMatches}
                    />

                    <Contest
                        player1={playerB}
                        player2={playerX}
                        player1Order={"B"}
                        player2Order={"X"}
                        contestIndex={3}
                        matches={contests[3].matches}
                        setMatches={setMatches}
                    />

                    <Contest
                        player1={playerA}
                        player2={playerZ}
                        player1Order={"A"}
                        player2Order={"Z"}
                        contestIndex={4}
                        matches={contests[4].matches}
                        setMatches={setMatches}
                    />

                    <Contest
                        player1={playerC}
                        player2={playerY}
                        player1Order={"C"}
                        player2Order={"Y"}
                        contestIndex={5}
                        matches={contests[5].matches}
                        setMatches={setMatches}
                    />
                </div >
            }

        </div >

    )
}