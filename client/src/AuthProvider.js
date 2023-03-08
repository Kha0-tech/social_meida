import { createContext,useContext, useState } from "react";

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext)
}

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState(false);
    const [authUser,setAuthUser] = useState(null);
    return(
        <authContext.Provider value={{auth,setAuth,authUser,setAuthUser}}>
            {children}
        </authContext.Provider>
    )
}