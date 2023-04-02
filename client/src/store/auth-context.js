
import React,{useState} from "react";

const AuthContext = React.createContext({
    email: '',
    token: '',
    isLoggedin: false, 
    login: (token,email) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {

    const [token , setToken] = useState (null);
    const [email , setEmail] = useState ('');

    const userIsLoggin = !!token; 

    const loginHandler = (token,email) => {
        setToken (token);
        setEmail(email);
    }
    const logoutHandler = () => {
        setToken(null);
        setEmail('');
    }

    const contextValue = {
        email:email,
        token: token, 
        isLoggedin: userIsLoggin, 
        login: loginHandler,
        logout: logoutHandler 
    };


    return <AuthContext.Provider value = {contextValue}>
        {props.children}
    </AuthContext.Provider> 

}

export default AuthContext;


