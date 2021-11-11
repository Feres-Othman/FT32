import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import PlayerItem from './PlayerItem';
import { Dropdown, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../Molecules/DrpDown';
import Btn from '../Molecules/Btn';
import { useHistory, useParams } from 'react-router-dom';
import TeamPlayers from './team/TeamPlayers';
import Contest from './team/Contest';
import DoubleContest from './team/DoubleContest';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import IndivPlayers from './indiv/IndivPlayers';
import IndivContest from './indiv/IndivContest';

export default function AddMatch() {

    const history = useHistory();

    const { comp, cat } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const types = [
        {
            _id: 1,
            name: "Championnat individuel – phase nationale + TOP 5",
            isTeam: false
        },
        {
            _id: 2,
            name: "Championnat individuel – phase régionale ",
            isTeam: false
        },
        {
            _id: 10,
            name: "Super Championnat individuel",
            isTeam: false
        },
        {
            _id: 11,
            name: "Coupe des individuelles",
            isTeam: false
        },
        {
            _id: 3,
            name: "Critérium national",
            isTeam: false
        },
        {
            _id: 4,
            name: "Critérium régional ",
            isTeam: false
        },
        {
            _id: 5,
            name: "Championnat par équipe – super div nationale",
            isTeam: true
        },
        {
            _id: 6,
            name: "Championnat par équipe –div nationale 1 et 2",
            isTeam: true
        },
        {
            _id: 7,
            name: "Championnat par équipe jeune – phase régionale et inter - régionale",
            isTeam: true
        },
        {
            _id: 8,
            name: "Championnat par équipe jeune –phase finale ",
            isTeam: true
        },
        {
            _id: 9,
            name: "Coupe de Tunisie par équipes",
            isTeam: true
        },

    ]

    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [category, setCategory] = useState({})
    const [competition, setCompetition] = useState(types.filter(type => type._id == comp)[0] || {})



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

    useEffect(() => {
        setTeam1Player1({})
        setTeam1Player2({})
        setTeam2Player1({})
        setTeam2Player2({})
    }, [playerA,
        playerB,
        playerC,
        playerX,
        playerY,
        playerZ])

    const [teamContests, setTeamContests] = useState([
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
            isDouble: true,
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

    const [team1Player1, setTeam1Player1] = useState({})
    const [team1Player2, setTeam1Player2] = useState({})
    const [team2Player1, setTeam2Player1] = useState({})
    const [team2Player2, setTeam2Player2] = useState({})

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


    const setTeamMatches = (array, index, sc1, sc2) => {

        let temp = teamContests;

        temp[index].matches = array;
        temp[index].player1Score = sc1;
        temp[index].player2Score = sc2;

        setTeamContests([...temp]);

    }

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

                    if (cat) {
                        setCategory(res.categories.filter(categ => categ._id == cat)[0])
                    }
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    const submit = async (isTeam) => {

        if (!isTeam) {
            if (contests[0].player1Score === 0 && contests[0].player2Score === 0) {
                notifier.warning("aucun des joueurs n'a gagné");
                return;
            }

            if (contests[0].player1Score < 3 && contests[0].player2Score < 3) {
                notifier.warning("aucun des joueurs n'a gagné");
                return;
            }
        } else {
            if (teamScore(teamContests, 1) === 0 && teamScore(teamContests, 2) === 0) {
                notifier.warning("aucun des equipes n'a gagné");
                return;
            }

            // if (!team1Player1) {
            //     notifier.warning("veuillez sélectionner le premier joueur de l'équipe 1 pour le match de double");
            //     return;
            // }

            // if (!team1Player2) {
            //     notifier.warning("veuillez sélectionner le deuxième joueur de l'équipe 1 pour le match de double");
            //     return;
            // }

            // if (!team2Player1) {
            //     notifier.warning("veuillez sélectionner le premier joueur de l'équipe 2 pour le match de double");
            //     return;
            // }

            // if (!team2Player2) {
            //     notifier.warning("veuillez sélectionner le deuxième joueur de l'équipe 2 pour le match de double");
            //     return;
            // }

        }


        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let content = {
            competition,
            category,
            team1,
            team2,
            isTeam,

            team1Player1,
            team1Player2,
            team2Player1,
            team2Player2,

            playerA,
            playerB,
            playerC,

            playerX,
            playerY,
            playerZ,

            contests,
            teamContests,

        }

        axios.post("/api/match/create", content, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    if (isTeam) {
                        notifier.success("match ajoutee");
                        history.push("/players");
                    } else {
                        notifier.success("match ajoutee");
                        history.push(`/match/add/${competition._id}/${category._id}`);
                        history.go(0)
                    }

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
            finalCategories.push(element?._id);
        }

        console.log(finalCategories)
        setSelectedCategories([...finalCategories]);

        if (!competition?._id) {
            notifier.info("veuillez sélectionner un type de compétition")
        }

    }, [category])

    // let history = useHistory();

    const genders = [{
        _id: "F",
        name: "Femme"
    },
    {
        _id: "M",
        name: "Homme"
    },
    {
        _id: "X",
        name: "Tout"
    }]
    const [gender, setGender] = useState({})

    return (
        <div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "start",
                flexWrap: "wrap",
                width: "90%",
                marginTop: 60,
                // paddingTop: "20vh",
                // backgroundColor: "red",
                marginLeft: "5%",
                textAlign: 'center',
                gap: 20
                // overflowY: "scroll"
            }} >
                <Dropdown style={{ width: "30%", minWidth: 350 }}>

                    <Dropdown.Toggle variant="success" variant="Primary"
                        style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%" }}>
                        {competition?.name || "Selectionner une type de compétition"}
                    </Dropdown.Toggle>

                    <div style={{ borderRadius: 15, zIndex: 100 }}>
                        <Dropdown.Menu style={{ width: 600, zIndex: 100 }}>

                            {types.map((item, index) => (
                                <Dropdown.Item key={item._id} onClick={() => { setCompetition(item); }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                    <div style={{ paddingTop: 10 }} >{item.name}</div>
                                </Dropdown.Item>
                            ))}

                        </Dropdown.Menu>
                    </div>

                </Dropdown>

                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={genders} setData={setGender} data={gender} > Selectionner une Genre </DrpDown>
                {/* <DrpDown dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown> */}
                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>

            </div >


            {
                competition.isTeam === true ?
                    <>
                        {
                            selectedCategories.length > 0 && <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "stretch",
                                flexWrap: "wrap",
                                width: "90%",
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
                                    teamScore={teamScore(teamContests, 1)}
                                    gender={gender}
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
                                    teamScore={teamScore(teamContests, 2)}
                                    gender={gender}
                                />
                            </div >
                        }


                        {
                            (playerA.number && playerB.number && playerC.number && playerX.number && playerY.number && playerZ.number) &&

                            <div style={{
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
                                    matches={teamContests[0].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerB}
                                    player2={playerY}
                                    player1Order={"B"}
                                    player2Order={"Y"}
                                    contestIndex={1}
                                    matches={teamContests[1].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerC}
                                    player2={playerZ}
                                    player1Order={"C"}
                                    player2Order={"Z"}
                                    contestIndex={2}
                                    matches={teamContests[2].matches}
                                    setMatches={setTeamMatches}
                                />

                                <DoubleContest
                                    players1={[playerA, playerB, playerC]}
                                    players2={[playerX, playerY, playerZ]}
                                    player1Order={"Double"}
                                    player2Order={"Double"}
                                    contestIndex={8}

                                    team1Player1={team1Player1}
                                    setTeam1Player1={setTeam1Player1}
                                    team1Player2={team1Player2}
                                    setTeam1Player2={setTeam1Player2}
                                    team2Player1={team2Player1}
                                    setTeam2Player1={setTeam2Player1}
                                    team2Player2={team2Player2}
                                    setTeam2Player2={setTeam2Player2}

                                    matches={teamContests[8].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerB}
                                    player2={playerX}
                                    player1Order={"B"}
                                    player2Order={"X"}
                                    contestIndex={3}
                                    matches={teamContests[3].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerA}
                                    player2={playerZ}
                                    player1Order={"A"}
                                    player2Order={"Z"}
                                    contestIndex={4}
                                    matches={teamContests[4].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerC}
                                    player2={playerY}
                                    player1Order={"C"}
                                    player2Order={"Y"}
                                    contestIndex={5}
                                    matches={teamContests[5].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerB}
                                    player2={playerZ}
                                    player1Order={"B"}
                                    player2Order={"Z"}
                                    contestIndex={6}
                                    matches={teamContests[6].matches}
                                    setMatches={setTeamMatches}
                                />

                                <Contest
                                    player1={playerA}
                                    player2={playerY}
                                    player1Order={"A"}
                                    player2Order={"Y"}
                                    contestIndex={7}
                                    matches={teamContests[7].matches}
                                    setMatches={setTeamMatches}
                                />
                            </div >
                        }

                        {
                            (playerA.number && playerB.number && playerC.number && playerX.number && playerY.number && playerZ.number) &&
                            <Btn style={{ backgroundColor: "green", width: "90%", marginLeft: "5%", marginTop: 40, marginBottom: 40 }} onClick={e => { submit(true); }} >
                                Valider
                            </Btn>

                        }
                    </> :

                    <>

                        <>
                            {
                                selectedCategories.length > 0 && competition.isTeam === false &&

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    flexWrap: "wrap",
                                    width: "90%",
                                    // backgroundColor: "red",
                                    marginLeft: "5%",
                                    textAlign: 'center',
                                    gap: 20,
                                    marginTop: 20
                                    // overflowY: "scroll"
                                }} >

                                    <IndivPlayers
                                        number={1}
                                        teams={teams}
                                        player1={playerA}
                                        setPlayer1={setPlayerA}
                                        categories={selectedCategories}
                                        isValidated={isValidated}
                                        teamScore={teamScore(contests, 1)}
                                        gender={gender}
                                    />

                                    <div style={{ maxWidth: 100, minWidth: 50, fontSize: 20, textAlign: 'center', color: isValidated ? "#bb5555" : "#55bb55", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                        {(playerA.number && playerX.number && !isValidated) && <Icon onClick={() => { setIsValidated(true) }} icon={faCheckCircle} size="lg" />}
                                        {(playerA.number && playerX.number && isValidated) && <Icon onClick={() => { setIsValidated(false) }} icon={faTimesCircle} size="lg" />}
                                    </div>

                                    <IndivPlayers
                                        number={2}
                                        teams={teams}
                                        player1={playerX}
                                        setPlayer1={setPlayerX}
                                        categories={selectedCategories}
                                        isValidated={isValidated}
                                        teamScore={teamScore(contests, 2)}
                                        gender={gender}
                                    />
                                </div >
                            }


                            {
                                (playerA.number && playerX.number) &&

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "90%",
                                    marginLeft: "5%",
                                    textAlign: 'center',
                                    gap: 20,
                                    marginTop: 20,
                                    flexWrap: "wrap"
                                    // overflowY: "scroll"
                                }} >

                                    <IndivContest
                                        player1={playerA}
                                        player2={playerX}
                                        player1Order={"1"}
                                        player2Order={"2"}
                                        contestIndex={0}
                                        matches={contests[0].matches}
                                        setMatches={setMatches}
                                    />
                                </div >
                            }

                        </>

                        {
                            (playerA.number && playerX.number) &&
                            <Btn style={{ backgroundColor: "green", width: "90%", marginLeft: "5%", marginTop: 40, marginBottom: 40 }} onClick={e => { submit(false) }} >
                                Valider
                            </Btn>

                        }

                    </>
            }


        </div >

    )
}
