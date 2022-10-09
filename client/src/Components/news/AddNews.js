import React, { useContext, useEffect, useState } from 'react'
import { RContext } from '../../RContext'
import { useDispatch } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import { Dropdown, FormControl } from 'react-bootstrap'
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import DrpDown from '../../Molecules/DrpDown';
import Btn from '../../Molecules/Btn';
import Input from '../../Molecules/Input';


import { useHistory } from 'react-router-dom';


const AddNews = () => {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const history = useHistory();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [date, setDate] = useState(null)

    const [selectedFile, setSelectedFile] = useState([]);


    const submit = async (isPublic) => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let form = new FormData()

        for (let i = 0; i < Array.from(selectedFile).length; i++) {
            form.append("images", selectedFile[i]);
        }

        form.append("title", title)
        form.append("content", content)
        form.append("date", date)
        form.append("isPublic", isPublic)

        axios.post("/api/news/add", form, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    notifier.success("Nouveautes ajoutee");
                    history.push(`/news`);

                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    return (
        <form  >

            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                padding: 100,
                //paddingTop: "20vh",
                // backgroundColor: design.backgroundColor,
                marginLeft: "5%",
                textAlign: 'center',
                // overflowY: "scroll"
            }} >
                <h1 style={{ textAlign: 'center', margin: 20 }}>Ajouter un Nouveautes</h1>

                {/* <ImageInput /> */}

                <div style={{ marginTop: 20 }} >
                    <Row>

                        <Col>
                            <Input value={title} handleChange={setTitle} name="titre" placeholder="titre" width="400px" />
                        </Col>
                    </Row>
                </div>
                <br />
                <div >
                    <Row>

                        <Col>
                            <Input value={content} handleChange={setContent} name="contenu" placeholder="contenu" width="400px" />
                        </Col>

                        {/* <Col><Input handleChangeEvent={handleChange} name="UniqueNumber" placeholder="Numéro unique" width="200px" ></Input></Col> */}
                    </Row>

                </div>

                <br />

                <input
                    type="file"
                    multiple
                    accept='image/png, image/jpeg'
                    onChange={(e) => setSelectedFile(e.target.files)} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    textAlign: "left",
                    backgroundColor: "#9999",
                    padding: 20,
                    gap: 10,
                    borderRadius: 10,
                    margin: 15
                }}>
                    {Array.from(selectedFile).map((item) => {
                        console.log(item)
                        return <div>
                            - {item.name}
                        </div>
                    })}
                </div>

                <div >
                    <h4 style={{ textAlign: 'left' }}>Date : </h4>
                    <Input value={date} handleChange={setDate} name="Date" placeholder="Date" width="400px" type="date" ></Input>
                </div>
                <br />

                <Btn onClick={() => { submit(true) }} style={{ width: 400, marginBottom: 20 }}>Publique</Btn>
                <Btn onClick={() => { submit(false) }} style={{ width: 400 }}>Privée</Btn>

            </div ></form>
    )
};
export default AddNews;
