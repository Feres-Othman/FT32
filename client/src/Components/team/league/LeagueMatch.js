import Btn from '../../../Molecules/Btn'

import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../../../RContext'
import { DesignContext } from '../../../DesignContext';
import { Dropdown, FormControl, Form } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../../../Molecules/DrpDown';
import Input from '../../../Molecules/Input';

function LeagueMatch({ team1, team2, team1Score, team2Score, setIsEditing, isEditing, dayIndex, setMatch, matchEditing, index, isLoggedIn, arbitres, arbitre }) {


    const [arbitreEdit, setArbitreEdit] = useState({})

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

        <button ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            variant="Primary"
            style={{ backgroundColor: 'white', borderRadius: 15, height: 50, width: "100%", border: "0px" }}>

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

    return (<div style={{ backgroundColor: "rgba(0,0,0,.15)", borderRadius: 15, paddingTop: 10, paddingBottom: 10, marginBottom: 10, marginTop: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        {isEditing === dayIndex && isLoggedIn ?
            <Dropdown style={{ width: "90%" }}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                    {arbitreEdit.name || (arbitre?.name || `Selectionner l'arbitre`)}
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu} >
                    {arbitres.map((item, indexArb) => (
                        <Dropdown.Item eventKey={indexArb} key={item._id} onClick={() => { setArbitreEdit(item); setMatch(index, "", "", item); }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                            {`${item.number} - ${item.name}`}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown> :
            <div style={{ fontSize: 18, fontWeight: "bold" }}>
                {arbitre?.name || ""}
            </div>
        }

        <div style={{ height: 70, marginTop: 20, display: 'flex', flexDirection: "row", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: 18, fontWeight: "bold", width: "100%" }}>
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
                        setMatch(index, e.target.value, matchEditing.team2Score, "");
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
                        setMatch(index, matchEditing.team1Score, e.target.value, "");
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
    </div>

    )
}

export default LeagueMatch