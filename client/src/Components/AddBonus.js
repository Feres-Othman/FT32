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
import PlayersBonusList from './PlayersBonusList';

export default function AddMatch() {

    const history = useHistory();

    const { comp, cat } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)


    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [category, setCategory] = useState({})



    const [teams, setTeams] = useState([])

    const [playerA, setPlayerA] = useState({})
    const [playerB, setPlayerB] = useState({})
    const [playerC, setPlayerC] = useState({})
    const [playerX, setPlayerX] = useState({})
    const [playerY, setPlayerY] = useState({})
    const [playerZ, setPlayerZ] = useState({})

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

    const coefTypes = [{
        _id: 1,
        name: "National"
    },
    {
        _id: 2,
        name: "Regional"
    }]
    const [coefType, setCoefType] = useState({})

    const submit = async (isTeam) => {


        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let content = {
            category,
            coef: 1 / coefType._id,
            players1: [...players1.map(item => item._id)],
            players2: [...players2.map(item => item._id)],
            players3: [...players3.map(item => item._id)],
            players4: [...players4.map(item => item._id)],
            players5: [...players5.map(item => item._id)],
            players6: [...players6.map(item => item._id)],
            players7: [...players7.map(item => item._id)],
            players8: [...players8.map(item => item._id)],

        }

        axios.post("/api/player/bonus", content, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    // if (isTeam) {
                    //     notifier.success("match ajoutee");
                    //     history.push("/players");
                    // } else {
                    //     notifier.success("match ajoutee");
                    //     history.go(0)
                    // }
                    notifier.success("bonus ajoutee");
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    const [players1, setPlayers1] = useState([])
    const [players2, setPlayers2] = useState([])
    const [players3, setPlayers3] = useState([])
    const [players4, setPlayers4] = useState([])
    const [players5, setPlayers5] = useState([])
    const [players6, setPlayers6] = useState([])
    const [players7, setPlayers7] = useState([])
    const [players8, setPlayers8] = useState([])


    const addToList = (item, index) => {

        if (index == 0) {


            if (players1.length >= 1) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers1([...players1, item])


        } else if (index == 1) {


            if (players2.length >= 1) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers2([...players2, item])


        } else if (index == 2) {


            if (players3.length >= 2) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers3([...players3, item])


        } else if (index == 3) {


            if (players4.length >= 4) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers4([...players4, item])


        } else if (index == 4) {


            if (players5.length >= 8) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers5([...players5, item])


        } else if (index == 5) {


            if (players6.length >= 16) {
                notifier.info("ce niveau a atteint son max de joueurs");
                return;
            }
            setPlayers6([...players6, item])


        } else if (index == 6) {


            // if (players7.length >= 1) {
            //     notifier.info("à ce niveau il ne peut y avoir qu'un seul joueur");
            //     return;
            // }
            setPlayers7([...players7, item])


        } else if (index == 7) {


            // if (players1.length >= 1) {
            //     notifier.info("à ce niveau il ne peut y avoir qu'un seul joueur");
            //     return;
            // }
            setPlayers8([...players8, item])


        }


    }

    const removeFromList = (item, index) => {

        if (index == 0) {
            setPlayers1([...players1.filter(player => player._id != item._id)])
        } else if (index == 1) {
            setPlayers2([...players2.filter(player => player._id != item._id)])
        } else if (index == 2) {
            setPlayers3([...players3.filter(player => player._id != item._id)])
        } else if (index == 3) {
            setPlayers4([...players4.filter(player => player._id != item._id)])
        } else if (index == 4) {
            setPlayers5([...players5.filter(player => player._id != item._id)])
        } else if (index == 5) {
            setPlayers6([...players6.filter(player => player._id != item._id)])
        } else if (index == 6) {
            setPlayers7([...players7.filter(player => player._id != item._id)])
        } else if (index == 7) {
            setPlayers8([...players8.filter(player => player._id != item._id)])
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

                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={genders} setData={setGender} data={gender} > Selectionner un Genre </DrpDown>
                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={coefTypes} setData={setCoefType} data={coefType} > Selectionner une type </DrpDown>
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
                                bonus={"+ 24"}
                                max={1}
                                index={0}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players2}
                                removeFromList={removeFromList}
                                desc={"2"}
                                bonus={"+ 20"}
                                max={1}
                                index={1}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players3}
                                removeFromList={removeFromList}
                                desc={"3+4"}
                                bonus={"+ 16"}
                                max={2}
                                index={2}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players4}
                                removeFromList={removeFromList}
                                desc={"5-8"}
                                bonus={"+ 12"}
                                max={4}
                                index={3}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players5}
                                removeFromList={removeFromList}
                                desc={"9-16"}
                                bonus={"+ 8"}
                                max={8}
                                index={4}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players6}
                                removeFromList={removeFromList}
                                desc={"17-32"}
                                bonus={"+ 4"}
                                max={16}
                                index={5}
                            />

                            <PlayersBonusList
                                teams={teams}
                                selectedCategories={selectedCategories}
                                gender={gender}
                                addToList={addToList}
                                playersList={players7}
                                removeFromList={removeFromList}
                                desc={"32+"}
                                bonus={"+ 2"}
                                max={Infinity}
                                index={6}
                            />

                            <PlayersBonusList
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
                            />


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
