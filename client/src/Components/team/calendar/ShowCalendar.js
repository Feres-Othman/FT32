import React, { useContext, useEffect, useState, useMemo } from 'react'
import { RContext } from '../../../RContext'
import { DesignContext } from '../../../DesignContext';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Modal, Button } from "react-bootstrap"
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams } from 'react-router-dom';
import Btn from '../../../Molecules/Btn'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteChampionship } from "../../actions/ajouterunjouer"
import FilterComponent from '../../FilterComponent';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner'

import Calendar from 'rc-year-calendar';
import 'rc-year-calendar/locales/rc-year-calendar.fr';

export default function ShowCalendar({ }) {

    const dispatch = useDispatch();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    let history = useHistory();

    const currentYear = new Date().getFullYear();

    const [dataSourceState, setDataSource] = useState([])
    const [currentEvent, setCurrentEvent] = useState(null)
    const [currentDelete, setCurrentDelete] = useState(null)

    const getProducts = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/league/read/all", { sex: "X", category: "Tout" }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)

                    let leagues = res.leagues;

                    setDataSource([
                        {
                            id: 0,
                            name: 'Google I/O',
                            location: 'San Francisco, CA',
                            startDate: new Date(currentYear, 4, 28),
                            endDate: new Date(currentYear, 4, 29)
                        },
                        {
                            id: 1,
                            name: 'Microsoft Convergence',
                            location: 'New Orleans, LA',
                            startDate: new Date(currentYear, 2, 16),
                            endDate: new Date(currentYear, 2, 19)
                        },
                        {
                            id: 2,
                            name: 'Microsoft Build Developer Conference',
                            location: 'San Francisco, CA',
                            startDate: new Date(currentYear, 3, 29),
                            endDate: new Date(currentYear, 4, 1)
                        },
                        {
                            id: 3,
                            name: 'Apple Special Event',
                            location: 'San Francisco, CA',
                            startDate: new Date(currentYear, 8, 1),
                            endDate: new Date(currentYear, 8, 1)
                        },
                        {
                            id: 4,
                            name: 'Apple Keynote',
                            location: 'San Francisco, CA',
                            startDate: new Date(currentYear, 8, 9),
                            endDate: new Date(currentYear, 8, 9)
                        },
                        {
                            id: 5,
                            name: 'Chrome Developer Summit',
                            location: 'Mountain View, CA',
                            startDate: new Date(currentYear, 10, 17),
                            endDate: new Date(currentYear, 10, 18)
                        },
                        {
                            id: 6,
                            name: 'F8 2015',
                            location: 'San Francisco, CA',
                            startDate: new Date(currentYear, 2, 25),
                            endDate: new Date(currentYear, 2, 26)
                        },
                        {
                            id: 7,
                            name: 'Yahoo Mobile Developer Conference',
                            location: 'New York',
                            startDate: new Date(currentYear, 7, 25),
                            endDate: new Date(currentYear, 7, 26)
                        },
                        {
                            id: 8,
                            name: 'Android Developer Conference',
                            location: 'Santa Clara, CA',
                            startDate: new Date(currentYear, 11, 1),
                            endDate: new Date(currentYear, 11, 4)
                        },
                        {
                            id: 9,
                            name: 'LA Tech Summit',
                            location: 'Los Angeles, CA',
                            startDate: new Date(currentYear, 10, 17),
                            endDate: new Date(currentYear, 10, 17)
                        }
                    ])

                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        getProducts();
    }, [])






    const saveCurrentEvent = () => {
        if (currentEvent.id === undefined) {
            // Add event
            currentEvent.id = Math.max(...dataSourceState.map(evt => evt.id)) + 1;

            setDataSource(dataSourceState.concat([currentEvent]))
            setCurrentEvent(null)
        }
        else {
            // Update event
            var ds = [...dataSourceState];
            var index = ds.findIndex(evt => evt.id == currentEvent.id);
            ds[index] = { ...currentEvent };
            // this.setState({ dataSource: ds, currentEvent: null });
            setDataSource([...ds])
            setCurrentEvent(null)
        }

        setCurrentEvent(null)
    }


    useEffect(() => {
        if (currentDelete >= 0) {
            console.log(currentDelete)
            setDataSource([...dataSourceState.filter(item => item.id != currentDelete)])
            setCurrentDelete(null)
        }

    }, [currentDelete])



    const deleteFunc = (evt) => {
        console.log(evt)
        setCurrentDelete(evt.id)
    }

    return (
        <>

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "centrer",
                textAlign: "center",
                paddingTop: 60
            }}>
                <h1>Calendrier des Championats 2022</h1>
            </div>

            <div style={{
                width: "90vw",
                minHeight: "90vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5vw",
                padding: 100
            }}>
                <Calendar
                    enableRangeSelection={true}
                    enableContextMenu={true}
                    style="background"
                    roundRangeLimits={true}
                    language="fr"
                    // alwaysHalfDay={true}
                    contextMenuItems={[
                        { text: "Update", click: evt => setCurrentEvent(evt) },
                        {
                            text: "Delete", click: evt => { deleteFunc(evt) }
                        }
                    ]}
                    onRangeSelected={e => setCurrentEvent({ startDate: e.startDate, endDate: e.endDate })}
                    dataSource={dataSourceState}
                />
                <Modal show={currentEvent} onHide={() => setCurrentEvent(null)} >
                    {
                        currentEvent &&
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>{currentEvent.id !== undefined ? "Update event" : "Add event"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className="form-horizontal">
                                    <div className="form-group row">
                                        <label htmlFor="event-name" className="col-sm-2 control-label">Name</label>
                                        <div className="col-sm-10">
                                            <input id="event-name" type="text" className="form-control" value={currentEvent.name} onChange={e => setCurrentEvent({ ...currentEvent, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="event-location" className="col-sm-2 control-label">Location</label>
                                        <div className="col-sm-10">
                                            <input id="event-location" type="text" className="form-control" value={currentEvent.location} onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="min-date" className="col-sm-2 control-label">Dates</label>
                                        <div className="col-sm-10">
                                            <div className="input-group input-daterange">
                                                <input id="min-date" type="date" className="form-control" value={currentEvent.startDate.toISOString().substr(0, 10)} onChange={e => setCurrentEvent({ ...currentEvent, startDate: e.target.valueAsDate })} />
                                                <div className="input-group-prepend input-group-append">
                                                    <div className="input-group-text">to</div>
                                                </div>
                                                <input type="date" className="form-control" value={currentEvent.endDate.toISOString().substr(0, 10)} onChange={e => setCurrentEvent({ ...currentEvent, endDate: e.target.valueAsDate })} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>

                            <Modal.Footer>
                                {/* <Button variant="secondary" onClick={() => setCurrentEvent(null)}>Annuler</Button> */}
                                <Btn
                                    onClick={() => setCurrentEvent(null)}
                                    style={{
                                        float: 'right',
                                        display: "flex",
                                        backgroundColor: "#555",
                                        justifyContent: "start",
                                        alignItems: "start",
                                        marginRight: "5%",
                                        marginBottom: "20px",
                                        marginTop: "30px",
                                        textAlign: 'center',
                                    }}>Annuler</Btn>
                                <Btn
                                    onClick={() => saveCurrentEvent()}
                                    style={{
                                        float: 'right',
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "start",
                                        marginRight: "5%",
                                        marginBottom: "20px",
                                        marginTop: "30px",
                                        textAlign: 'center',
                                    }}>enregistrer</Btn>
                            </Modal.Footer>
                        </div>
                    }
                </Modal>

            </div>



        </>
    )
}
