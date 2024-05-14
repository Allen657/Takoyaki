import '../Home.css'
import { Link } from 'react-router-dom';
export default function Home() {
    
    return (
        <div className="container is-widescreen home" >
            <h1 className="title" style={{textAlign:'center'}}>Satisfy Your Cravings</h1>
            <h2 className="subtitle">with our Delicious Takoyaki!</h2>
            <button className="button is-link is-white is-medium is-responsive"><Link to='/order' style={{color:'white'}}>Order Now!</Link></button>
        </div>
    )
}