import React from 'react'

function LeagueMatch({ team1, team2, team1Score, team2Score }) {
    return (
        <div style={{ height: 70, marginTop: 20, width: 400, display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
            <div style={{ width: 100 }}>
                {team1}
            </div>
            <span style={{ backgroundColor: "#444", paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: "bold", color: "white", margin: 10 }}>
                {team1Score} - {team2Score}
            </span>
            <div style={{ width: 100 }}>
                {team2}
            </div>
        </div>
    )
}

export default LeagueMatch