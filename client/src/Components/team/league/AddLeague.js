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

    const [calendars, setCalendars] = useState([])

    const [selectedCategories, setSelectedCategories] = useState([])

    const [selectedCalendar, setSelectedCalendar] = useState({})

    const [category, setCategory] = useState({})
    const [phaseNumber, setPhaseNumber] = useState(0)

    const [poolNumber, setPoolNumber] = useState(0)

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

    const getCalendars = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/calendar/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)



                    setCalendars(res.calendars);


                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getCalendars();
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
            pools: pools,
            calendar: selectedCalendar

        }

        axios.post("/api/league/add", content, config)
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
                    notifier.success("Classement ajoute");
                    history.push("/");
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    const addToList = (item, index) => {

        let tempPools = [...pools];

        tempPools[index].teams = [...pools[index].teams,
        {
            _id: item._id,
            name: item.name,
            points: 0,
            played: 0,
            won: 0,
            forfit: 0,
            lost: 0,
            p: 0,
            c: 0,
            scoreChange: 0
        }]

        setPools([...tempPools])

    }



    const removeFromList = (item, index) => {

        let tempPools = [...pools];

        tempPools[index].teams = [...tempPools[index].teams.filter(team => team._id != item._id)]

        setPools([...tempPools])



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
                <DrpDown style={{ width: "30%", minWidth: 350 }} dataset={calendars.map(ev => { return { ...ev, name: ev.name + " - " + new Date(ev.startDate).toLocaleDateString("fr-FR") } })} setData={setSelectedCalendar} data={selectedCalendar} > Selectionner un événement </DrpDown>
                <Input handleChange={(value) => {
                    value = parseInt(value)

                    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

                    setPoolNumber(value);
                    let temp = [...pools];
                    if (value > temp.length) {
                        for (let index = temp.length; index < value; index++) {
                            temp.push({
                                name: "Poule " + alphabet[index],
                                teams: [
                                    // {
                                    //     name: "AchS",
                                    //     points: 12,
                                    //     played: 6,
                                    //     won: 4,
                                    //     forfit: 0,
                                    //     lost: 2,
                                    //     p: 18,
                                    //     c: 10,
                                    //     scoreChange: 8
                                    // }

                                ]
                            })
                        }
                    } else {
                        for (let index = temp.length - 1; index >= value; index--) {
                            temp.pop()
                        }
                    }
                    setPools(temp)
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
