import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../../../RContext'
import { DesignContext } from '../../../DesignContext';
import { Dropdown, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../../../Molecules/DrpDown';
import Btn from '../../../Molecules/Btn';
import Input from '../../../Molecules/Input';

import { useHistory, useParams } from 'react-router-dom';

import PlayersBonusList from '../../PlayersBonusListClassement';
import PoolAdd from './PoolAdd';

export default function AddMatch() {

    const history = useHistory();

    const { comp, cat } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)


    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [category, setCategory] = useState({})
    const [phaseNumber, setPhaseNumber] = useState(0)

    const [poolNumber, setPoolNumber] = useState(3)

    const [teams, setTeams] = useState([])
    const [pools, setPools] = useState([])

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


    const types = [
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
        }

    ]


    const [type, setType] = useState({})

    const submit = async (isTeam) => {


        // var session = Ls.getObject('session', { 'isLoggedIn': false });
        // let config = {
        //     headers: {
        //         "auth-token": session.token,
        //     }
        // }

        // let content = {
        //     category: category._id,
        //     type: type,
        //     gender: gender._id,
        //     players1: [[...players1[0].map(item => item._id)], [...players1[1].map(item => item._id)], [...players1[2].map(item => item._id)]],
        //     players2: [[...players2[0].map(item => item._id)], [...players2[1].map(item => item._id)], [...players2[2].map(item => item._id)]],
        //     players3: [[...players3[0].map(item => item._id)], [...players3[1].map(item => item._id)], [...players3[2].map(item => item._id)]],
        //     players4: [[...players4[0].map(item => item._id)], [...players4[1].map(item => item._id)], [...players4[2].map(item => item._id)]],
        //     players5: [[...players5[0].map(item => item._id)], [...players5[1].map(item => item._id)], [...players5[2].map(item => item._id)]],
        //     players6: [[...players6[0].map(item => item._id)], [...players6[1].map(item => item._id)], [...players6[2].map(item => item._id)]],
        //     players7: [[...players7[0].map(item => item._id)], [...players7[1].map(item => item._id)], [...players7[2].map(item => item._id)]],
        //     players8: [[...players8[0].map(item => item._id)], [...players8[1].map(item => item._id)], [...players8[2].map(item => item._id)]],

        // }

        // axios.post("/api/player/championship", content, config)
        //     .then((response) => {
        //         let res = response.data;
        //         if (res.success) {

        //             // if (isTeam) {
        //             //     notifier.success("match ajoutee");
        //             //     history.push("/");
        //             // } else {
        //             //     notifier.success("match ajoutee");
        //             //     history.go(0)
        //             // }
        //             notifier.success("Classement ajoute");
        //             history.push("/");
        //         } else {
        //             console.log(res)
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

    }



    const setPlayers = (setPlayersNumber, playersNumber, item) => {

        // let tempPlayers = [...playersNumber];

        // tempPlayers[phaseNumber] = [...playersNumber[phaseNumber], item]

        // setPlayersNumber([...tempPlayers])

    }

    const addToList = (item, index) => {

        // if (index == 0) {


        //     if (players1[phaseNumber].length >= 1) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     // setPlayers1([...players1, item])
        //     setPlayers(setPlayers1, players1, item)


        // } else if (index == 1) {


        //     if (players2[phaseNumber].length >= 1) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers2, players2, item)

        // } else if (index == 2) {


        //     if (players3[phaseNumber].length >= 1) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers3, players3, item)

        // } else if (index == 3) {


        //     if (players4[phaseNumber].length >= 1) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers4, players4, item)

        // } else if (index == 4) {


        //     if (players5[phaseNumber].length >= 4) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers5, players5, item)

        // } else if (index == 5) {


        //     if (players6[phaseNumber].length >= 8) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers6, players6, item)

        // } else if (index == 6) {


        //     if (players7[phaseNumber].length >= 8) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers7, players7, item)

        // } else if (index == 7) {


        //     if (players8[phaseNumber].length >= 8) {
        //         notifier.info("ce niveau a atteint son max de joueurs");
        //         return;
        //     }
        //     setPlayers(setPlayers8, players8, item)

        // }


    }


    const removePlayers = (setPlayersNumber, playersNumber, item) => {

        // let tempPlayers = [...playersNumber];

        // tempPlayers[phaseNumber] = [...tempPlayers[phaseNumber].filter(player => player._id != item._id)]

        // setPlayersNumber([...tempPlayers])

    }

    const removeFromList = (item, index) => {

        // if (index == 0) {
        //     removePlayers(setPlayers1, players1, item)
        // } else if (index == 1) {
        //     removePlayers(setPlayers2, players2, item)
        // } else if (index == 2) {
        //     removePlayers(setPlayers3, players3, item)
        // } else if (index == 3) {
        //     removePlayers(setPlayers4, players4, item)
        // } else if (index == 4) {
        //     removePlayers(setPlayers5, players5, item)
        // } else if (index == 5) {
        //     removePlayers(setPlayers6, players6, item)
        // } else if (index == 6) {
        //     removePlayers(setPlayers7, players7, item)
        // } else if (index == 7) {
        //     removePlayers(setPlayers8, players8, item)
        // }


    }

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

                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={genders} setData={setGender} data={gender} > Selectionner un Genre </DrpDown>
                <DrpDown style={{ width: "30%", minWidth: 450 }} dataset={types} setData={setType} data={type} > Selectionner une competition </DrpDown>
                {/* <DrpDown dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown> */}
                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>
                <Input handleChange={(value) => {
                    setPoolNumber(parseInt(value));
                    setPools(Array(poolNumber).fill({
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
                    }))
                }} value={poolNumber} name="poolNumber" label="Nombre des poules" type="number" width="200px" min="3" max="40" />

            </div >




            {
                selectedCategories.length > 0 && gender._id &&
                <>
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

                        <div style={{ flex: 1, width: "100%", minWidth: 400, display: 'flex', flexDirection: "column", justifyContent: 'center', gap: 20 }}>
                            {pools.map((pool, idx) => <PoolAdd
                                teams={teams}
                                pools={pools}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                removeFromList={removeFromList}
                                index={idx}
                            />)}

                        </div>

                    </div >
                    <Btn style={{ backgroundColor: "green", width: "90%", marginLeft: "5%", marginTop: 40, marginBottom: 40 }} onClick={e => { submit(false) }} >
                        Valider
                    </Btn>
                </>

            }

        </div >

    )
}
