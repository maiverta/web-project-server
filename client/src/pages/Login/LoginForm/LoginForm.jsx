import React, { useContext, useRef, useState } from 'react'
import "./LoginForm.scss";
import {validateUsername, validatePassword} from '../../../services/validationsService';
import { login } from '../../../services/sessionService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App';
import { socket } from '../../../socket';

const LoginForm = () => {

    //used for loading while waiting for the server login request
    const [isLoading, setIsLoading] = useState(false);
    const { setIsLoggedIn,setUser } = useContext(AppContext)
    //username and password fields
    const usernameRef = useRef();
    const passwordRef = useRef();

    //used for page navigation
    const navigate = useNavigate();

    const onLoginButtonClick = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;

        //validating username
        let usernameValidationMessage = validateUsername(username);
        if(usernameValidationMessage !== null){
            alert(usernameValidationMessage);
            return;
        }
        
        //validating password
        let passwordValidationMessage = validatePassword(password);
        if(passwordValidationMessage !== null){
            alert(passwordValidationMessage);
            return;
        }

        //both username and password are in the correct format, trying to send the login request to the server
        //TODO: replace console.log callback with setToken function
        setIsLoading(true);
        const loginData = await login(username, password);
        setIsLoading(false);

        if(loginData.success){
            alert(loginData.user._id);
            setUser(()=> {return loginData.user} )
            setIsLoggedIn(true);
            socket.connect();
            navigate("/");
        } else{
            alert("Wrong username or password");
        }
    }

    return (
        <div className='login-form'>
            {/* Username */}
            <label htmlFor='username'>Username</label>
            <input type="text" placeholder='Username' id='username' ref={usernameRef} />

            {/* Password */}
            <label htmlFor='password'>Password</label>
            <input type="password" placeholder='Password' id='password' ref={passwordRef} />

            {/* Login button */}
            <button onClick={async () => onLoginButtonClick()}>{isLoading ? "Loading.." : "Login"}</button>
        </div>
    )
}

export default LoginForm