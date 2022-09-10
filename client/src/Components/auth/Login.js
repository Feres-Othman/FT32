import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import logo from '../../Atoms/logo.png';
import Btn from '../../Molecules/Btn';
import { RContext } from "../../RContext";
import { DesignContext } from "../../DesignContext";
import Input from "../../Molecules/Input";
import { UserContext } from "../../UserContext";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    var history = useHistory();

    const { isMedium, isSmall, isLarge, notifier, setIsLoggedIn } = useContext(RContext)
    const { design } = useContext(DesignContext)
    const { setUser } = useContext(UserContext);



    const onSubmit = () => {

        if (!email) {
            notifier.alert('Saisissez un email ou un nom d\'utilisateur')
            return;
        }
        if (!password) {
            notifier.alert('Saisissez une mot de passe')
            return;
        }
        else {
            const user = {
                email: email,
                password: password
            };
            // console.log(user);
            axios
                .post("https://www.fttt-competition.com/api/user/login", user)
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        // console.log(res.data)

                        setUser(res.data.user);
                        setIsLoggedIn(true);
                        Ls.setObject("session", { token: res.data.token, isLoggedIn: true, username: res.data.username });
                        history.push("/players")

                    } else {
                        notifier.alert(res.data.message);
                    }
                })

                .catch((error) => {
                    console.log(error.response.request._response);
                    notifier.alert('Email / mot de passe incorrect');
                });
        }

    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
            e.preventDefault();
        }
    }

    const responseFacebook = (response) => {
        console.log(response);


        const user = {
            firstname: response.name.split(" ")[0],
            lastname: response.name.split(" ")[1],
            username: response.name,
            email: response.email,
            password: "",
            profilePic: response.picture.data.url,
        };

        console.log(user);
        axios
            .post("/api/user/login/fb", user)
            .then((res) => {
                if (res.data.success) {
                    // console.log(res.data)

                    setUser(res.data.user);


                    Ls.setObject("session", { token: res.data.token, isLoggedIn: true, username: res.data.username });
                    history.push("/players")

                } else {
                    notifier.alert(res.data.message);
                }
            })
            .catch((error) => {
                console.log(error.response.request._response);
                notifier.alert('Cette email déja enregistré');
            });


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
                    minHeight: "80vh",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    gap: '25px',
                    width: isSmall ? "95%" : isMedium ? 600 : isLarge ? 800 : 700,
                    padding: "3%",
                    paddingLeft: isLarge ? "6%" : "30px",
                    paddingRight: isLarge ? "6%" : "30px",
                    borderRadius: 30,
                    border: `2px solid ${design.backgroundColor}`,
                    backgroundColor: design.backgroundColor
                }
            }>
                <img src={logo} alt={'kaviar'} style={{ width: '25%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                <h2 style={{ color: design.mainTextColor, fontSize: isSmall ? 22 : 30 }}>Se connecter avec</h2>


                <h4 style={{ color: design.mainTextColor, marginBottom: -10, fontSize: isSmall ? 18 : 22 }}>Ou saisissez vos identifiants</h4>

                <Input
                    name="email"
                    label="Nom d'utilisateur ou E-mail*"
                    type="text"
                    value={email}
                    handleChange={setEmail}
                />

                <Input
                    name="password"
                    type="password"
                    label="Mot de passe*"
                    value={password}
                    handleChange={setPassword}
                    onKeyPress={handleEnter}
                />

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1vh' }}>
                        <input type="checkbox" id="stay" name="stay" className="check" />
                        <label htmlFor="stay" style={{ cursor: 'pointer', color: design.mainTextColor }}>Restez connecté</label>
                    </div>
                    <Btn onClick={onSubmit} >
                        Connexion
                    </Btn>
                </div>
                <div style={{ color: design.mainTextColor, fontSize: 14 }}>* Obligatoire</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, justifyContent: "center", alignItems: "center" }}>
                    <div
                        onClick={() => history.push("/forget/password")}
                        style={
                            {
                                fontSize: 14,
                                color: design.mainTextColor,
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }
                        }>
                        Mot de passe oublié? Cliquez ici
                    </div>
                    <div onClick={() => history.push("/register")} style={{
                        fontSize: 14, color: design.mainTextColor, cursor: 'pointer', textDecoration: 'underline', fontWeight: "bold"
                    }}>Pas d'un membre? inscrivez-vous</div>
                </div>
            </div>

        </div>

    );
}



{/* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */}