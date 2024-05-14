import axios from "axios";
import { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useCartContext } from "../CartProvider";

export default function SignUp({ isSignClose, setIsSignClose }) {
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '' });
    const [viewPass, setViewPass] = useState(false)
    const { flash, userCredentials } = useCartContext();
    const viewPassStyle = {
        marginBottom: '-.5rem'
    }
    const setName = (evt) => {
        setNewUser((prevUser) => ({ ...prevUser, name: evt.target.value }))
    }
    const setUsername = (evt) => {
        setNewUser((prevUser) => ({ ...prevUser, username: evt.target.value }))
    }
    const setPassword = (evt) => {
        setNewUser((prevUser) => ({ ...prevUser, password: evt.target.value }))
    }
    const closeLogin = () => {
        setIsSignClose((prev) => (!prev))
    }
    const signup = async () => {
        try {
            const response = await axios.post('https://takoyaki-rs7d.onrender.com/register', {
                user: {
                    name: newUser.name,
                    username: newUser.username,
                    password: newUser.password
                }

            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
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
            }
            setIsSignClose(true);
            setNewUser({ name: '', username: '', password: '' });
            flash.setSuccess(true);
            flash.setMessage('Sign Up Successfully, you will be logged in!');
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='boxContainer' style={{ display: isSignClose ? 'none' : 'flex' }}>
            <form className="box boxForm">
                <a className="navbar-burger is-active" onClick={closeLogin} role="button" aria-label="menu" aria-expanded="false" style={{ display: 'flex' }}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="username"
                            value={newUser.name} onChange={(evt) => setName(evt)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="username"
                            value={newUser.username} onChange={(evt) => setUsername(evt)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password {!viewPass ? <VisibilityOffIcon sx={viewPassStyle} onMouseDown={() => { setViewPass(true) }} /> :
                        <VisibilityIcon sx={viewPassStyle} onMouseUp={() => { setViewPass(false) }} />}</label>
                    <div className="control">
                        <input className="input" type={viewPass ? 'text' : 'password'} placeholder={!viewPass ? '********' : 'password'}
                            value={newUser.password} onChange={(evt) => setPassword(evt)} />
                    </div>
                </div>
                <div className='buttonContainer'>
                    <button className="button is-primary" onClick={(e) => { signup(); e.preventDefault() }}>SignUp</button>
                </div>
            </form>
        </div>
    )
}