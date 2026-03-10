
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";

function useAuth(){
    return useContext(AuthContext); 
}

export {useAuth};
