import { useEffect, useState } from "react";
const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem('Cart'));
    const initialData = {
        buyer:'',
        orders: []
    }
    return !data ? initialData : data;
}

export default function useCartList() {
    
    const [cart, setCart] = useState(getInitialData);
    useEffect(() => {
        localStorage.setItem('Cart', JSON.stringify(cart))
    },
        [cart]);
    return [cart, setCart]

}