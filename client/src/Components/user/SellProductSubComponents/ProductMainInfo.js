import React, { useContext } from 'react'
import { DesignContext } from '../../../DesignContext'
import Input from '../../../Molecules/Input'
import { RContext } from '../../../RContext'


export default function ProductMainInfo({ title, setTitle, description, setDescription }) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    return (
        <div style={{
            minHeight: isSmall ? "15vh" : isMedium ? '10vh' : isLarge ? '10vh' : '20vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-around",
            gap: 20,
            width: isSmall ? "95%" : isMedium ? 600 : isLarge ? 800 : 700,
            maxWidth: "95%",
            padding: 20,
            borderRadius: 30,
            border: `2px solid ${design.backgroundColor}`,
            backgroundColor: design.backgroundColor,
            filter: 'drop-shadow(4px 6px 8px #555)',
        }}>

            <Input
                name="title"
                label="Titre"
                type="text"
                value={title}
                onChange={setTitle}
            />
            <Input
                name="description"
                label="Description"
                type="text"
                value={description}
                onChange={setDescription}
            />

        </div>
    )
}
