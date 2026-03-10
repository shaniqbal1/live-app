import {api} from "./axiosinstance.js"

const userApi =  {
    register:(data)=>{
        return api.post("/auth/register" , data)
    }
}


export {userApi};