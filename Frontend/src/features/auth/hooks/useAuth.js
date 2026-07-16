import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register,login,logout,getMe } from "../services/auth.api";
import { useEffect } from "react";

// this layer manages the service layer connection bbetween frontend and backend 
// also mange what data store

export const useAuth=()=>{
   
const context=useContext(AuthContext);
const {user,setUser,loading,setLoading}=context;


const handleLogin= async({email,password})=>{
     setLoading(true);
     try {
      
       const data=await login({email,password})
       setUser(data.user);
     } catch (error) {
       alert(`Error:${error}`)
     }finally{

       setLoading(false);
     }

  }

  const handleRegister=async({username,email,password})=>{
    setLoading(true);
    try {
      
      const data=await register({username,email,password});
      setUser(data.user)
    } catch (error) {
      alert(`Error:${error}`)
    } finally{

      setLoading(false);
    }

  }

  const handleLogout= async()=>{
    setLoading(true);
    try {
      const data=await logout();
      
      setUser(null);
    } catch (error) {
      alert(`Error${error}`)
    } finally{
      setLoading(false);

    }
  }

  useEffect(()=>{


    const getAndSetUser= async ()=>{
     try {
      const data=await getMe();
      setUser(data.user)

     } catch (error) {
        console.log(error)
        setUser(null);

     } finally{
      setLoading(false)
     }
    };
    getAndSetUser();
  },[])

  return {user,loading,handleLogin,handleLogout,handleRegister}
}