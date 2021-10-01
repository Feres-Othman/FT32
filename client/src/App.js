import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect, useMemo } from 'react'
import NvBar from './Molecules/NvBar';
import Ajouterjouer from "./Components/Ajouterjouer"
import Updatejouer from "./Components/updatejouer"
import Ajouterequipe from "./Components/ajouteruneequipe"
import Updateequipe from "./Components/updateE"

import { UserContext } from './UserContext';
import { RContext } from './RContext';
import { DesignContext } from './DesignContext';

import { AnimatedSwitch, spring } from 'react-router-transition';

import jwt_decode from "jwt-decode";
import { Route, useHistory, useLocation, Redirect, NavLink } from "react-router-dom";
import "./AWN.css";
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import AWN from "awesome-notifications"


import Home from './Components/home/Home'
import Register from './Components/auth/Register';
import Login from './Components/auth/Login';
// import ForgetPassword from './Components/auth/ForgetPassword';
// import ResetPassword from './Components/auth/ResetPassword';

import Players from './Components/Players';
import PlayersByTeam from './Components/PlayersByTeam';
import PlayersByFilter from './Components/PlayersByFilter';
import { slide as Menu } from 'react-burger-menu'

import AddMatch from './Components/AddMatch';
import Teams from './Components/team/teamslist';

import logo from './Atoms/logo.png';
import Profile from './Components/Profile';






function App() {

  /**********************************************************/
  /**********************************************************/
  /* snippet To detect screen size like media query in css */
  const [isSmall, setIsSmall] = useState(false)
  const [isMedium, setIsMedium] = useState(false)
  const [isLarge, setIsLarge] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {

    function handleResize() {
      setIsSmall(window.innerWidth < 540)
      setIsMedium(window.innerWidth < 980)
      setIsLarge(window.innerWidth < 1400)
    }

    setIsSmall(window.innerWidth < 540)
    setIsMedium(window.innerWidth < 980)
    setIsLarge(window.innerWidth < 1400)

    window.addEventListener('resize', handleResize)

  }, [])
  /* end : snippet To detect screen size like media query in css */
  /**********************************************************/
  /**********************************************************/

  // Set global options
  let globalOptions = {
    position: isSmall ? "top-right" : "bottom-right",
    maxNotifications: 3,
    icons: { tip: "question", enabled: false }
  }
  // Initialize instance of AWN
  let notifier = new AWN(globalOptions)


  const [render, setRender] = useState(false)

  const [user, setUser] = useState({})

  const [design, setDesign] = useState({
    primaryColor: "#1a7eb4",
    accentColor: "#ccc",//"#0D9BA3",
    backgroundColor: "#fff",
    mainTextColor: "#333",
    secondaryTextColor: "#a31212"
  })


  const [isOpen, setIsOpen] = useState(false)

  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  }

  const responsivenessProviderValue = useMemo(() => ({ isMedium, isSmall, isLarge, notifier, isLoggedIn, setIsLoggedIn }), [isMedium, isSmall, isLarge, notifier, isLoggedIn, setIsLoggedIn]);
  const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const designProvider = useMemo(() => ({ design, setDesign }), [design, setDesign]);

  let location = useLocation();

  var history = useHistory();



  useEffect(() => {

    let verifyToken = (session) => {

      var isExpired = false;
      const token = session.token;
      // console.log(token);
      var decodedToken = jwt_decode(token, { complete: true });
      // console.log(decodedToken);
      var dateNow = new Date();
      if (decodedToken.exp < dateNow.getTime() / 1000)
        isExpired = true;

      if (isExpired) {
        setRender(true);
        history.push("/players");
      } else {
        setRender(true);
        setIsLoggedIn(true);
      }

    }

    var session = Ls.getObject('session', { 'isLoggedIn': false });

    console.log(session)

    var isExpired = false;
    if (session.isLoggedIn) {
      const token = session.token;
      // console.log(token);
      var decodedToken = jwt_decode(token, { complete: true });
      // console.log(decodedToken);
      var dateNow = new Date();
      if (decodedToken.exp < dateNow.getTime() / 1000)
        isExpired = true;

      if (!isExpired) {
        setIsLoggedIn(true);
      }
    }


    if (location.pathname.includes("/register")) {

      console.log("register");
      if (session.isLoggedIn) {

        verifyToken(session);
        history.push("/");
      }
      setRender(true);

    } else if (location.pathname.includes("/login")) {

      console.log("login")
      if (session.isLoggedIn) {

        verifyToken(session);
        history.push("/");
      }
      setRender(true);

    }
    //public routes
    else if (location.pathname.includes("/players")) {

      setRender(true);

    }

    else if (location.pathname.includes("/teams")) {
      setRender(true);

    }

    else if (location.pathname.includes("/competitions")) {

      setRender(true);

    }
    //end public routes

    else if (location.pathname.includes("/reset/password")) {

      console.log("reset password")
      if (session.isLoggedIn) {

        verifyToken(session);
        history.push("/");
      }
      setRender(true);

    } else if (!session.isLoggedIn) {
      // notifier.alert("Connectez-vous");
      setRender(true);
      history.push("/players");

    } else {

      verifyToken(session);

    }

  }, []);

  const doLogout = async () => {

    Ls.remove('session');
    history.push("/login");

  }

  // we need to map the `scale` prop we define below
  // to the transform style property
  function mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `scale(${styles.scale}) translateY(${styles.offset}%)`,
      // transform: `translateY(${styles.offset}%)`,
    };
  }

  // wrap the `spring` helper to use a bouncy config
  function bounce(val) {
    return spring(val, {
      stiffness: 330,
      damping: 22,
    });
  }

  // child matches will...
  const bounceTransition = {
    // start in a transparent, upscaled state
    atEnter: {
      opacity: 0,
      scale: 1.2,
      offset: -10
    },
    // leave in a transparent, downscaled state
    atLeave: {
      opacity: bounce(0),
      scale: bounce(0.8),
      offset: 10
    },
    // and rest at an opaque, normally-scaled state
    atActive: {
      opacity: bounce(1),
      scale: bounce(1),
      offset: 0
    },
  };


  return (
    <>
      {render ?
        <UserContext.Provider value={userProviderValue}>
          <RContext.Provider value={responsivenessProviderValue}>
            <DesignContext.Provider value={designProvider}>
              <div className="mainWrapper">

                {/* remove comments for navbar not show on login et register */}

                {
                  (
                    !location.pathname.includes("/login") &&
                    !location.pathname.includes("/forget/") &&
                    !location.pathname.includes("/reset/") &&
                    !location.pathname.includes("/register")

                  ) &&

                  <div key={Math.random()}>
                    <Menu onStateChange={handleStateChange} isOpen={isOpen} >
                      <div>
                        <img style={{ width: 100 }} src={logo} />
                        <br />
                        Fédération Tunisienne <br /> de Tennis de Table

                      </div>

                      <br />

                      <NavLink onClick={() => { setIsOpen(false) }} id="accueil" style={{ color: "white" }} className="menu-item" to="/">ACCUEIL</NavLink>
                      {/* <NavLink onClick={() => { setIsOpen(false) }} id="home" style={{ color: "white" }} className="menu-item" to="/parcours">PARCOURS</NavLink> */}
                      <NavLink onClick={() => { setIsOpen(false) }} id="home" style={{ color: "white" }} className="menu-item" to="/players">JOUEURS</NavLink>
                      <NavLink onClick={() => { setIsOpen(false) }} id="about" style={{ color: "white" }} className="menu-item" to="/teams">EQUIPES</NavLink>
                      <NavLink onClick={() => { setIsOpen(false) }} id="add" style={{ color: "white" }} className="menu-item" to="/match/add">AJOUTER UN MATCH</NavLink>
                      {/* <NavLink onClick={() => {setIsOpen(false)}} id="contact" style={{ color: "white" }} className="menu-item" to="/presse">PRESSE</NavLink> */}
                      <div style={{ width: 100, height: "27vh", marginBottom: 25, borderBottom: "1px solid white" }} ></div>

                      <a target="blank" href="https://www.google.com/maps/dir/?api=1&destination=36.8%2C10.1833&fbclid=IwAR1UuOjlFCVSWEaluFADgfByp9d6Got1kJPTwMN0MnWjV5rhoo_5snn4u7o" onClick={() => { setIsOpen(false) }} id="location" style={{ color: "white", cursor: "pointer" }} className="menu-item" >LOCALISATION</a>
                      <a href="tel:+21671238722" onClick={() => { setIsOpen(false) }} id="phone" style={{ color: "white", cursor: "pointer" }} className="menu-item" >TELEPHONE</a>
                      <a target="blank" href="https://www.facebook.com/fttt.tunisia/" onClick={() => { setIsOpen(false) }} id="facebook" style={{ color: "white", cursor: "pointer" }} className="menu-item" >FACEBOOK</a>
                      <a href="mailto:tunisianttf_2013@yahoo.fr" onClick={() => { setIsOpen(false) }} id="email" style={{ color: "white", cursor: "pointer" }} className="menu-item" >E-MAIL</a>

                      {
                        isLoggedIn &&
                        <>
                          <div style={{ width: 100, height: 10, marginBottom: 10, borderBottom: "1px solid white" }} ></div>
                          <NavLink onClick={() => { setIsOpen(false); doLogout(); }} id="add" style={{ color: "white" }} className="menu-item" to="/login">SE DECONNECTER</NavLink>
                        </>
                      }


                      {/* <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a> */}
                    </Menu>

                    {isSmall && <div style={{ backgroundColor: "white", position: "fixed", zIndex: 999, width: "100%", height: 40, top: 0, left: 0 }} ></div>}
                  </div>



                }

                {/* <NvBar isSmall={isSmall} doLogout={doLogout} /> */}

                <Route render={({ location }) => (

                  <AnimatedSwitch
                    {...(() => {
                      if (!isSmall) {
                        return {

                          atEnter: bounceTransition.atEnter,
                          atLeave: bounceTransition.atLeave,
                          atActive: bounceTransition.atActive,
                          mapStyles: (styles) => mapStyles(styles),

                        }
                      } else {
                        return {

                          atEnter: {},
                          atLeave: {},
                          atActive: {},
                          mapStyles: (styles) => mapStyles(styles),

                        }
                      }
                    })()}

                    className="switch-wrapper"
                    location={location}>

                    <Route path="/" exact >
                      {/* <Home /> */}
                      <Redirect to="/players" />
                    </Route>

                    {/* AUTH */}
                    <Route path="/login" >
                      <Login />
                    </Route>
                    <Route path="/teams" >
                      <Teams />
                    </Route>
                    <Route path="/updatejoueur/:_id" >
                      <Updatejouer />
                    </Route>
                    <Route path="/Updateequipe/:_id" >
                      <Updateequipe />
                    </Route>


                    <Route path="/register" >
                      <Register />
                    </Route>

                    {/* <Route path="/forget/password" >
                      <ForgetPassword />
                    </Route>

                    <Route path="/reset/password" >
                      <ResetPassword />
                    </Route> */}

                    <Route path="/player/:playerId" >
                      <Profile />
                    </Route>

                    <Route path="/players/:sex/:category" >
                      <PlayersByFilter />
                    </Route>


                    <Route path="/players/:clubName" >
                      <PlayersByTeam />
                    </Route>

                    <Route path="/players" >
                      <Players />
                    </Route>
                    <Route path="/Ajouterjoueur" >
                      <Ajouterjouer />
                    </Route>
                    <Route path="/equipejoueur" >
                      <Ajouterequipe />
                    </Route>

                    <Route path="/match/add" >
                      <AddMatch />
                    </Route>

                    {/* <Route path="/user/view" >
                      <Seller />
                    </Route>

                    <Route path="/product/create" >
                      <SellProduct />
                    </Route> */}

                  </AnimatedSwitch>

                )} />

              </div>
            </DesignContext.Provider>
          </RContext.Provider>
        </UserContext.Provider >


        : <div style={{ width: "100%", height: "100vh", display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
          <img className="hoverScale" style={{ width: !isSmall ? "90px" : "40px", height: !isSmall ? "90px" : "40px", borderRadius: "10%", objectFit: "contain" }} src={logo}></img>
        </div>}
    </>

  );
}

export default App;
