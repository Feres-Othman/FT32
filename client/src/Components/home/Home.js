import React, { useContext, useEffect, useState } from 'react'
import { DesignContext } from '../../DesignContext';
// import Prd from '../../Molecules/Prd';
import { RContext } from '../../RContext'
// import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import { reactLocalStorage as Ls } from 'reactjs-localstorage';
import { UserContext } from '../../UserContext';
// import Menu from './Menu'
// import Filtering from './Filtering'

export default function Home() {

    const { design } = useContext(DesignContext);
    const { isMedium, isSmall, isLarge, notifier } = useContext(RContext)
    const { user } = useContext(UserContext)

    const [filters, setFilters] = useState([])

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const [pageNumberFiltered, setPageNumberFiltered] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)

    const [hasMore, setHasMore] = useState(true)
    const [hasMoreFiltered, setHasMoreFiltered] = useState(true)



    const getProducts = async (index) => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        axios.post("/api/product/read/all", {
            pageNumber: index,
            owned: false,
        }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    if (res.products.length < 20) {
                        setHasMore(false);
                    }

                    let temp = [...items, ...res.products];

                    temp.sort(function (a, b) { return b.likes.length - a.likes.length });

                    setItems(temp);
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

    const getProductsFiltered = async (index, ffs, reset = false) => {

        var session = Ls.getObject('session', { 'isLoggedIn': false });
        let config = {
            headers: {
                "auth-token": session.token,
            }
        }

        console.log(ffs ? ffs : filters)
        console.log(session.token)


        axios.post("/api/product/read/filter", {
            pageNumber: index,
            filters: ffs ? ffs : filters,
            owned: false
        }, config)
            .then((response) => {
                let res = response.data;
                if (res.success) {
                    console.log(res)
                    if (res.products.length < 20) {
                        setHasMoreFiltered(false);
                    }

                    if (reset) {
                        let temp = [...res.products];

                        temp.sort(function (a, b) { return b.likes.length - a.likes.length });

                        setFilteredItems(temp);
                    } else {
                        let temp = [...filteredItems, ...res.products];

                        temp.sort(function (a, b) { return b.likes.length - a.likes.length });

                        setFilteredItems(temp);
                    }

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

    useEffect(() => {
        getProducts(pageNumber);
    }, [])

    const fetchData = () => {
        let x = pageNumber + 1;
        setPageNumber(x);
        getProducts(x, true);
    }

    const fetchDataFiltered = (ffs = null, reset = false) => {

        let x = pageNumberFiltered + 1;
        if (ffs) {
            x = 0;
        }
        setPageNumberFiltered(x);
        getProductsFiltered(x, ffs, reset);
    }

    const updateFilters = (ffs) => {
        setFilters(ffs);
        setFilteredItems([]);

        setPageNumberFiltered(0);

        fetchDataFiltered(ffs, true);

    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/* <Menu /> */}

            <div style={{ display: 'flex', flexDirection: isMedium ? 'column' : 'row', width: "95vw", gap: 15, marginTop: 20 }}>
                {/* {!isSmall && <Filtering filters={filters} setFilters={updateFilters} />} */}


                <div style={{
                    // height: "80vh",
                    width: isMedium ? '100%' : '88%',
                    // border: `2px solid ${design.backgroundColor}`,
                    borderRadius: 10,
                    backgroundColor: design.backgroundColor,
                    // filter: 'drop-shadow(4px 6px 8px #555)',
                    zIndex: 1,
                    marginBottom: 70
                }}>






                </div>
            </div>

        </div>
    )
}
