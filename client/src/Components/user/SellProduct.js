import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { Link, useHistory, useLocation } from "react-router-dom";
import Btn from '../../Molecules/Btn';
import { RContext } from "../../RContext";
import ProductImages from "./SellProductSubComponents/ProductImages";
import ProductMainInfo from "./SellProductSubComponents/ProductMainInfo";
import ProductExtraInfo from "./SellProductSubComponents/ProductExtraInfo";
import ProductPricingInfo from "./SellProductSubComponents/ProductPricingInfo";


export default function SellProduct() {

    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)

    const [pictures, setPictures] = useState([])

    var history = useHistory();

    const handleChoose = (url) => {

        setPictures([...pictures, url]);
    }

    const handleCancel = (url) => {

        let array = pictures;

        const index = array.indexOf(url);
        if (index > -1) {
            array.splice(index, 1);
        }

        console.log(array.length);

        setPictures([...array]);
    }

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [category, setCategory] = useState({})
    const [subCategory, setSubCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [condition, setCondition] = useState({})
    const [size, setSize] = useState({})
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const onSend = () => {

        // console.log(pictures)

        if (!title) {
            notifier.alert('Saisissez un nom du produit')
            return;
        }
        if (!description) {
            notifier.alert('Saisissez une description')
            return;
        }
        if (!category) {
            notifier.alert('Saisissez une categorie')
            return;
        }
        if (!subCategory) {
            notifier.alert('Saisissez une sous categorie')
            return;
        }
        if (!brand) {
            notifier.alert('Saisissez un nom du marque')
            return;
        }
        if (!condition) {
            notifier.alert("Saisissez l'état du produit")
            return;
        }
        if (!price) {
            notifier.alert('Saisissez un prix du produit')
            return;
        }
        if (isNaN(price)) {
            notifier.alert('Saisissez un prix valide')
            return;
        }
        if (pictures.length == 0) {
            notifier.alert('Choisir au moins une photo du produit')
            return;
        }
        if (!size) {
            notifier.alert('Saisissez la taille')
            return;
        }
        else {
            const newProduct = {
                name: title,
                description: description,
                category: category._id,
                subCategory: subCategory._id,
                brand: brand._id,
                condition: condition._id,
                price: price,
                pictures: pictures,
                size: size._id,
                discount: discount,
            };

            var session = Ls.getObject('session', { 'isLoggedIn': false });

            const config = {
                headers: {
                    "auth-token": session.token,
                }
            };

            axios
                .post("/api/product/create", newProduct, config)
                .then((response) => {
                    // alert("The file is successfully uploaded  " + toString(response.asset._id));
                    notifier.success("Article ajouté");
                    history.push('/profile');
                })
                .catch((error) => { console.log('error') });
        }
    }


    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, marginBottom: 100 }}>

            <div style={{ fontWeight: 'bolder', fontSize: 24 }}>Vendre un article</div>

            <ProductImages pictures={pictures} handleChoose={handleChoose} handleCancel={handleCancel} />

            <ProductMainInfo

                title={title}
                description={description}
                setDescription={setDescription}
                setTitle={setTitle}

            />

            <ProductExtraInfo

                category={category}
                subCategory={subCategory}
                condition={condition}
                size={size}
                brand={brand}
                setSize={setSize}
                setBrand={setBrand}
                setCondition={setCondition}
                setCategory={setCategory}
                setSubCategory={setSubCategory}

            />

            <ProductPricingInfo

                price={price}
                discount={discount}
                setPrice={setPrice}
                setDiscount={setDiscount}

            />

            <Btn onClick={onSend} >
                Je vends
            </Btn>

        </div>
    )
}
