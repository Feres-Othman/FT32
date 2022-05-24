import React from 'react'
import LeagueMatch from './LeagueMatch'

function LeagueDays({ days }) {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, padding: 30, maxWidth: 1200 }}>
            {days.map((day, index) => <div style={{ width: 400, height: 250, backgroundColor: "#aaa", padding: 20, borderRadius: 15 }}>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {index + 1}{index == 0 ? 'r' : ''}e  journée - {day.date}
                </div>

                {day.matches.map(match => <LeagueMatch {...match} />)}

                {/* <LeagueMatch /> */}
            </div>)}

            {/* <LeagueMatch /> */}
        </div>
    )
}

export default LeagueDays