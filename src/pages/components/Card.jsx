import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCartContext } from '../CartProvider';
import TransitionAlerts from './TransitionAlerts';
export default function Card({ name, price, description, productId,qty ,imgUrl}) {
    const { itmCart,flash} = useCartContext();
    const addToCart = (newItem) => {
        const existingProduct = itmCart.cart.orders.findIndex((product) => product.productId === productId)
        console.log(existingProduct)
        if (existingProduct !== -1) {
            itmCart.setCart(prevData => ({
                ...prevData,
                orders: prevData.orders.map((item, index) =>
                    index === existingProduct ? { ...item, quantity: item.quantity + 1 } : item
                )
            }));
        } else {
            itmCart.setCart((prevData) => ({ ...prevData, orders: [...prevData.orders, newItem] }))

        }
    }
    const newItem = {
        productId,
        name,
        price,
        description,
        quantity:qty
    }
    return (
        <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img
                        src={imgUrl}
                        alt="Placeholder image"
                    />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{name}</p>
                        <p className="subtitle is-6">₱{price}</p>
                    </div>
                </div>

                <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                    {description}<br /><br />
                    <Button onClick={()=>{
                        addToCart(newItem);
                        flash.setSuccess(true);
                        flash.setMessage('Item added to cart!')
                        }} 
                        variant="outlined" startIcon={<AddShoppingCartIcon />}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}