import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, FormControl } from 'react-bootstrap'

export default function TeamAdd({ teams, addToList, categories, gender }) {


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

    const filterPlayers = () => {

        let selectedTeams = [];

        for (const team of teams) {
            for (const player of team.players_v2) {
                if (categories.includes(player.category2)) {
                    if ((player.sex === gender._id) || (gender._id === "X")) {
                        selectedTeams.push(team)
                        break;
                    }
                }
            }
        }


        return selectedTeams;

    }

    return (
        <>
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
                        Selectionner une equipe
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                        {filterPlayers().map((item, index) => (
                            <Dropdown.Item eventKey={index} key={item._id} onClick={() => { addToList(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                {item.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>


            </div>
        </>


    )
}
