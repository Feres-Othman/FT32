import React from 'react'
import DrpDown from '../../../Molecules/DrpDown'

function Pools({ selectedPool, setSelectedPool, pools }) {
    return (
        <div>
            <DrpDown dataset={pools.map((pool, index) => { return { _id: index, name: pool.name } })} setData={setSelectedPool} data={selectedPool} > Selectionner une poule </DrpDown>
        </div>
    )
}

export default Pools