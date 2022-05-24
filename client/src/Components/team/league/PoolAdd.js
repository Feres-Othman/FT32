import React from 'react'
import TeamAdd from './TeamAdd'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function PoolAdd({ teams, pools, selectedCategories, gender, addToList, removeFromList, index }) {

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "white", padding: 20, borderRadius: 15, border: `3px solid #ffa500` }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "start", textAlign: "left", color: "#000", marginBottom: 10 }}>
                    <div>
                        {/* {playersList[phase].length !== max && <b>({playersList[phase].length}) </b>} classement : {desc}*/}
                        {pools[index].name}
                    </div>
                    <div>
                        equipes :
                    </div>
                </div>
                {
                    <TeamAdd
                        teams={teams}
                        categories={selectedCategories}
                        gender={gender}
                        addToList={item => addToList(item, index)}
                    />
                }

            </div>


            <div style={{ display: "flex", flexDirection: "row", gap: 10, flexWrap: "wrap" }}>

                {pools[index].teams.map(item => <div style={{ backgroundColor: "#ccc", padding: 5, borderRadius: 10, border: "1px solid grey", fontSize: 12 }}>
                    {item.name} <Icon onClick={() => { removeFromList(item, index) }} className="hoverScale" style={{ cursor: "pointer" }} icon={faTrashAlt} />
                </div>)}

            </div>


        </div>
    )
}
