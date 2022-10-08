import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap'

export default function TeamPlayers({ number, team, setTeam, teams, player1, setPlayer1, player2, setPlayer2, player3, setPlayer3, categories, isValidated, teamScore, gender }) {


    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <button ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="Primary"
            style={{ backgroundColor: 'white', borderRadius: 15, height: 50, maxWidth: 600, minWidth: 400, border: "0px" }}>

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

    const filterPlayers = (players) => {

        let selectedPlayers = [];

        for (const player of players) {
            if (categories.includes(player.category2)) {
                if ((player.sex === gender._id) || (gender._id === "X")) {
                    selectedPlayers.push(player)
                }
            }
        }

        return selectedPlayers;

    }

    useEffect(() => {
        setTeam({});
        setPlayer1({});
        setPlayer2({});
        setPlayer3({});
    }, [categories, gender])

    useEffect(() => {
        setPlayer1({});
        setPlayer2({});
        setPlayer3({});
    }, [team])

    return (
        <>
            {
                !isValidated ?
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // paddingTop: "20vh",
                        // backgroundColor: "red",
                        gap: 20,
                        maxWidth: 600, minWidth: 400
                        // overflowY: "scroll"
                    }}>
                        <Dropdown style={{ maxWidth: 600, minWidth: 400 }}>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {team.name || `Selectionner l'equipe ${number} `}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu} >
                                {teams.map((item, index) => (
                                    <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setTeam(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                        {item.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {
                            team.name &&
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        {player1.number ? `${number == 1 ? "A" : "X"} : ${player1.firstName} ${player1.lastName} - ${player1.number} ` : `Selectionner le joueur ${number == 1 ? "A" : "X"} `}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as={CustomMenu}>
                                        {filterPlayers(team.players_v2).map((item, index) => (
                                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setPlayer1(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        {player2.number ? `${number == 1 ? "B" : "Y"} : ${player2.firstName} ${player2.lastName} - ${player2.number} ` : `Selectionner le joueur ${number == 1 ? "B" : "Y"} `}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as={CustomMenu}>
                                        {filterPlayers(team.players_v2).map((item, index) => (
                                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setPlayer2(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                        {player3.number ? `${number == 1 ? "C" : "Z"} : ${player3.firstName} ${player3.lastName} - ${player3.number} ` : `Selectionner le joueur ${number == 1 ? "C" : "Z"} `}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as={CustomMenu}>
                                        {filterPlayers(team.players_v2).map((item, index) => (
                                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setPlayer3(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                                {`${item.number} - ${item.firstName} ${item.lastName}`}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>


                            </>
                        }

                    </div> :



                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "stretch",
                        // paddingTop: "20vh",
                        // backgroundColor: "red",
                        gap: 18,
                        flexWrap: "wrap",
                        width: 400
                        // overflowY: "scroll"
                    }}>
                        <div style={{ width: 400, backgroundColor: "white", borderRadius: 15, padding: 10 }}>
                            {team.name} <b style={{ fontWeight: "bolder", fontSize: 20 }}> ( {teamScore} ) </b >
                        </div>

                        <div style={{ width: 120, backgroundColor: "white", borderRadius: 15, padding: 10, fontSize: 12 }}>
                            {`${number == 1 ? "A" : "X"} : ${player1.firstName} ${player1.lastName} - ${player1.number} `}
                        </div>

                        <div style={{ width: 120, backgroundColor: "white", borderRadius: 15, padding: 10, fontSize: 12 }}>
                            {`${number == 1 ? "B" : "Y"} : ${player2.firstName} ${player2.lastName} - ${player2.number} `}
                        </div>

                        <div style={{ width: 120, backgroundColor: "white", borderRadius: 15, padding: 10, fontSize: 12 }}>
                            {`${number == 1 ? "C" : "Z"} : ${player3.firstName} ${player3.lastName} - ${player3.number} `}
                        </div>
                    </div>

            }
        </>


    )
}
