import { createContext, useContext, useEffect, useState } from "react"
import api from '../api/axios.js'

const AuthContext = createContext(undefined)

export const AuthProvider = ({children}) =>{

   const [user, setUser] = useState(null)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(()=>{
         const storedUser = localStorage.getItem('user')
         if(storedUser && storedUser !== 'undefined' && storedUser!== 'null'){
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error('Failed to parse stored user', error)
                localStorage.removeItem('user')
            }
         }
         setIsLoading(false)
   },[])


const login = (userData) =>{
setUser(userData)
localStorage.setItem('user', JSON.stringify(userData))
}


const logout = () =>{
    setUser(null)
    localStorage.removeItem('user')
}

const isAuthenticated = !!user;

   return  <AuthContext.Provider value={{user, isLoading, login, logout, isAuthenticated}}>
            
            {children}

           </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(context === undefined){
        throw new error('useAuth must be used within an AuthProvider')
    }
    return context;
}