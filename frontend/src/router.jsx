import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx";
import GoogleAuth from "./pages/google.autj.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/login" replace />
            },
            {
                path:'/register',
                element:<Register/>
            }, 
            {
                path:"/login",
                element:<Login/>
            }, 
            {
               path:"/auth/success",
               element:<GoogleAuth/>
            },
            {
               path:"/auth/failure",
               element:<GoogleAuth/>
            }, 
        ]
    }
   
])

export {router};
