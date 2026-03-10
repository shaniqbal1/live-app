import { api } from "./axiosinstance"

const userApi = {
    register: (data) => {
        return api.post("/register", data)
    },
    login: (data)=>{
        return api.post("/login" , data)
    } , 
    refreshToken:()=>{
        return api.post("/refresh-token");
    } ,
    logout:()=>{
        return api.get("/logout");
    }
}

export {userApi as authApi, userApi};
