import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from '../../Atoms/logo.png';
import Btn from '../../Molecules/Btn';
import { RContext } from "../../RContext";
import { DesignContext } from "../../DesignContext";
import Input from "../../Molecules/Input";


export default function Register() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    var history = useHistory();

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    const onSubmit = () => {

        if (!firstname) {
            notifier.alert('Saisissez un prénom')
            return;
        }
        if (!lastname) {
            notifier.alert('Saisissez un nom')
            return;
        }
        if (!username) {
            notifier.alert('Saisissez un nom d\'utilisateur unique')
            return;
        }
        if (!email) {
            notifier.alert('Saisissez un email')
            return;
        }
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
        if (!verifyEmail(email)) {
            return;
        }
        else {
            const user = {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password,
            };
            console.log(user);
            axios
                .post("/api/user/register", user)
                .then((res) => {
                    console.log(res.data)
                    // Ls.setObject("session", { token: res.data.token, isLoggedIn: true, username: res.data.username });
                    if (res.data.success) {
                        history.push("/login")
                    }
                })
                .catch((error) => {
                    console.log(error.response.request._response);
                    notifier.alert('Cette email déja enregistré');
                });
        }

    }

    const verifyEmail = temp => {
        console.log(temp)
        //no special characters allowed only alphabet and numbers with max length 10
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (!temp.match(regex)) {
            notifier.alert('Saisissez un email valide')
            return false;
        }

        return true;
    }

    // const verifyPassword = () => {
    //     // console.log(temp)
    //     //no special characters allowed only alphabet and numbers with max length 10
    //     // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    //     if (!temp.match(regex)) {
    //         notifier.alert('Saisissez un email valide')
    //         return false;
    //     }

    //     return true;
    // }

    // const [selectedDate, setSelectedDate] = useState("01-01-1978");

    // const handleDateChange = (date) => {
    //     var selectedDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();
    //     setSelectedDate(selectedDate);
    //     console.log(selectedDate);
    // };

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
                    minHeight: "80vh",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    gap: '25px',
                    width: isSmall ? "95%" : isMedium ? 600 : isLarge ? 800 : 700,
                    padding: "3%",
                    paddingLeft: isLarge ? "6%" : "30px",
                    paddingRight: isLarge ? "6%" : "30px",
                    marginTop: 30,
                    marginBottom: 30,
                    borderRadius: 30,
                    border: `2px solid ${design.backgroundColor}`,
                    backgroundColor: design.backgroundColor
                }
            }>
                <img src={logo} alt={'kaviar'} style={{ width: '25%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <h2 style={{ color: design.mainTextColor, fontSize: isSmall ? 22 : 30 }}>Créer un compte</h2>
                <h4 style={{ color: design.mainTextColor, marginBottom: -10, fontSize: isSmall ? 18 : 22 }}>Saisissez vos données</h4>
                <Input
                    name="firstname"
                    label="Prénom"
                    value={firstname}
                    onChange={setFirstname}
                />
                <Input
                    name="lastname"
                    label="Nom"
                    value={lastname}
                    onChange={setLastname}
                />
                <Input
                    name="username"
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={setUsername}
                />
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={setEmail}
                />
                <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    value={password}
                    onChange={setPassword}
                />
                <Input
                    name="confirmPassword"
                    type="password"
                    label="Confirmer mot de passe"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Btn content="Créer compte" onClick={onSubmit} bg={design.primaryColor} />
                </div>
                <div style={{ color: design.mainTextColor, fontSize: 14 }}>* Obligatoire</div>
                <div onClick={() => history.push("/login")} style={{ color: design.mainTextColor, cursor: 'pointer', textDecoration: 'underline', fontWeight: "bold" }}>Vous avez déjà un compte?</div>
            </div>

        </div>

    );

}
