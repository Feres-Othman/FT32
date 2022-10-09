
import Btn from '../../Molecules/Btn'
import NewsItem from './NewsItem'

import React, { useContext, useEffect, useState, useMemo } from 'react'
import { RContext } from '../../RContext'
import { DesignContext } from '../../DesignContext';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { deleteNews, updateNews } from "../actions/ajouterunjouer"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner'


function NewsList() {


    const dispatch = useDispatch();
    let { sex, category } = useParams();

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier, isLoggedIn } = useContext(RContext)

    const [news, setNews] = useState([])

    const getTeams = async () => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
        }

        axios.post("/api/news/read/all", {}, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)


                    setNews(res.newss);
                } else {

                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getTeams();
    }, [])

    const deleteConfirm = (id) => {
        notifier.confirm(
            'Es-tu sûr?',
            () => {

                var session = Ls.getObject('session', { 'isLoggedIn': false });
                let config = {
                    headers: {
                        "auth-token": session.token,
                    }
                }

                dispatch(deleteNews(id, config)); history.go(0)
            },
            () => { },
            {
                labels: {
                    confirm: ''
                }
            }
        )
    }

    const update = (isPublic, id) => {
        notifier.confirm(
            'Es-tu sûr?',
            () => {

                var session = Ls.getObject('session', { 'isLoggedIn': false });
                let config = {
                    headers: {
                        "auth-token": session.token,
                    }
                }

                dispatch(updateNews(id, isPublic, config)); history.go(0)
            },
            () => { },
            {
                labels: {
                    confirm: ''
                }
            }
        )
    }

    let history = useHistory();
    return (
        <div>
            {isLoggedIn &&

                <Btn
                    onClick={() => {
                        history.push(`/news/add`);
                    }}
                    style={{
                        position: 'absolute',
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "start",
                        top: 30,
                        right: 40,
                        textAlign: 'center',
                    }}>Ajouter un Nouveautes</Btn>
            }
            <h1 style={{ textAlign: "center", marginTop: 30, marginBottom: 30 }}>NOUVEAUTES</h1>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}>
                {news.filter(item => item.isPublic || isLoggedIn).map((newsItem) => (
                    <NewsItem {...newsItem} deleteConfirm={deleteConfirm} update={update} isLoggedIn={isLoggedIn} />
                ))}
            </div>

        </div>
    )
}

export default NewsList