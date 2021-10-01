import React, { useState } from 'react'

export default function IndivLineContest({ match, setMatch }) {



    return (
        <div style={{ backgroundColor: "#ddd", width: 200, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 20, borderRadius: 15 }} >
            <input
                type="number"
                min="0"
                max="11"
                placeholder="00"
                value={match.player1Score}
                step="1"
                onChange={(e) => {

                    if (match.player2Score == 11) {
                        if (e.target.value == 11) {
                            setMatch({
                                ...match,
                                player1Score: e.target.value,
                                player2Score: 10
                            });
                            return;
                        }
                    }

                    setMatch({
                        ...match,
                        player1Score: e.target.value
                    });
                }}
                style={{ borderRadius: 15, height: 30, backgroundColor: 'white' }}
                // onKeyPress={onKeyPress}
                className='form-control'
            />

            <input
                type="number"
                min="0"
                max="11"
                placeholder="00"
                value={match.player2Score}
                step="1"
                onChange={(e) => {

                    if (match.player1Score == 11) {
                        if (e.target.value == 11) {
                            setMatch({
                                ...match,
                                player1Score: 10,
                                player2Score: e.target.value
                            });
                            return;
                        }
                    }

                    setMatch({
                        ...match,
                        player2Score: e.target.value
                    });
                }}
                style={{ borderRadius: 15, height: 30, backgroundColor: 'white' }}
                // onKeyPress={onKeyPress}
                className='form-control'
            />

        </div>
    )
}
