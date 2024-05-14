import './stylesheets/Order.css'
import Card from './components/Card'
import { useEffect, useState } from 'react'
import { useCartContext } from './CartProvider'
import TransitionAlerts from './components/TransitionAlerts'
import axios from 'axios'
export default function Order() {
    const product = [
        {productId:3,name:'Cheese',price:50,
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris'},

        {productId:4,name:'Ham and Cheese',price:60,
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris'},

        {productId:5,name:'Crab and Cheese',price:60,
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris'},
    ]
    const [products, setProducts] = useState(product)
    useEffect(()=>{
        const getProduct = async()=>{
            const response = await axios.get('https://takoyaki-rs7d.onrender.com/products',{withCredentials:true})
            setProducts(response.data.product.map((itm)=>{
                return { productId:itm._id, ...itm}
            }))
        }
        getProduct()
    },[])

    return (
        <div className="container order">
            <div className="fixed-grid has-2-cols has-1-cols-mobile" style={{ marginTop: '2rem' }}>
                <div className="grid">
                    {products.map((itm)=>
                    <Card key={itm.productId} imgUrl={itm.imageUrl} productId={itm.productId} name={itm.name} price={itm.price} description={itm.description} qty={1}/>
                    )}
                </div>
            </div>
        </div>
    )
}