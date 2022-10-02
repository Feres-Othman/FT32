import Btn from '../../../Molecules/Btn'
import LeagueMatch from './LeagueMatch'

import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../../../RContext'
import { DesignContext } from '../../../DesignContext';
import { Dropdown, FormControl, Form } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../../../Molecules/DrpDown';
import Input from '../../../Molecules/Input';

import { useHistory, useParams } from 'react-router-dom';


function LeagueDays({ days, playLeague, setDay, day, isLoggedIn }) {

    const [isEditing, setIsEditing] = useState(-1)


    // const [teams, setTeams] = useState([])
    const [arbitres, setArbitres] = useState([])
    const [lieu, setLieu] = useState(day.place)
    const [dateTime, setDateTime] = useState("")


    const getArbitres = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/designation/arbitres/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    setArbitres(res.arbitres);
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getArbitres();
    }, [])

    const startEditing = (dayIndex) => {
        setDay(days[dayIndex])
        setIsEditing(dayIndex)
    }

    const setMatch = (index, team1Score, team2Score, arbitre) => {
        console.log(arbitre)
        if (arbitre === "") {
            let tempDay = { ...day }
            tempDay.matches[index] = { ...tempDay.matches[index], team1Score, team2Score }
            setDay({ ...tempDay })
        } else {
            let tempDay = { ...day }
            tempDay.matches[index] = { ...tempDay.matches[index], arbitre }
            setDay({ ...tempDay })
        }

    }

    const setDate = (value) => {
        setDateTime(value)
        let tempDay = { ...day }
        tempDay.date = value
        setDay({ ...tempDay })
    }

    const setPlace = (value) => {
        setLieu(value)
        let tempDay = { ...day }
        tempDay.place = value
        setDay({ ...tempDay })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, padding: 30, maxWidth: 1200 }}>
            {days.map((pday, index) => <div style={{ width: 350, backgroundColor: "#aaa", padding: 20, borderRadius: 15 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {index + 1}{index == 0 ? 'r' : ''}e  journée {pday.date === "15 sep" ? "" : <>({new Date(pday.date).toLocaleDateString("fr-FR", { month: 'short', day: 'numeric' })})</>}
                </div>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {pday.place}
                </div>
                {isLoggedIn && isEditing === index &&
                    <Form.Control type="datetime-local" onChange={(e) => { setDate(e.target.value) }} placeholder="Entrer une date" style={{ padding: 30, borderRadius: 15, width: "100%", marginBottom: 20 }} />
                }
                {isLoggedIn && isEditing === index &&
                    <Input handleChange={(value) => { setPlace(value) }} value={lieu} style={{ width: "90%", marginTop: 20 }} name="lieu" placeholder="Lieu" type="text" width="100%" />
                }

                {pday.matches.map((match, mIndex) => <LeagueMatch isLoggedIn={isLoggedIn} matchEditing={day?.matches?.length > 0 ? day?.matches[mIndex] : {}} setIsEditing={startEditing} isEditing={isEditing} dayIndex={index} index={mIndex} setMatch={setMatch} {...match} arbitres={arbitres} />)}
                {isLoggedIn && isEditing === index &&
                    <Btn style={{ backgroundColor: "green", width: "90%", marginLeft: "5%", marginTop: 40, marginBottom: 20 }} onClick={e => { setIsEditing(-1); playLeague() }} >
                        Valider
                    </Btn>
                }
                {/* <LeagueMatch /> */}
            </div>)}

            {/* <LeagueMatch /> */}
        </div>
    )
}

export default LeagueDays