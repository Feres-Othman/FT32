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

import IndivPlayers from './indiv/IndivPlayersBonus';
import PlayersBonusList from './PlayersBonusListClassement';

export default function AddMatch() {

    const history = useHistory();

    const { comp, cat } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)


    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [category, setCategory] = useState({})
    const [phaseNumber, setPhaseNumber] = useState(0)



    const [teams, setTeams] = useState([])


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
        // {
        //     _id: 5,
        //     name: "Championnat par équipe – super div nationale",
        //     isTeam: true
        // },
        // {
        //     _id: 6,
        //     name: "Championnat par équipe –div nationale 1 et 2",
        //     isTeam: true
        // },
        // {
        //     _id: 7,
        //     name: "Championnat par équipe jeune – phase régionale et inter - régionale",
        //     isTeam: true
        // },
        // {
        //     _id: 8,
        //     name: "Championnat par équipe jeune –phase finale ",
        //     isTeam: true
        // },
        // {
        //     _id: 9,
        //     name: "Coupe de Tunisie par équipes",
        //     isTeam: true
        // },

    ]


    const [type, setType] = useState({})

    const submit = async (isTeam) => {


        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let content = {
            category: category._id,
            type: type,
            gender: gender._id,
            players1: [[...players1[0].map(item => item._id)], [...players1[1].map(item => item._id)], [...players1[2].map(item => item._id)]],
            players2: [[...players2[0].map(item => item._id)], [...players2[1].map(item => item._id)], [...players2[2].map(item => item._id)]],
            players3: [[...players3[0].map(item => item._id)], [...players3[1].map(item => item._id)], [...players3[2].map(item => item._id)]],
            players4: [[...players4[0].map(item => item._id)], [...players4[1].map(item => item._id)], [...players4[2].map(item => item._id)]],
            players5: [[...players5[0].map(item => item._id)], [...players5[1].map(item => item._id)], [...players5[2].map(item => item._id)]],
            players6: [[...players6[0].map(item => item._id)], [...players6[1].map(item => item._id)], [...players6[2].map(item => item._id)]],
            players7: [[...players7[0].map(item => item._id)], [...players7[1].map(item => item._id)], [...players7[2].map(item => item._id)]],
            players8: [[...players8[0].map(item => item._id)], [...players8[1].map(item => item._id)], [...players8[2].map(item => item._id)]],

        }

        axios.post("/api/player/championship", content, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    // if (isTeam) {
                    //     notifier.success("match ajoutee");
                    //     history.push("/");
                    // } else {
                    //     notifier.success("match ajoutee");
                    //     history.go(0)
                    // }
                    notifier.success("championat ajoutee");
                    history.push("/");
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    const [players1, setPlayers1] = useState([[], [], []])
    const [players2, setPlayers2] = useState([[], [], []])
    const [players3, setPlayers3] = useState([[], [], []])
    const [players4, setPlayers4] = useState([[], [], []])
    const [players5, setPlayers5] = useState([[], [], []])
    const [players6, setPlayers6] = useState([[], [], []])
    const [players7, setPlayers7] = useState([[], [], []])
    const [players8, setPlayers8] = useState([[], [], []])

    const setPlayers = (setPlayersNumber, playersNumber, item) => {

        let tempPlayers = [...playersNumber];

        tempPlayers[phaseNumber] = [...playersNumber[phaseNumber], item]

        setPlayersNumber([...tempPlayers])

    }

    const addToList = (item, index) => {

        if (index == 0) {


            if (players1[phaseNumber].length >= 1) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            // setPlayers1([...players1, item])
            setPlayers(setPlayers1, players1, item)


        } else if (index == 1) {


            if (players2[phaseNumber].length >= 1) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers2, players2, item)

        } else if (index == 2) {


            if (players3[phaseNumber].length >= 1) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers3, players3, item)

        } else if (index == 3) {


            if (players4[phaseNumber].length >= 1) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers4, players4, item)

        } else if (index == 4) {


            if (players5[phaseNumber].length >= 4) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers5, players5, item)

        } else if (index == 5) {


            if (players6[phaseNumber].length >= 8) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers6, players6, item)

        } else if (index == 6) {


            if (players7[phaseNumber].length >= 8) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers7, players7, item)

        } else if (index == 7) {


            if (players8[phaseNumber].length >= 8) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers(setPlayers8, players8, item)

        }


    }


    const removePlayers = (setPlayersNumber, playersNumber, item) => {

        let tempPlayers = [...playersNumber];

        tempPlayers[phaseNumber] = [...tempPlayers[phaseNumber].filter(player => player._id != item._id)]

        setPlayersNumber([...tempPlayers])

    }

    const removeFromList = (item, index) => {

        if (index == 0) {
            removePlayers(setPlayers1, players1, item)
        } else if (index == 1) {
            removePlayers(setPlayers2, players2, item)
        } else if (index == 2) {
            removePlayers(setPlayers3, players3, item)
        } else if (index == 3) {
            removePlayers(setPlayers4, players4, item)
        } else if (index == 4) {
            removePlayers(setPlayers5, players5, item)
        } else if (index == 5) {
            removePlayers(setPlayers6, players6, item)
        } else if (index == 6) {
            removePlayers(setPlayers7, players7, item)
        } else if (index == 7) {
            removePlayers(setPlayers8, players8, item)
        }


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

                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={genders} setData={setGender} data={gender} > Selectionner une Genre </DrpDown>
                <DrpDown style={{ width: "30%", minWidth: 450 }} dataset={types} setData={setType} data={type} > Selectionner une type </DrpDown>
                {/* <DrpDown dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown> */}
                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={categories} setData={setCategory} data={category} > Selectionner une categorie </DrpDown>

            </div >




            {
                selectedCategories.length > 0 && gender._id &&
                <>
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

                        <Btn style={{ width: "30%", minWidth: 350, backgroundColor: phaseNumber == 0 ? design.primaryColor : "#3344cc" }} onClick={() => setPhaseNumber(0)}  > Phase 1 </Btn>
                        <Btn style={{ width: "30%", minWidth: 350, backgroundColor: phaseNumber == 1 ? design.primaryColor : "#3344cc" }} onClick={() => setPhaseNumber(1)} > Phase 2 </Btn>
                        <Btn style={{ width: "30%", minWidth: 350, backgroundColor: phaseNumber == 2 ? design.primaryColor : "#3344cc" }} onClick={() => setPhaseNumber(2)} > Phase 3 </Btn>

                    </div >
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
                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players1}
                                removeFromList={removeFromList}
                                desc={"1"}
                                bonus={"+ 100"}
                                max={1}
                                index={0}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players2}
                                removeFromList={removeFromList}
                                desc={"2"}
                                bonus={"+ 90"}
                                max={1}
                                index={1}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players3}
                                removeFromList={removeFromList}
                                desc={"3"}
                                bonus={"+ 84"}
                                max={1}
                                index={2}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players4}
                                removeFromList={removeFromList}
                                desc={"4"}
                                bonus={"+ 78"}
                                max={1}
                                index={3}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players5}
                                removeFromList={removeFromList}
                                desc={"5-8"}
                                bonus={"+ 65"}
                                max={4}
                                index={4}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players6}
                                removeFromList={removeFromList}
                                desc={"9-16"}
                                bonus={"+ 40"}
                                max={8}
                                index={5}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players7}
                                removeFromList={removeFromList}
                                desc={"17-24"}
                                bonus={"+ 15"}
                                max={8}
                                index={6}
                                phase={phaseNumber}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players8}
                                removeFromList={removeFromList}
                                desc={"25-32"}
                                bonus={"+ 10"}
                                max={8}
                                index={7}
                                phase={phaseNumber}
                            />

                            {/* <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players8}
                                removeFromList={removeFromList}
                                desc={"Absent"}
                                bonus={"- 5"}
                                max={Infinity}
                                index={7}
                            /> */}


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
