import { useState } from "react";

export default function useNotif(){
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] =useState('')
    return [success,setSuccess,error,setError,message,setMessage]
}