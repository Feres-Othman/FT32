import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap'

export default function IndivPlayers({ number, teams, player1, setPlayer1, categories, isValidated, teamScore, gender }) {


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
                                !value || child.props.children.toLowerCase().includes(value),
                        )}
                    </ul>
                </div>
            );
        },
    );

    const filterPlayers = () => {

        let selectedPlayers = [];

        for (const team of teams) {
            for (const player of team.players_v2) {
                if (categories.includes(player.category)) {
                    if ((player.sex === gender._id) || (gender._id === "X")) {
                        selectedPlayers.push(player)
                    }
                }
            }
        }


        return selectedPlayers;

    }

    useEffect(() => {
        setPlayer1({});
    }, [categories, gender])

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


                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {player1.number ? `${number == 1 ? "1" : "2"} : ${player1.firstName} ${player1.lastName} - ${player1.number} ` : `Selectionner le joueur ${number == 1 ? "1" : "2"} `}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {filterPlayers().map((item, index) => (
                                    <Dropdown.Item eventKey={index} key={item._id} onClick={() => { setPlayer1(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                        {`${item.number} - ${item.firstName} ${item.lastName}`}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>


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
                        <div style={{ width: 400, backgroundColor: "white", borderRadius: 15, padding: 10, fontSize: 12 }}>
                            {`${number == 1 ? "1" : "2"} : ${player1.firstName} ${player1.lastName} - ${player1.number} `}
                        </div>
                    </div>

            }
        </>


    )
}
