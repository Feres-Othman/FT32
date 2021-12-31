import React, { useState } from 'react'
import Input from '../../Molecules/Input'
import LineContest from './LineContest'

import DrpDown from '../../Molecules/DrpDown';

import { Dropdown, FormControl } from 'react-bootstrap'
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

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <button ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="Primary"
            style={{ backgroundColor: 'white', borderRadius: 15, height: 50, width: 200, border: "0px" }}>

            {children}
            &#x25bc;

        </button>

    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="tapez un filtre..."
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                    <ul className="list-unstyled" style={{ maxHeight: 500, overflowY: "scroll" }}>
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>
                </div>
            );
        },
    );

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
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {team1Player1.number ? `${team1Player1.firstName} ${team1Player1.lastName} - ${team1Player1.number} ` : `Selectionner le joueur 1`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {players1.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam1Player1(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {team1Player2.number ? `${team1Player2.firstName} ${team1Player2.lastName} - ${team1Player2.number} ` : `Selectionner le joueur 2`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {players1.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam1Player2(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
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
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {team2Player1.number ? `${team2Player1.firstName} ${team2Player1.lastName} - ${team2Player1.number} ` : `Selectionner le joueur 1`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {players2.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam2Player1(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        {team2Player2.number ? `${team2Player2.firstName} ${team2Player2.lastName} - ${team2Player2.number} ` : `Selectionner le joueur 2`}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {players2.map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam2Player2(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </div>
    )
}
