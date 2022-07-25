import React from 'react'
import Btn from '../../../Molecules/Btn'

function LeagueMatch({ team1, team2, team1Score, team2Score, setIsEditing, isEditing, dayIndex, setMatch, matchEditing, index, isLoggedIn }) {



    return (
        <div style={{ height: 70, marginTop: 20, display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
            <div style={{ width: 100 }}>
                {team1}
            </div>

            {isEditing === dayIndex && isLoggedIn ? <div style={{ backgroundColor: "#ddd", width: 200, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 20, borderRadius: 15 }} >
                <input
                    type="number"
                    min="0"
                    placeholder="00"
                    value={matchEditing.team1Score < 0 ? 0 : matchEditing.team1Score}
                    step="1"
                    onChange={(e) => {
                        setMatch(index, e.target.value, matchEditing.team2Score);
                    }}
                    style={{ borderRadius: 15, height: 30, backgroundColor: 'white' }}
                    // onKeyPress={onKeyPress}
                    className='form-control'
                />

                <input
                    type="number"
                    min="0"
                    placeholder="00"
                    value={matchEditing.team2Score < 0 ? 0 : matchEditing.team2Score}
                    step="1"
                    onChange={(e) => {
                        setMatch(index, matchEditing.team1Score, e.target.value);
                    }}
                    style={{ borderRadius: 15, height: 30, backgroundColor: 'white' }}
                    // onKeyPress={onKeyPress}
                    className='form-control'
                />

            </div> :
                <>
                    {!isLoggedIn ?
                        <span style={{ backgroundColor: "#444", paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: "bold", color: "white", margin: 10 }}>
                            {team1Score >= 0 ? team1Score : "-"} - {team2Score >= 0 ? team2Score : "-"}
                        </span> :
                        <Btn style={{ backgroundColor: "#444", paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, fontSize: 18, fontWeight: "bold", color: "white", margin: 10, }}
                            onClick={e => { setIsEditing(dayIndex); }} >
                            {team1Score >= 0 ? team1Score : "-"} - {team2Score >= 0 ? team2Score : "-"}
                        </Btn>

                    }
                </>}

            <div style={{ width: 100 }}>
                {team2}
            </div>
        </div>
    )
}

export default LeagueMatch