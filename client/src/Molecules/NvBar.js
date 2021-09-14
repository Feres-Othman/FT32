import React, { useContext, useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import { RContext } from '../RContext'
import logo from '../Atoms/logo.png';
import { UserContext } from '../UserContext'
import { DesignContext } from '../DesignContext';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useHistory } from "react-router-dom";
import { faUser,faTrophy, faUserFriends, faMapMarked, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import axios from 'axios'


function NvBar({ doLogout }) {

    const { design } = useContext(DesignContext);

    var history = useHistory();

    const style = {
        navitem: {
            color: design.mainTextColor,
            paddingLeft: 10,
            paddingRight: 10,
            cursor: "pointer"
        },
        active: {
            fontWeight: 'bolder'
        }
    }

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { user } = useContext(UserContext)
    const [categories, setCategories] = useState([])
    const [data, setData] = useState({ name: "Categorie" })
    const [search, setSearch] = useState("")


    useEffect(() => {
        const getCategories = async () => {

            var session = Ls.getObject('session', { 'isLoggedIn': false });
            let config = {
                headers: {
                    "auth-token": session.token,
                }
            }

            axios.post("/api/category/read/all", {}, config)
                .then((response) => {
                    let res = response.data;
                    if (res.success) {
                        // setAssets(response.data.assets)
                        console.log(res)
                        setCategories(res.categories);
                        // notifier.success(`${response.data.assets.length} assets has been loaded`)

                    } else {
                        return res.json({
                            success: false
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                })

        }
        getCategories();
    }, []);


    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            history.push(`/`);
            history.replace(`/search/${search.split(" ").join("-")}`);
            e.preventDefault();
        }
    }



    return (

        <div style={{ width: "100%", paddingTop: 0, paddingBottom: 0, display: 'flex', flexDirection: isSmall ? 'column' : isMedium ? 'column' : 'row', justifyContent: 'center', zIndex: 20, position: 'relative', marginBottom: 10 }
        } >

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                // border: `2px solid ${design.backgroundColor}`,
                // borderRadius: 25,
                backgroundColor: design.backgroundColor,
                paddingLeft: isSmall ? 20 : 40,
                paddingRight: isSmall ? 20 : 40,
                gap: 30,
                height: 60,
                // filter: 'drop-shadow(4px 6px 8px #555)',
            }} >
                <div
                    onClick={() => {
                        history.push("/")
                    }}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 20, color: design.mainTextColor, cursor: "pointer" }}>
                    <img className="hoverScale" style={{ width: 45, height: 45, borderRadius: "10%", objectFit: "contain", marginTop: 17 }} src={logo}></img>

                    {!isSmall && <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                        <p style={{ fontWeight: "bold", fontSize: 15, marginTop: 17 }}>
                            Fédération Tunisienne <br /> de Tennis de Table
                        </p>
                    </div>}

                </div>



                <div>
                    <NavLink style={style.navitem} activeStyle={style.active} to="/competitions" exact ><Icon icon={faTrophy} className="hoverScale" size="lg" style={{ width: 25 }} /> COMPÉTITIONS </NavLink>
                </div>

                <div>
                    <NavLink style={style.navitem} activeStyle={style.active} to="/teams" exact ><Icon icon={faUserFriends} className="hoverScale" size="lg" style={{ width: 25 }} /> ÉQUIPES </NavLink>
                </div>

                <div>
                    <NavLink style={style.navitem} activeStyle={style.active} to="/players" exact ><Icon icon={faUser} className="hoverScale" size="lg" style={{ width: 25 }} /> JOUEURES </NavLink>
                </div>
                

                <div style={{ width: isSmall ? "10%" : "20%" }} ></div>

                <a target="blank" href="https://www.google.com/maps/dir/?api=1&destination=36.8%2C10.1833&fbclid=IwAR1UuOjlFCVSWEaluFADgfByp9d6Got1kJPTwMN0MnWjV5rhoo_5snn4u7o" style={{ cursor: 'pointer' }}>
                    <Icon icon={faMapMarked} className="hoverScale" size="lg" style={{ width: 25, color: design.mainTextColor }} />
                </a>

                <a href="tel:+21671238722" style={{ cursor: 'pointer' }}>
                    <Icon icon={faPhone} className="hoverScale" size="lg" style={{ width: 25, color: design.mainTextColor }} />
                </a>

                <a target="blank" href="https://www.facebook.com/fttt.tunisia/" style={{ cursor: 'pointer' }}>
                    <Icon icon={faFacebook} className="hoverScale" size="lg" style={{ width: 25, color: design.mainTextColor }} />
                </a>

                <a href="mailto:tunisianttf_2013@yahoo.fr" style={{ cursor: 'pointer' }}>
                    <Icon icon={faEnvelope} className="hoverScale" size="lg" style={{ width: 25, color: design.mainTextColor }} />
                </a>

            </div>


        </div >


    )

}



{/* // style.navitem = { paddingLeft: 10, paddingRight: 10, cursor: "pointer" } */ }

export default NvBar