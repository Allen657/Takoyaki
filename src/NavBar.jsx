import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './pages/components/Login'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import { useCartContext } from './pages/CartProvider';
import CartItems from './pages/components/CartItems';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import SignUp from './pages/components/SignUp';
function NavBar() {
    const [isActive, setIsActive] = useState(false);
    const toggleMenu = () => {
        setIsActive(!isActive);
    };
    //for toggling login Window
    const [isSignClose, setIsSignClose] = useState(true);
    const [isClose, setIsClose] = useState(true);
    //for useroption dropdown
    const [isCloseDropDown, setisCloseDropDown] = useState(true)
    //for toggling cart
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { flash, userCredentials, itmCart } = useCartContext();
    const toggleLogin = () => {
        setIsClose(!isClose);
    }
    const toggleSignUp = () => {
        setIsSignClose(!isSignClose);
    }
    const checkoutItems = async () => {
        try {
            if (userCredentials.userCredent.isLogin) {
                const response = await axios.post('https://takoyaki-rs7d.onrender.com/orders',
                    {
                        order: {
                            buyer: userCredentials.userCredent.userId,
                            order: itmCart.cart.orders.map((itm) => {
                                return {
                                    product: itm.productId,
                                    quantity: itm.quantity
                                }
                            })
                        }
                    },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                        ,
                        withCredentials: true
                    })
                setIsCartOpen(false)
                itmCart.setCart((prevItem) => { return { ...prevItem, orders: [] } })
                flash.setSuccess(true);
                flash.setMessage('Order Placed!!')
            } else {
                throw new Error('you are not logged in ')
            }
        } catch (err) {
            flash.setError(true)
            flash.setMessage(err.toString())
            toggleLogin()
        }
    }
    const logOut = () => {
        const sendLogoutReq = async () => {
            try {
                const response = await axios.get('https://takoyaki-rs7d.onrender.com/logout', { withCredentials: true })
                console.log(response)
                userCredentials.setUserCredent({
                    isLogin: false, userId: '',
                    username: ''
                })
                itmCart.setCart((prevData) => { return { ...prevData, buyer: '' } })
                setisCloseDropDown(true)
                flash.setSuccess(true);
                flash.setMessage('You are Logged out!')
            } catch (err) {
                console.log(err);
            }
        }
        sendLogoutReq()
    }

    return (
        <>
            <nav className="navbar is-transparent" role="navigation" aria-label="main navigation" style={{ borderBottom: '1px solid #FAFAFA', boxShadow: ' 0 0 10px rgba(0, 0, 0, 0.2)', paddingTop: '.4rem' }}>
                <div className="navbar-brand">
                    <a className="navbar-item is-family-monospace has-text-weight-bold is-size-4">
                        <svg fill="#000000" width="800px" height="800px" viewBox="0 0 64 64"
                            data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M60,37H51.2773c5.2941-4.546,2.2877-13.456-4.5637-13.9626a7.9684,7.9684,0,0,0-13.37-7.6946h-.0005a8.2291,8.2291,0,0,0-1.34,1.8114,8.0213,8.0213,0,0,0-12.66-1.8114h0a8.0848,8.0848,0,0,0-2.0564,7.6946,7.9611,7.9611,0,0,0-4.9431,2.3054h0A8.0826,8.0826,0,0,0,10.07,30.0306,7.9488,7.9488,0,0,0,12.7227,37H4a1,1,0,0,0-1,1,9.01,9.01,0,0,0,8,8.941V48a3.0033,3.0033,0,0,0,3,3H50a3.0033,3.0033,0,0,0,3-3V46.941A9.01,9.01,0,0,0,61,38,1,1,0,0,0,60,37ZM12.431,28.7762c2.2722-5.6788,10.7088-4.601,11.4883,1.41A5.1061,5.1061,0,0,0,17.398,30.2a2.969,2.969,0,0,1-2.0669.8c-1.4994.02-1.9489-.898-3.1183-1.486A5.9662,5.9662,0,0,1,12.431,28.7762Zm6.9635-5.6522a5.9627,5.9627,0,0,1-.3185-1.3113A5.1047,5.1047,0,0,0,25.5981,21.8a2.9693,2.9693,0,0,1,2.0674-.8c1.503-.02,1.9521.903,3.1309,1.4835a5.964,5.964,0,0,1-.1909.64,8.0679,8.0679,0,0,0-5.5269,3.874c-.0527.002-.1045.002-.1572,0a8.2992,8.2992,0,0,0-1.2642-1.6552h0A8.2078,8.2078,0,0,0,19.3945,23.124Zm13.9043-3.9416C35.1978,13.14,44.0914,13.91,44.9253,20.19a5.1071,5.1071,0,0,0-6.5273.01,2.969,2.969,0,0,1-2.0669.8c-1.5032.02-1.9521-.9028-3.1263-1.4908C33.2329,19.3994,33.2645,19.2906,33.2988,19.1824ZM26.431,28.7762c2.2606-5.6389,10.698-4.6325,11.4883,1.41A5.1061,5.1061,0,0,0,31.398,30.2a2.969,2.969,0,0,1-2.0669.8c-1.4994.02-1.9489-.898-3.1183-1.486A5.9662,5.9662,0,0,1,26.431,28.7762ZM44.6055,23.124a8.0679,8.0679,0,0,0-5.5269,3.874c-.0527.002-.1045.002-.1572,0a8.2992,8.2992,0,0,0-1.2642-1.6552h-.0005a8.2078,8.2078,0,0,0-4.2622-2.2188,5.9627,5.9627,0,0,1-.3185-1.3113A5.1047,5.1047,0,0,0,39.5981,21.8a2.9693,2.9693,0,0,1,2.0674-.8c1.503-.02,1.9521.903,3.1309,1.4835A5.964,5.964,0,0,1,44.6055,23.124ZM29.3311,33a4.9069,4.9069,0,0,0,3.267-1.2,2.9685,2.9685,0,0,1,2.0674-.8c1.4995-.02,1.9494.8987,3.1236,1.48-1.59,6.3353-10.8487,5.7951-11.7082-.6634A4.9088,4.9088,0,0,0,29.3311,33Zm8.3256,3.6572A7.9614,7.9614,0,0,0,39,34.8615,7.5853,7.5853,0,0,0,40.7227,37H37.2773C37.405,36.8876,37.5349,36.7791,37.6567,36.6572Zm12.586-1.414a6.0083,6.0083,0,0,1-10.1618-3.4269A5.1037,5.1037,0,0,0,46.5981,31.8a2.9693,2.9693,0,0,1,2.0674-.8c1.5-.02,1.9493.8987,3.1236,1.48A5.936,5.936,0,0,1,50.2427,35.2432Zm.708-7.6189a6.0024,6.0024,0,0,1,.9686,2.5614A5.1061,5.1061,0,0,0,45.398,30.2a2.969,2.969,0,0,1-2.0669.8c-1.4994.02-1.9489-.898-3.1183-1.486C41.2923,24.6333,48.2065,23.3777,50.9507,27.6243ZM25,15.0027A6,6,0,0,1,30.9253,20.19a5.1071,5.1071,0,0,0-6.5273.01,2.969,2.969,0,0,1-2.0669.8c-1.5032.02-1.9521-.9028-3.1263-1.4908A5.9893,5.9893,0,0,1,25,15.0027ZM12.0809,31.8163A5.1037,5.1037,0,0,0,18.5981,31.8a2.9693,2.9693,0,0,1,2.0674-.8c1.5-.02,1.9493.8987,3.1236,1.48C22.1985,38.8152,12.94,38.2747,12.0809,31.8163Zm11.5758,4.8409A7.9614,7.9614,0,0,0,25,34.8615,7.5853,7.5853,0,0,0,26.7227,37H23.2773C23.405,36.8876,23.5349,36.7791,23.6567,36.6572ZM51,48a1.0009,1.0009,0,0,1-1,1H14a1.0009,1.0009,0,0,1-1-1V47H51Zm1-3H12a7.0109,7.0109,0,0,1-6.9287-6H58.9287A7.0109,7.0109,0,0,1,52,45Z" /></svg>
                        TAKOYAKI
                    </a>
                    <a
                        role="button"
                        className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                        aria-label="menu"
                        aria-expanded={`${isActive ? 'true' : 'false'}`}
                        onClick={toggleMenu}
                        data-target="navbar"
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/order">Order</Link>
                        {/* <CircularProgress color="success" /> */}
                        <div className={`dropdown navbar-item ${isCartOpen ? 'is-active' : ''}`}  >
                            <div className="dropdown-trigger">
                                <button style={{ border: 0, boxShadow: 'none' }}
                                    className="button"
                                    onClick={() => { setIsCartOpen(prev => !prev) }}
                                    aria-haspopup="true"
                                    aria-controls="dropdown-menu">
                                    <ShoppingCartIcon />
                                    <ExpandMoreIcon />
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content" style={{ width: '16rem' }} >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {itmCart.cart.orders.length ? (<>{itmCart.cart.orders.map(
                                            (order) => <CartItems
                                                key={itmCart.produc}
                                                itmCart={itmCart}
                                                productId={order.productId}
                                                productName={order.name}
                                                price={order.price}
                                                quantity={order.quantity} />
                                        )}<button className="button is-success" onClick={checkoutItems}>Checkout</button></>)
                                            : <p className='dropdown-item'>Your Cart is Empty</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">

                            {!userCredentials.userCredent.isLogin ? <>
                                <div className="buttons">
                                    <Button variant="outlined" onClick={() => { toggleSignUp(); setIsClose(true) }}>Sign Up</Button>
                                    <Button variant="contained" onClick={() => { toggleLogin(); setIsSignClose(true) }} >Login</Button>
                                </div>
                            </> : (
                                <>
                                    <div className={`dropdown ${!isCloseDropDown ? 'is-active' : ''}`} style={{ marginRight: '2rem' }}>
                                        <div className="dropdown-trigger">
                                            <button style={{ border: 0, boxShadow: 'none' }} className="button" onClick={() => { setisCloseDropDown(prev => !prev) }} aria-haspopup="true" aria-controls="dropdown-menu">
                                                <span>{userCredentials.userCredent.username}</span>
                                                <ExpandMoreIcon />
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content" style={{ marginRight: '18rem' }}>
                                                <Link className="dropdown-item" to={'/MyOrders'} onClick={() => { setisCloseDropDown(true) }}> My Orders </Link>
                                                <Link className="dropdown-item" to={'/'} onClick={logOut}> Logout </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <Button variant="outlined" type='submit' onClick={logOut}>Logout</Button> */}
                                </>

                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {!isClose ? (isSignClose && <Login setIsClose={setIsClose} isClose={isClose} />) : <SignUp setIsSignClose={setIsSignClose} isSignClose={isSignClose} />}
        </>
    );
}

export default NavBar;
