import React, { useState } from 'react'
import Input from '../../Molecules/Input'
import LineContest from './LineContest'

import DrpDown from '../../Molecules/DrpDown';

export default function Contest({
    players1, players2,
    player1Order, player2Order,
    contestIndex, matches,
    setMatches, setScores,
    team1Player1, setTeam1Player1,
    team1Player2, setTeam1Player2,
    team2Player1, setTeam2Player1,
    team2Player2, setTeam2Player2,
}) {

    // const [matches, setMatches] = useState([
    //     {
    //         player1Score: 0,
    //         player2Score: 0
    //     },
    //     {
    //         player1Score: 0,
    //         player2Score: 0
    //     },
    //     {
    //         player1Score: 0,
    //         player2Score: 0
    //     },
    //     {
    //         player1Score: 0,
    //         player2Score: 0
    //     },
    //     {
    //         player1Score: 0,
    //         player2Score: 0
    //     }
    // ])

    const setMatch = (index, newMatch) => {

        let temp = matches;
        let score1 = 0;
        let score2 = 0;

        temp[index] = newMatch;

        for (const item of temp) {
            if (item.player1Score >= 11 && (item.player1Score - item.player2Score) > 1) {
                score1++;
            }

            if (item.player2Score >= 11 && (item.player2Score - item.player1Score) > 1) {
                score2++;
            }
        }

        // for (const item of temp) {
        //     if (item.player2Score == 11) {
        //         score2++;
        //     }
        // }


        setMatches([...temp], contestIndex, score1, score2);
    }

    const playerScore = (array, side) => {

        let score = 0;

        if (side == 1) {
            for (const item of array) {

                if (item.player1Score >= 11 && (item.player1Score - item.player2Score) > 1) {
                    score++;
                }
            }

        } else {
            for (const item of array) {
                if (item.player2Score >= 11 && (item.player2Score - item.player1Score) > 1) {
                    score++;
                }
            }
        }

        return score;

    }

    return (
        <div style={{ width: "45%", backgroundColor: "#fff", marginBottom: 10, padding: 10, borderRadius: 15, display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", position: "relative", border: "2px solid black" }}>

            <div style={{ position: 'absolute', top: 10, left: 10, width: 25, height: 25, borderRadius: 50, border: "1px solid black" }} >D</div>

            <div style={{ width: 200, height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                <b>{player1Order}</b>

                <DrpDown style={{ width: "30%", minWidth: 350 }} style={{ width: 200 }} dataset={players1.map(item => ({ ...item, name: `${item.firstName} ${item.lastName}` }))} setData={setTeam1Player1} data={team1Player1} >Selectionner le joueur 1</DrpDown>
                <DrpDown style={{ width: "30%", minWidth: 350 }} style={{ width: 200 }} dataset={players1.map(item => ({ ...item, name: `${item.firstName} ${item.lastName}` }))} setData={setTeam1Player2} data={team1Player2} >Selectionner le joueur 2</DrpDown>
            </div>


            <div style={{ width: 50, height: "100%" }} ><b>{playerScore(matches, 1)}</b></div>

            <div style={{ backgroundColor: "#ddd", width: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, borderRadius: 15 }} >
                <LineContest match={matches[0]} setMatch={(newMatch) => { setMatch(0, newMatch) }} />
                <LineContest match={matches[1]} setMatch={(newMatch) => { setMatch(1, newMatch) }} />
                <LineContest match={matches[2]} setMatch={(newMatch) => { setMatch(2, newMatch) }} />
                <LineContest match={matches[3]} setMatch={(newMatch) => { setMatch(3, newMatch) }} />
                <LineContest match={matches[4]} setMatch={(newMatch) => { setMatch(4, newMatch) }} />
            </div>

            <div style={{ width: 50, height: "100%" }} ><b>{playerScore(matches, 2)}</b></div>

            <div style={{ width: 200, height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                <b>{player1Order}</b>
                <DrpDown style={{ width: "30%", minWidth: 350 }} style={{ width: 200 }} dataset={players2.map(item => ({ ...item, name: `${item.firstName} ${item.lastName}` }))} setData={setTeam2Player1} data={team2Player1} >Selectionner le joueur 1</DrpDown>
                <DrpDown style={{ width: "30%", minWidth: 350 }} style={{ width: 200 }} dataset={players2.map(item => ({ ...item, name: `${item.firstName} ${item.lastName}` }))} setData={setTeam2Player2} data={team2Player2} >Selectionner le joueur 2</DrpDown>
            </div>

        </div>
    )
}
