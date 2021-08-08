import React, { useContext } from 'react'
import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import { useHistory } from 'react-router-dom';

export default function PlayerItem({ firstName, lastName, number, score, sex, category, team, rang, isByTeam }) {

    const { design } = useContext(DesignContext);

    let history = useHistory();

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: design.accentColor, width: "100%", height: 50, marginBottom: 10 }} >
            {!isByTeam && <div style={{ width: "10%" }} >{rang + 1}</div>}
            <div style={{ width: "10%" }} >{number}</div>
            <div style={{ width: "15%" }} >{lastName}</div>
            <div style={{ width: "15%" }} >{firstName}</div>
            <div style={{ width: "15%" }} >{category.name}</div>
            {!isByTeam && <div style={{ width: "15%", cursor: "pointer" }} className="hoverScale" onClick={() => {
                history.push(`/players/${team.name}`);
            }} >{team.name}</div>}
            <div style={{ width: "10%" }} >{sex}</div>
            <div style={{ width: "10%" }} >{score}</div>
        </div>
    )
}
