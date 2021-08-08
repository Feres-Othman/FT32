import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { DesignContext } from '../../../DesignContext'
import { RContext } from '../../../RContext'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import Input from '../../../Molecules/Input'
import DrpDown from '../../../Molecules/DrpDown'

export default function ProductExtraInfo({ category, setCategory, subCategory, setSubCategory, brand, setBrand, size, setSize, condition, setCondition }) {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { design } = useContext(DesignContext)

    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const [brands, setBrands] = useState([])
    const [sizes, setSizes] = useState([])
    const [conditions, setConditions] = useState([])

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

    useEffect(() => {
        const getSubCategories = async () => {

            var session = Ls.getObject('session', { 'isLoggedIn': false });
            let config = {
                headers: {
                    "auth-token": session.token,
                }
            }

            axios.post("/api/subcategory/read/all", {}, config)
                .then((response) => {
                    let res = response.data;
                    if (res.success) {
                        console.log(res)
                        setSubCategories(res.subCategories);
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
        getSubCategories();
    }, []);


    useEffect(() => {
        const getBrands = async () => {

            var session = Ls.getObject('session', { 'isLoggedIn': false });
            let config = {
                headers: {
                    "auth-token": session.token,
                }
            }

            axios.post("/api/brand/read/all", {}, config)
                .then((response) => {
                    let res = response.data;
                    if (res.success) {
                        console.log(res)
                        setBrands(res.brands);
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
        getBrands();
    }, []);


    useEffect(() => {
        const getConditions = async () => {

            var session = Ls.getObject('session', { 'isLoggedIn': false });
            let config = {
                headers: {
                    "auth-token": session.token,
                }
            }

            axios.post("/api/condition/read/all", {}, config)
                .then((response) => {
                    let res = response.data;
                    if (res.success) {
                        console.log(res)
                        setConditions(res.conditions);
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
        getConditions();
    }, []);


    useEffect(() => {
        const getSizes = async () => {

            var session = Ls.getObject('session', { 'isLoggedIn': false });
            let config = {
                headers: {
                    "auth-token": session.token,
                }
            }

            axios.post("/api/size/read/all", {}, config)
                .then((response) => {
                    let res = response.data;
                    if (res.success) {
                        console.log(res)
                        setSizes(res.sizes);
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
        getSizes();
    }, []);



    return (
        <div style={{
            minHeight: isSmall ? "15vh" : isMedium ? '10vh' : isLarge ? '10vh' : '20vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "space-around",
            gap: 20,
            width: isSmall ? "95%" : isMedium ? 600 : isLarge ? 800 : 700,
            maxWidth: "95%",
            padding: 20,
            borderRadius: 30,
            border: `2px solid ${design.backgroundColor}`,
            backgroundColor: design.backgroundColor,
            filter: 'drop-shadow(4px 6px 8px #555)',
        }}>


            <DrpDown label="Catégorie" dataset={categories} data={category} setData={setCategory} >
                Choisir une catégorie
            </DrpDown>

            <DrpDown label="Sous-atégorie" dataset={subCategories} data={subCategory} setData={setSubCategory} >
                Choisir une Sous-catégorie
            </DrpDown>


            <DrpDown label="Marque" dataset={brands} data={brand} setData={setBrand} >
                Choisir une Marque
            </DrpDown>


            <DrpDown label="État" dataset={conditions} data={condition} setData={setCondition} >
                Choisir une État
            </DrpDown>

            <DrpDown label="Taille" dataset={sizes} data={size} setData={setSize} >
                Choisir une Taille
            </DrpDown>

        </div>
    )
}
