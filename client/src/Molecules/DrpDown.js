import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { RContext } from '../RContext'

export default function DrpDown({ name,dataset, data,value, handleChange, setData, children, label , style = null}) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    return (
        <>
            {label ?
                <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? '' : 'center' }}>
                    <div style={{ fontSize: isSmall ? 13 : 15 }}>{label}</div>
                    <Dropdown  name={name} onChange={handleChange}   value ={value} style={{ width: "100%" }}>

                        <Dropdown.Toggle variant="success" variant="Primary"
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: "100%" }}>
                            {data.name || children}
                        </Dropdown.Toggle>

                        <div style={{ borderRadius: 15, zIndex: 100 }}>
                            <Dropdown.Menu  style={{ width: '100%', zIndex: 100 }}>

                                {dataset.map((item) => (
                                    <Dropdown.Item   key={item._id} onClick={() => { setData(item) }} style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                        <div style={{ paddingTop: 22 }} >{item.name}</div>
                                    </Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </div>

                    </Dropdown>
                </div> :
                <div style={{ display: 'flex', flexDirection: isSmall ? 'column' : 'row', justifyContent: 'space-between', alignItems: isSmall ? '' : 'center' }}>
                    <Dropdown   name={name} onChange={handleChange}  value ={value} style={{ width: 400, ...style}}>

                        <Dropdown.Toggle variant="success" variant="Primary"
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 45, width: 400, ...style }}>
                            {(data.name?.length > 0 ? ((data.name.toLowerCase())[0].toUpperCase() + (data.name.toLowerCase()).substring(1)) : "") || children}
                        </Dropdown.Toggle>

                        <div style={{ borderRadius: 15, zIndex: 100 }}>
                            <Dropdown.Menu   style={{ width: '100%', zIndex: 100 }}>

                                {dataset.map((item) => (
                                    <Dropdown.Item  key={item._id} onClick={() => { setData(item) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", gap: 20 }}>
                                        <div style={{ paddingTop: 10 }} >{(item.name.toLowerCase())[0].toUpperCase() + (item.name.toLowerCase()).substring(1)}</div>
                                        <div style={{ paddingTop: 10 }} >{item.ages}</div>
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
