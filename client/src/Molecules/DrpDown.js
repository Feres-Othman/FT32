import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { RContext } from '../RContext'

export default function DrpDown({ dataset, data, setData, children, label }) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    return (
        <>
            {label ?
                <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? '' : 'center' }}>
                    <div style={{ fontSize: isSmall ? 13 : 15 }}>{label}</div>
                    <Dropdown style={{ width: isSmall ? "100%" : "65%" }}>

                        <Dropdown.Toggle variant="success" variant="Primary"
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%" }}>
                            {data.name || children}
                        </Dropdown.Toggle>

                        <div style={{ borderRadius: 15, zIndex: 100 }}>
                            <Dropdown.Menu style={{ width: '100%', zIndex: 100 }}>

                                {dataset.map((item) => (
                                    <Dropdown.Item key={item._id} onClick={() => { setData(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                        <img src={item.icon} style={{ width: 50, height: 70, objectFit: "contain" }} />
                                        <div style={{ paddingTop: 22 }} >{item.name}</div>
                                    </Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </div>

                    </Dropdown>
                </div> :
                <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? '' : 'center' }}>
                    <Dropdown style={{ width: "100%" }}>

                        <Dropdown.Toggle variant="success" variant="Primary"
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%" }}>
                            {children}
                        </Dropdown.Toggle>

                        <div style={{ borderRadius: 15, zIndex: 100 }}>
                            <Dropdown.Menu style={{ width: '100%', zIndex: 100 }}>

                                {dataset.map((item) => (
                                    <Dropdown.Item key={item._id} onClick={() => { setData(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                        <img src={item.icon} style={{ width: 50, height: 70, objectFit: "contain" }} />
                                        <div style={{ paddingTop: 22 }} >{item.name}</div>
                                    </Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </div>

                    </Dropdown>
                </div>
            }
        </>

    )
}
