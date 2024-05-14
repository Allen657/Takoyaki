import './Login.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCartContext } from '../CartProvider'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function Login({setIsClose,isClose}) {
    const { userCredentials,flash,itmCart } = useCartContext();
    const [viewPass, setViewPass] = useState(false)
    const [user, setUser] = useState({ username: '', password: '' })
    const viewPassStyle = {
        marginBottom: '-.5rem'
    }
    const setUsername = (evt) => {
        setUser((prevUser) => ({ ...prevUser, username: evt.target.value }))
    }
    const setPassword = (evt) => {
        setUser((prevUser) => ({ ...prevUser, password: evt.target.value }))
    }
    const closeLogin = () => {
        setIsClose((prev)=>(!prev))
    }
    const login = () => {
        const sendCredentials = async () => {
            try{
                const response = await axios.post('https://takoyaki-rs7d.onrender.com/login',
                    { username: user.username, password: user.password },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                        ,
                        withCredentials: true
                    }
                )
                if (response) {
                    userCredentials.setUserCredent({
                        isLogin: response.data.isLogin,
                        userId: response.data.user.id,
                        username: response.data.user.username
                    }
                    )
                    itmCart.setCart((prevData)=>{return{...prevData, buyer:response.data.user.id}})
                    
                }
                closeLogin()
                flash.setSuccess(true);
                flash.setMessage(`Welcome,${response.data.user.username}. you are logged in!`)
            }catch(err){
                flash.setError(true);
                flash.setMessage('Your username or password is incorrect')
                console.log(err)
            }

            
        }
        sendCredentials()
       
    }
    return (
        <>
            <div className='boxContainer' style={{ display: isClose ? 'none' : 'flex' }}>
                <form className="box boxForm">
                    <a className="navbar-burger is-active" onClick={closeLogin} role="button" aria-label="menu" aria-expanded="false" style={{ display: 'flex' }}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                    <div className="field">
                        <label className="label">Username{userCredentials.userCredent.username}</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="username"
                                value={user.username} onChange={(evt) => setUsername(evt)} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password {!viewPass ? <VisibilityOffIcon sx={viewPassStyle} onMouseDown={() => { setViewPass(true) }} /> :
                        <VisibilityIcon sx={viewPassStyle} onMouseUp={() => { setViewPass(false) }} />}</label>
                        <div className="control">
                            <input className="input" type={viewPass ? 'text' : 'password'} placeholder={viewPass ? 'password':'********'}
                                value={user.password} onChange={(evt) => setPassword(evt)} />
                        </div>
                    </div>
                    <div className='buttonContainer'>
                        <button className="button is-primary" onClick={(e)=>{login();e.preventDefault()}}>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}