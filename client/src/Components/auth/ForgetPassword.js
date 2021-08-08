import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from '../../Atoms/logolebsa.png';
import AWN from 'awesome-notifications';
import Btn from '../../Molecules/Btn';
import { RContext } from "../../RContext";
import { DesignContext } from "../../DesignContext";
import Input from "../../Molecules/Input";

export default function ForgetPassword() {

    const [email, setEmail] = useState("");

    var history = useHistory();

    const { isMedium, isSmall, isLarge } = useContext(RContext)
    const { design } = useContext(DesignContext)

    const onSubmit = () => {

        if (!email) {
            new AWN().alert('Saisissez un email', { durations: { alert: 4000 } })
            return;
        }
        else {
            const e_mail = {
                email: email,
            };
            console.log(e_mail);
            axios
                .post("/api/user/forget", e_mail)
                .then((res) => {
                    // console.log(res.data)
                    // Ls.setObject("session", { token: res.data.token, isLoggedIn: true, username: res.data.username });
                    // history.push("/projects")
                })

                .catch((error) => {
                    // console.log(error.response.request._response);
                    // new AWN().alert('Email / mot de passe incorrect', { durations: { alert: 4000 } });
                });
        }

    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
            e.preventDefault();
        }
    }

    return (

        <div style={
            {
                minHeight: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "1%",
                paddingTop: "1%"
            }
        }>

            <div style={
                {
                    minHeight: "60vh",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    gap: '25px',
                    width: isSmall ? "100%" : isMedium ? 600 : isLarge ? 800 : 700,
                    padding: "3%",
                    paddingLeft: isLarge ? "6%" : "30px",
                    paddingRight: isLarge ? "6%" : "30px",
                    borderRadius: 30,
                    border: `2px solid ${design.backgroundColor}`,
                    backgroundColor: design.backgroundColor
                }
            }>
                <img src={logo} alt={'kaviar'} style={{ width: '25%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <h2 style={{ color: design.mainTextColor, fontSize: isSmall ? 22 : 30 }}>Mot de passe oublié</h2>
                <h4 style={{ color: design.mainTextColor, marginBottom: -10, fontSize: isSmall ? 18 : 22 }}>Saisissez votre e-mail</h4>
                <Input
                    name="email"
                    label="E-mail*"
                    value={email}
                    onChange={setEmail}
                    onKeyPress={handleEnter}
                />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', textAlign: "right" }}>
                    <div style={{ color: design.mainTextColor, fontSize: 14 }}>* Obligatoire</div>

                    <Btn content="Connecter" onClick={onSubmit} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, justifyContent: "center", alignItems: "center" }}>
                    <div onClick={() => history.push("/login")} style={{ fontSize: 14, color: design.mainTextColor, cursor: 'pointer' }}>Essayer de connecter une autre fois</div>
                    <div onClick={() => history.push("/register")} style={{ fontSize: 14, color: design.mainTextColor, cursor: 'pointer' }}>Pas d'un compte? Créer un maintenant</div>
                </div>
            </div>

        </div>

    );
}
