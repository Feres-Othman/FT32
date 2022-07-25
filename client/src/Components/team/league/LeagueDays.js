import React, { useState } from 'react'
import Btn from '../../../Molecules/Btn'
import LeagueMatch from './LeagueMatch'

function LeagueDays({ days, playLeague, setDay, day, isLoggedIn }) {

    const [isEditing, setIsEditing] = useState(-1)

    const startEditing = (dayIndex) => {
        setDay(days[dayIndex])
        setIsEditing(dayIndex)
    }

    const setMatch = (index, team1Score, team2Score) => {
        let tempDay = { ...day }
        tempDay.matches[index] = { ...tempDay.matches[index], team1Score, team2Score }
        setDay({ ...tempDay })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, padding: 30, maxWidth: 1200 }}>
            {days.map((pday, index) => <div style={{ width: 350, backgroundColor: "#aaa", padding: 20, borderRadius: 15 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {index + 1}{index == 0 ? 'r' : ''}e  journée
                </div>

                {pday.matches.map((match, mIndex) => <LeagueMatch isLoggedIn={isLoggedIn} matchEditing={day?.matches?.length > 0 ? day?.matches[mIndex] : {}} setIsEditing={startEditing} isEditing={isEditing} dayIndex={index} index={mIndex} setMatch={setMatch} {...match} />)}
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