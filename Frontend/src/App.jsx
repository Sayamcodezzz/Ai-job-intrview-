
import { RouterProvider } from "react-router-dom";
import router from "./app.routes.jsx"
import Register from  "./features/auth/pages/Register.jsx"
import Login from "./features/auth/pages/Login.jsx"
// import './style.scss'   


const App = () => {
  return <RouterProvider router={router}/>
}

export default App
