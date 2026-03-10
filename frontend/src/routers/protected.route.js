import React, { useEffect } from 'react'
import { useAuth } from '../hooks/use.auth';
import { Outlet, useNavigate } from 'react-router-dom';


const ProtectedRoute = () => {
const navigate = useNavigate();
 const {IsAuthenticated } = useAuth()

 useEffect(()=>{
    if(!IsAuthenticated){
        navigate("/login")
    }
 } , [IsAuthenticated, navigate])




  return (
      <Outlet/>  
  )
}

export default ProtectedRoute