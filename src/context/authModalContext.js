import React, { useEffect, useReducer } from 'react';
import AuthReducer from "./authModalReducer"

const INITIAL_STATE={
    currentUser:JSON.parse(localStorage.getItem("user")) || null
}

export const AuthContext= React.createContext(INITIAL_STATE)

const AuthContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(AuthReducer, INITIAL_STATE)
    
    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state.currentUser))
    },[state.currentUser])

    return (
        <AuthContext.Provider value={{user:state.currentUser, dispatch}}>
            {children}
            {
                console.log(state.currentUser)
            }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;