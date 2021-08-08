import React, { useState, useContext } from "react";
import axios from "axios";
import logo from '../../Atoms/logolebsa.png';
import Btn from '../../Molecules/Btn';
import { RContext } from "../../RContext";
import { DesignContext } from "../../DesignContext";


export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const { isMedium, isSmall, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    const onSubmit = () => {


        if (!password) {
            notifier.alert('Saisissez une mot de passe')
            return;
        }
        if (!confirmPassword) {
            notifier.alert('Confirmer votre mot de passe')
            return;
        }
        if (password !== confirmPassword) {
            notifier.alert("Mot de passe n'est pas identique")
            return;
        }
        else {
            const newPassword = {
                password: password,
                confirmPassword: confirmPassword,
            };
            console.log(newPassword);
            axios
                .post("/api/user/password/reset", newPassword)
                .then((res) => {
                    console.log(res.data)
                    // Ls.setObject("session", { token: res.data.token, isLoggedIn: true, username: res.data.username });
                    // history.push("/projects")
                })
                .catch((error) => {
                    console.log(error.response.request._response);
                    notifier.alert('Un erreur se produite');
                });
        }

    }

    return (

        <div>

            <div className="RegularFont" style={{ minHeight: "100vh", marginLeft: isMedium ? '5%' : '20%', marginRight: isMedium ? '5%' : '20%', display: 'flex', flexDirection: 'column', gap: '30px', padding: isMedium ? '2%' : '6%' }}>
                <img src={logo} alt={'kaviar'} style={{ width: '25%', height: '25%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <h2 style={{ color: '#f6fdfe', fontSize: isSmall ? 22 : 30 }}>Réinitialiser le mot de passe</h2>
                <h4 style={{ color: '#f6fdfe', marginBottom: -10, fontSize: isSmall ? 18 : 22 }}>Nouvelle mot de passe</h4>
                <input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    required
                    className="form-control"
                    style={{ borderRadius: 20 }}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    label="Confirmer mot de passe"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); }}
                    required
                    className="form-control"
                    style={{ borderRadius: 20 }}
                />
                <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Btn content="Réinitialiser" onClick={onSubmit} bg={design.primaryColor} />
                </div>
            </div>

        </div>

    );

}
