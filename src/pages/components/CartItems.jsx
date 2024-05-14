import { useEffect, useState } from "react"
import { useCartContext } from "../CartProvider";
export default function CartItems({ itmCart,productName, quantity, productId }) {
    const {flash} = useCartContext();
    const [qty, setQuantity] = useState(quantity);
    const changeQuant = (evt) => {
        setQuantity(evt.target.value)
    }
    useEffect(() => {
        itmCart.setCart((prevItem) => ({
            ...prevItem, orders: prevItem.orders.map(
                (itm) => {
                    return itm.productId === productId ? { ...itm, quantity: Number(qty) } : itm
                })
        }));
        if (qty === 0) {
            itmCart.setCart((prevCart) => ({
                ...prevCart,
                orders: prevCart.orders.filter((itm) => itm.productId !== productId)
            }));
            flash.setSuccess(true);
            flash.setMessage('Item removed!!')
        }
    }, [qty])
    useEffect(()=>{
        setQuantity(quantity)
    },[itmCart.cart])
    const addQty = () => {
        setQuantity((prevQty) => prevQty + 1)
    }
    const removeQty = () => {
        setQuantity((prevQty) => prevQty - 1)
    }
    return (
        <>
            <p className="dropdown-item">{productName}&nbsp;&nbsp;&nbsp;
                <button className="button is-link is-outlined is-rounded"
                    onClick={removeQty}
                    style={{ width: "1px", padding: '0 .7rem'}}>-</button>
                <input type="number" className="input" value={qty}
                    style={{ width: '2.5rem', height: '2rem', textAlign: 'center' }} onChange={(evt) => { changeQuant(evt) }} disabled/>
                <button className="button is-link is-rounded" onClick={addQty} style={{ width: "1px", padding: '0 .7rem' }}>+</button>
            </p>
        </>
    )
}