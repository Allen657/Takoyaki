import React, { useContext, useEffect,useState } from "react";
import useCartList from "../utils/useCartList";
import useUserCredentials from "../utils/useUserCredentials";
import axios from 'axios'
import useNotif from "../utils/useNotif";
const CartContext = React.createContext();
export function useCartContext() {
    return useContext(CartContext);
}
export function CartProvider({ children }) {
    const [cart, setCart] = useCartList()
    const [success,setSuccess,error,setError,message,setMessage] = useNotif()
    const [userCredent, setUserCredent] = useUserCredentials();
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await axios.get('https://takoyaki-rs7d.onrender.com/auth/checkLogin', { withCredentials: true });
                console.log(response)
                if (response.data.isLogin) {
                    setUserCredent({
                        isLogin: response.data.isLogin,
                        userId: response.data.user.id,
                        username: response.data.user.username
                    })
                    setCart((prevData)=>{return{...prevData, buyer:response.data.user.id}})
                }else{
                    setCart((prevData)=>{return{...prevData, buyer:''}})
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        // console.log(userCredent)
        checkLoggedIn()
    }, [])
    const props = {
        itmCart: {
            cart,
            setCart,
        },
        userCredentials: {
            userCredent,
            setUserCredent
        },
        flash:{
            success,
            setSuccess,
            error,
            setError,
            message,
            setMessage
        }

    }
    return (
        <CartContext.Provider value={props}>
            {children}
        </CartContext.Provider>
    )
}