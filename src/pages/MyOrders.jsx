import axios from "axios"
import { useEffect,useState } from "react"
import OrderCard from "./components/OrderCard"
import { useCartContext } from "./CartProvider"
import { Navigate } from 'react-router-dom';
import OrderCardComplete from "./components/OrderCardComplete";
export default function MyOrders() {
    const {userCredentials} = useCartContext()
    //shows complete orders or not
    const [isComplete,setIscomplete] = useState(false)
    const[completedOrders,setCompletedOrders] = useState(null)
    const[inCompleteOrders,setInCompleteOrders] = useState(null)
    const getOrder = async () => {
        const order = await axios.get(`https://takoyaki-rs7d.onrender.com/orders/${userCredentials.userCredent.userId}`, { withCredentials: true })
        console.log(order.data.orders.filter(itm=>!itm.isCompleted))
        setCompletedOrders(order.data.orders.filter(itm=>itm.isCompleted));
        setInCompleteOrders(order.data.orders.filter(itm=>!itm.isCompleted))
    }
    useEffect(() => {
        
        if(userCredentials.userCredent.isLogin){
            getOrder()
        }
    }, [])
    console.log(completedOrders)
    if(!userCredentials.userCredent.isLogin){
        return <Navigate to='/'/>
    }
    return (
        <>
            <div className="tabs is-toggle is-centered" style={{ marginTop: '2rem' }}>
                <ul>
                    <li className={!isComplete?'is-active':''} style={{ zIndex: '0' }}>
                        <a onClick={()=>setIscomplete(false)}>
                            <span>Ongoing Orders</span>
                        </a>
                    </li>
                    <li className={isComplete?'is-active':''}>
                        <a onClick={()=>setIscomplete(true)}>
                            <span>Completed{isComplete}</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                {!isComplete?//if iscomplete is toggled
                    (inCompleteOrders?
                        inCompleteOrders.map((ordr)=>{
                            return <OrderCard key={ordr._id}order={ordr} setOrders={setInCompleteOrders} getOrder={getOrder}/>
                        }):null): //if not show completed orders
                    (completedOrders?
                        completedOrders.map((ordr)=>{
                            return <OrderCardComplete key={ordr._id}order={ordr} />
                        }):null)}
            </div>
        </>
    )
}





{/* <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>

                <div class="card" style={{ width: '50%', marginBottom: '0rem', borderRadius: '0' }}>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec
                        </div>
                    </div>
                </div>
                <div class="card" style={{ width: '50%', marginBottom: '0rem', borderRadius: '0' }}>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec
                        </div>
                    </div>
                </div>
                <div class="card" style={{ width: '50%', marginBottom: '0rem', borderRadius: '0' }}>
                    <div class="card-content">
                        <div class="content">
                            Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec
                        </div>
                    </div>
                </div>
            </div> */}