import React, { useContext, useEffect, useState, useMemo } from 'react'
import DataTable from 'react-data-table-component';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner'

export default function TeamPoints({ teams }) {

    const columns = [
        {
            name: 'Rang',
            cell: (row, index) => index + 1,
            center: true,
            maxWidth: '100px',
        },
        {
            name: 'Nom',
            selector: row => row.name,
            cell: row => <b>{row.name}</b>,
            minWidth: '200px',
        },
        {
            name: 'Pts',
            selector: row => row.points,
            cell: row => <b>{row.points}</b>,
            center: true,
            maxWidth: '30px',
        },
        {
            name: 'J.',
            selector: row => row.played,
            center: true,
            maxWidth: '30px',
        },
        {
            name: 'V.',
            selector: row => row.won,
            center: true,
            maxWidth: '30px',
        },
        {
            name: 'F.',
            selector: row => row.forfit,
            center: true,
            maxWidth: '30px',
        },
        {
            name: 'D.',
            selector: row => row.lost,
            center: true,
            maxWidth: '30px',
        },
        {
            name: 'p.g',
            selector: row => row.p,
            center: true,
            maxWidth: '30px',
        },
        {
            name: 'p.d',
            selector: row => row.c,
            center: true,
            maxWidth: '30px',
        },
        {
            name: '+/-',
            selector: row => row.scoreChange > 0 ? `+${row.scoreChange}` : row.scoreChange,
            center: true,
            maxWidth: '30px',
        }

    ];


    return (
        <div style={{ maxWidth: "80vw" }}>
            <DataTable
                columns={columns}
                data={teams}
                responsive={true}
                noDataComponent={
                    <div style={{ padding: 30, fontSize: 17, display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', height: 150 }}>
                        Veuillez patienter pendant que nous apportons les données souhaitées
                        <Bars
                            heigth="100"
                            width="100"
                            color='grey'
                        />
                    </div>
                }
            />


        </div>
    )
}
