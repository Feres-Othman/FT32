import React from 'react'
import IndivPlayers from './indiv/IndivPlayersBonus'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function PlayersBonusList({ teams, selectedCategories, gender, addToList, playersList, removeFromList, index, desc, bonus, max, phase = 0 }) {
    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "white", padding: playersList[phase].length === max ? 10 : 20, borderRadius: 15, border: `3px solid ${playersList[phase].length === 0 ? "#ffa500" : playersList[phase].length === max ? "#00aa99" : "#333"}` }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: playersList[phase].length === max ? "row" : "column", gap: 10, justifyContent: playersList[phase].length === max ? "start" : "center", color: `${playersList[phase].length === max ? "#00aa99" : "#000"}`, marginBottom: 10 }}>
                    <div>
                        {playersList[phase].length !== max && <b>({playersList[phase].length}) </b>} classement : {desc}
                    </div>
                    <div>
                        bonus : <b>{bonus}</b>
                    </div>
                    {
                        playersList[phase].length !== max &&

                        <div>
                            Joueur(s) :
                        </div>
                    }
                </div>
                {
                    playersList[phase].length !== max && <IndivPlayers
                        teams={teams}
                        categories={selectedCategories}
                        gender={gender}
                        addToList={item => addToList(item, index)}
                    />
                }

            </div>


            <div style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap" }}>

                {playersList[phase].map(item => <div style={{ backgroundColor: "#ccc", padding: playersList[phase].length === max ? 5 : 10, borderRadius: 10, border: "1px solid grey", fontSize: playersList[phase].length === max ? 12 : 15 }}>
                    {item.firstName} {item.lastName} <Icon onClick={() => { removeFromList(item, index) }} className="hoverScale" style={{ cursor: "pointer" }} icon={faTrashAlt} />
                </div>)}

            </div>


        </div>
    )
}
