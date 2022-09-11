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

import DrpDown from '../../../Molecules/DrpDown';
import Calendar from 'rc-year-calendar';
import 'rc-year-calendar/locales/rc-year-calendar.fr';
import { Update } from '../../../api';

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

        axios.post("/api/calendar/read/all", { sex: "X", category: "Tout" }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)

                    let calendars = res.calendars.map(ev => { return { ...ev, id: ev._id, startDate: new Date(ev.startDate), endDate: new Date(ev.endDate) } });

                    setDataSource([
                        ...calendars
                        // {
                        //     id: 0,
                        //     name: 'Google I/O',
                        //     location: 'San Francisco, CA',
                        //     startDate: new Date(currentYear, 4, 28),
                        //     endDate: new Date(currentYear, 4, 29)
                        // },
                        // {
                        //     id: 1,
                        //     name: 'Microsoft Convergence',
                        //     location: 'New Orleans, LA',
                        //     startDate: new Date(currentYear, 2, 16),
                        //     endDate: new Date(currentYear, 2, 19)
                        // },
                        // {
                        //     id: 2,
                        //     name: 'Microsoft Build Developer Conference',
                        //     location: 'San Francisco, CA',
                        //     startDate: new Date(currentYear, 3, 29),
                        //     endDate: new Date(currentYear, 4, 1)
                        // },
                        // {
                        //     id: 3,
                        //     name: 'Apple Special Event',
                        //     location: 'San Francisco, CA',
                        //     startDate: new Date(currentYear, 8, 1),
                        //     endDate: new Date(currentYear, 8, 1)
                        // },
                        // {
                        //     id: 4,
                        //     name: 'Apple Keynote',
                        //     location: 'San Francisco, CA',
                        //     startDate: new Date(currentYear, 8, 9),
                        //     endDate: new Date(currentYear, 8, 9)
                        // },
                        // {
                        //     id: 5,
                        //     name: 'Chrome Developer Summit',
                        //     location: 'Mountain View, CA',
                        //     startDate: new Date(currentYear, 10, 17),
                        //     endDate: new Date(currentYear, 10, 18)
                        // },
                        // {
                        //     id: 6,
                        //     name: 'F8 2015',
                        //     location: 'San Francisco, CA',
                        //     startDate: new Date(currentYear, 2, 25),
                        //     endDate: new Date(currentYear, 2, 26)
                        // },
                        // {
                        //     id: 7,
                        //     name: 'Yahoo Mobile Developer Conference',
                        //     location: 'New York',
                        //     startDate: new Date(currentYear, 7, 25),
                        //     endDate: new Date(currentYear, 7, 26)
                        // },
                        // {
                        //     id: 8,
                        //     name: 'Android Developer Conference',
                        //     location: 'Santa Clara, CA',
                        //     startDate: new Date(currentYear, 11, 1),
                        //     endDate: new Date(currentYear, 11, 4)
                        // },
                        // {
                        //     id: 9,
                        //     name: 'LA Tech Summit',
                        //     location: 'Los Angeles, CA',
                        //     startDate: new Date(currentYear, 10, 17),
                        //     endDate: new Date(currentYear, 10, 17)
                        // }
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


    const submit = async () => {


        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let content = {
            name: currentEvent.name,
            location: currentEvent.location,
            color: currentEvent.color,
            startDate: currentEvent.startDate,
            endDate: currentEvent.endDate,
            isPublic: currentEvent.public

        }

        axios.post("/api/calendar/add", content, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    // if (isTeam) {
                    //     notifier.success("match ajoutee");
                    //     history.push("/");
                    // } else {
                    //     notifier.success("match ajoutee");
                    //     history.go(0)
                    // }
                    notifier.success("événement ajoute");
                    history.go(0)
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    const update = async () => {


        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let content = {
            _id: currentEvent._id,
            name: currentEvent.name,
            location: currentEvent.location,
            startDate: currentEvent.startDate,
            endDate: currentEvent.endDate,
            color: currentEvent.color,
            isPublic: currentEvent.public

        }

        axios.post("/api/calendar/edit", content, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {

                    // if (isTeam) {
                    //     notifier.success("match ajoutee");
                    //     history.push("/");
                    // } else {
                    //     notifier.success("match ajoutee");
                    //     history.go(0)
                    // }
                    notifier.success("événement modifiee");
                    history.go(0)
                } else {
                    console.log(res)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }



    const saveCurrentEvent = () => {
        if (currentEvent.id === undefined) {
            // Add event
            currentEvent.id = Math.max(...dataSourceState.map(evt => evt.id)) + 1;

            setDataSource(dataSourceState.concat([currentEvent]))
            submit()
            setCurrentEvent(null)
        }
        else {
            // Update event
            var ds = [...dataSourceState];
            var index = ds.findIndex(evt => evt.id == currentEvent.id);
            ds[index] = { ...currentEvent };
            // this.setState({ dataSource: ds, currentEvent: null });
            setDataSource([...ds])

            update()

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

    const colorFromType = (value) => {
        switch (value._id) {
            case 1:
                return "#ffff00";
            case 2:
                return "#0000ff";
            case 3:
                return "#ff7f00";
            case 4:
                return "#7308a5";
            case 5:
                return "#00ff00";
            case 6:
                return "#ba00ff";
            case 7:
                return "#cc00af";
            case 8:
                return "#feb300";
            default:
                return "#feb300";
        }
    }

    const typeFromColor = (value) => {
        switch (value) {
            case "#ffff00":
                return {
                    _id: 1,
                    name: "Championnat par équipes jeunes"
                };
            case "#0000ff":
                return {
                    _id: 2,
                    name: "Championnat par équipes filles"
                };
            case "#ff7f00":
                return {
                    _id: 3,
                    name: "Championnat par équipes seniors hommes"
                };
            case "#7308a5":
                return {
                    _id: 4,
                    name: "Championnat par équipes seniors dames"
                };
            case "#00ff00":
                return {
                    _id: 5,
                    name: "coupe de tunisie par équipes"
                };
            case "#ba00ff":
                return {
                    _id: 6,
                    name: "Compétitions individuelles"
                };
            case "#cc00af":
                return {
                    _id: 7,
                    name: "Evennements internationals"
                };
            case "#feb300":
                return {
                    _id: 8,
                    name: "Autres"
                };
            default:
                return {
                    _id: 8,
                    name: "Autres"
                };
        }
    }

    const types = [
        {
            _id: 1,
            name: "Championnat par équipes jeunes",
            color: "#ffff00"
        },
        {
            _id: 2,
            name: "Championnat par équipes filles",
            color: "#0000ff"
        },
        {
            _id: 3,
            name: "Championnat par équipes seniors hommes",
            color: "#ff7f00"
        },
        {
            _id: 4,
            name: "Championnat par équipes seniors dames",
            color: "#7308a5"
        },
        {
            _id: 5,
            name: "coupe de tunisie par équipes",
            color: "#00ff00"
        },
        {
            _id: 6,
            name: "Compétitions individuelles",
            color: "#ba00ff"
        },
        {
            _id: 7,
            name: "Evennements internationals",
            color: "#cc00af"
        },
        {
            _id: 8,
            name: "Autres",
            color: "#feb300"
        }

    ]


    const [type, setType] = useState({})

    return (
        <>

            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                paddingTop: 60
            }}>
                <h1>Calendrier Général</h1>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                textAlign: "center",
                position: "absolute",
                top: 20,
                right: 20
            }}>
                {types.map((type, index) => {
                    return <h6 style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10
                    }}>
                        <div style={{
                            width: 20,
                            height: 20,
                            backgroundColor: type.color,
                        }}></div>
                        {type.name}
                    </h6>
                })}

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
                    enableRangeSelection={isLoggedIn}
                    enableContextMenu={isLoggedIn}
                    style="background"
                    roundRangeLimits={true}
                    language="fr"
                    // alwaysHalfDay={true}
                    contextMenuItems={[
                        { text: "modifier", click: evt => setCurrentEvent(evt) },
                        {
                            text: "supprimer", click: evt => { deleteFunc(evt) }
                        }
                    ]}
                    onRangeSelected={e => setCurrentEvent({ startDate: e.startDate, endDate: e.endDate })}
                    dataSource={isLoggedIn ? dataSourceState : dataSourceState.filter(evt => evt.public)}
                />
                <Modal show={currentEvent} onHide={() => setCurrentEvent(null)} >
                    {
                        currentEvent &&
                        <div>
                            <Modal.Header closeButton>
                                <Modal.Title>{currentEvent.id !== undefined ? "Modifier événement" : "Ajouter événement"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className="form-horizontal">
                                    <div className="form-group row">
                                        <label htmlFor="event-name" className="col-sm-3 control-label">Nom</label>
                                        <div className="col-sm-9">
                                            <input id="event-name" type="text" className="form-control" value={currentEvent.name} onChange={e => setCurrentEvent({ ...currentEvent, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="event-location" className="col-sm-3 control-label">Emplacement</label>
                                        <div className="col-sm-9">
                                            <input id="event-location" type="text" className="form-control" value={currentEvent.location} onChange={e => setCurrentEvent({ ...currentEvent, location: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="min-date" className="col-sm-3 control-label">Dates</label>
                                        <div className="col-sm-9">
                                            <div className="input-group input-daterange">
                                                <input id="min-date" type="date" className="form-control" value={currentEvent.startDate.toISOString().substr(0, 10)} onChange={e => setCurrentEvent({ ...currentEvent, startDate: e.target.valueAsDate })} />
                                                <div className="input-group-prepend input-group-append">
                                                    <div className="input-group-text">à</div>
                                                </div>
                                                <input type="date" className="form-control" value={currentEvent.endDate.toISOString().substr(0, 10)} onChange={e => setCurrentEvent({ ...currentEvent, endDate: e.target.valueAsDate })} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="event-public" className="col-sm-3 control-label">public</label>
                                        <div className="col-sm-9">
                                            <input id="event-public" type="checkbox" className="form-control" checked={currentEvent.public} onChange={e => setCurrentEvent({ ...currentEvent, public: e.target.checked })} />
                                        </div>
                                    </div>

                                    <DrpDown style={{ width: "30%", minWidth: 450 }} dataset={types} setData={(item) => { setCurrentEvent({ ...currentEvent, color: colorFromType(item) }) }} data={typeFromColor(currentEvent.color)} label={"Type"} > Selectionner un type </DrpDown>



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
