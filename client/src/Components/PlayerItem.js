import React, { useContext, useEffect, useState } from 'react'

import { RContext } from '../RContext'
import { DesignContext } from '../DesignContext';
import { useHistory } from 'react-router-dom';
import Btn from '../Molecules/Btn'
import { AiFillDelete } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteJouer } from "./actions/ajouterunjouer"
import { Updatejouer } from "./updatejouer"


export default function PlayerItem({ _id, firstName, lastName, number, score, sex, category, team, rang, isByTeam, isByFilter, filteredScore, item, isLoggedIn }) {

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        notifier.confirm(
            'Are you sure?',
            onOk,
            onCancel,

        )
    }


    let onOk = () => {
        dispatch(deleteJouer(_id)); history.go(0)
    };
    let onCancel = () => { };

    const handleUpdate = (e) => {
        e.preventDefault();
        history.push(`/updatejouer/${_id}`);
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: 'center', color: design.mainTextColor, backgroundColor: "white", width: "100%", height: 50, marginBottom: 10, paddingTop: 20, paddingBottom: 20 }} >
            {!isByTeam && <div style={{ width: "10%" }} >{rang + 1}</div>}

            <div style={{ width: isLoggedIn ? "10%" : isByTeam ? "10%" : "15%" }} > {number} </div>

            <div style={{ width: isLoggedIn ? "15%" : "20%" }} > {lastName} </div>

            <div style={{ width: isLoggedIn ? "15%" : "20%" }} > {firstName} </div>

            {!isByFilter && <div style={{ width: isLoggedIn ? "15%" : "20%" }} >{category.name}</div>}

            {!isByTeam && <div style={{ width: isLoggedIn ? "15%" : "20%", cursor: "pointer" }} className="hoverScale" onClick={() => {
                history.push(`/players/${team.name}`);
            }} >{team.name}</div>}

            {!isByFilter && <div style={{ width: isLoggedIn ? "10%" : "15%" }} >{sex}</div>}

            <div style={{ width: isLoggedIn ? "10%" : "15%" }}>{score}</div>
            {
                isLoggedIn ?
                    <>
                        <Btn onClick={handleUpdate} style={{ width: "10%" }}>
                            {isLarge ? <BsThreeDots /> : "mettre à jour"}
                        </Btn>
                        <Btn onClick={handleDelete} style={{ backgroundColor: "red", width: "10%", margin: "10px" }}>
                            {isLarge ? <AiFillDelete /> : "Supprimer"}
                        </Btn>
                    </>
                    :
                    <>

                    </>
            }


        </div>
    )
}
