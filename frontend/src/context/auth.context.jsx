import { createContext, useEffect, useLayoutEffect, useState } from "react";
import { api } from "../api/axiosinstance.js";
import { authApi } from "../api/auth.api.js";


const AuthContext = createContext();

// provider

function AuthProvider({ children }) {
// accesstoken , user  , isAuthenticated
 const [accessToken , setAccessToken] = useState(null);
 const [user , setUser] = useState(undefined);
 const [loading , setLoading] =  useState(true);
 let IsAuthenticated = accessToken ? true :false ;

// request interceptor
useLayoutEffect(()=>{
     const requestInterceptor =  api.interceptors.request.use(
        (config)=>{
             if(accessToken){
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config;
        },
        (error)=>{
            return Promise.reject(error)
        }
     )

     return ()=>{
        return api.interceptors.request.eject(requestInterceptor);
     }
} , [accessToken])


//response interceptor
useLayoutEffect(()=>{
    const responseInterceptor =  api.interceptors.response.use(
        (res)=> res , 
        async (error)=>{
           const failedReq = error.config;
         if(error?.response?.status === 403  &&  !failedReq._retry){
              failedReq._retry = true;
            //   req to refresh token route
               try {
                   const res= await  authApi.refreshToken()
                    setUser(res.data.user);
                    setAccessToken(res.data.accessToken);
                   failedReq.headers.Authorization = `Bearer ${res.data.accessToken}`
                   return api(failedReq);
               } catch (errorInRefresh) {
                  setUser(null)
                  setAccessToken(null)
                  return Promise.reject(errorInRefresh);
               }
         }

         return Promise.reject(error);

        }
    )


    return ()=>{
         return api.interceptors.response.eject(responseInterceptor);
    }

} , [])



// restore session

useEffect(()=>{
     async function restoreSession(){
       try {
          const res = await authApi.refreshToken();
          setUser(res.data.user);
          setAccessToken(res.data.accessToken); 
          setLoading(false);
       } catch ( error ) {
          console.error(error);
            setUser(null);
            setAccessToken(null);
       } finally{
        setLoading(false)
       }
     }

     restoreSession();
} , [])





    return <AuthContext.Provider value={{IsAuthenticated , user , setUser , accessToken , setAccessToken, loading}}>
        {children}
    </AuthContext.Provider>
}


export { AuthContext, AuthProvider };