import { useState } from "react"

export default function useUserCredentials(){
    const [userCredent, setUserCredent] = useState({
        isLogin:false,
        userId:'',
        username:''
    })
    return[userCredent, setUserCredent]
}