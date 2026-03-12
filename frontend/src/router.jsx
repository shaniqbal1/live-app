import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./pages/register.jsx"
import Login from "./pages/login.jsx";
import App from "./App.jsx";
import ChatPage from "./pages/chat.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/register" replace />
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
                path:"/chat",
                element:<ChatPage />
            }
        ]
    }
   
])

export {router};