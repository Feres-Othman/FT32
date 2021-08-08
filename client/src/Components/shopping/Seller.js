import React, { useContext, useEffect, useState } from 'react'
import { DesignContext } from '../../DesignContext'
import { RContext } from '../../RContext';
import { UserContext } from '../../UserContext'
// import ProfileBio from '../user/ProfileSubComponents/ProfileBio';
// import ProfileInfo from '../user/ProfileSubComponents/ProfileInfo';
// import ProfileProducts from '../user/ProfileSubComponents/ProfileProducts';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
// import { convertBase } from "simple-base-converter";

export default function Seller() {

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    var location = useLocation();

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        let paths = location.pathname.split("/");

        let id62 = paths[paths.length - 1];

        let id16 = 16//convertBase(id62, 62, 16);

        axios.post("/api/user/read/one", {
            idUser: id16
        }, config)
            .then((response) => {
                let res = response.data;

                // console.log(res)

                if (res.success) {

                    setSelectedUser(res.user);
                } else {

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [location.pathname])


    const onFollow = (e) => {
        e.preventDefault();

        var session = Ls.getObject('session', { 'isLoggedIn': false });

        const data = {
            user: selectedUser._id
        }
        const config = {
            headers: {
                "auth-token": session.token,
            }
        };

        axios
            .post("/api/user/follow", data, config)
            .then((response) => {
                console.log(response)
                if (response.data.success) {

                    // notifier.success('followed');

                    let tempUser = user;

                    tempUser.following.push(selectedUser);

                    setUser({ ...tempUser })

                } else {
                    notifier.success(response.data.message);
                }


            })
            .catch((error) => { console.log(error) });

    }

    const onUnFollow = (e) => {
        e.preventDefault();

        var session = Ls.getObject('session', { 'isLoggedIn': false });

        const data = {
            user: selectedUser._id
        }
        const config = {
            headers: {
                "auth-token": session.token,
            }
        };

        axios
            .post("/api/user/unfollow", data, config)
            .then((response) => {
                console.log(response)
                if (response.data.success) {

                    // notifier.success('unfollowed');

                    let tempUser = user;

                    // const index = tempUser.following.indexOf(selectedUser);
                    // if (index > -1) {
                    //     tempUser.following.splice(index, 1);
                    // }

                    let i = 0;
                    for (const iterator of tempUser.following) {
                        if (iterator._id == selectedUser._id) {
                            break;
                        }
                        i++;
                    }
                    tempUser.following.splice(i, 1);

                    setUser({ ...tempUser })

                } else {
                    notifier.success(response.data.message);
                }


            })
            .catch((error) => { console.log(error) });

    }

    const isFollowed = (list, single) => {
        if (list) {
            for (const iterator of list) {
                if (iterator._id === single._id) {
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 50 }}>

            <div style={
                {
                    width: "95vw",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: isMedium ? 'center' : 'space-between',
                    flexWrap: 'wrap',
                    gap: 10,
                    paddingTop: 20
                }
            }>

                <div style={{ width: isMedium ? "100%" : isLarge ? 300 : 300, height: "85vh", display: 'flex', flexDirection: 'column', justifyContent: 'start', gap: 10 }}>

                    {selectedUser != null && <>
                        {/* <ProfileInfo user={selectedUser} isOwner={selectedUser._id === user._id} currentUser={user} onFollow={onFollow} onUnFollow={onUnFollow} followed={isFollowed(user.following, selectedUser)} /> */}

                        {/* <ProfileBio user={selectedUser} /> */}
                    </>}


                </div>


                {/* {selectedUser != null && <ProfileProducts user={selectedUser} currentUser={user} />} */}


            </div>


        </div>
    )
}
