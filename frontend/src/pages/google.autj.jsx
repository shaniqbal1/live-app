
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {useAuth} from "../hooks/use.auth.jsx"

const GoogleAuth = () => {
    // navigate hook
    const navigate  = useNavigate();
    // /auth/success?accesstoken
   const [searchParams] = useSearchParams();
//    auth hooks 
   const {setAccessToken} =  useAuth();


   useEffect(()=>{
     const accessToken = searchParams.get("accessToken");
     const error = searchParams.get("error");


     if(error){
        navigate(`/login?error=${decodeURIComponent(error)}`)
        return undefined
     }


     if(accessToken){
        setAccessToken(accessToken);
        navigate("/dashboard");
     }else{
        setAccessToken(null)
        navigate("/login");
        return 
     }





   }, [navigate , setAccessToken , searchParams])


  return (
    <div>Loading.....</div>
  )
}

export default GoogleAuth