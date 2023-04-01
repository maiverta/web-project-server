import React, { useRef, useState } from 'react'
import "./AuthorForm.scss";
import { signUp } from '../../../services/sessionService';
import { useNavigate } from 'react-router-dom';
import {validateUsername, validatePassword, validateFirstName, validateLastName, validateGender} from '../../../services/validationsService';
const AuthorForm = ({publishCallback, formTitle, initialUsername, initialFirstName, initialLastName, initialGender, initialPassword}) => {

    //all the needed fields
    const usernameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const genderRef = useRef();
    const passwordRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        const author = {
            username: usernameRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            gender: genderRef.current.value,
            password: passwordRef.current.value
        }

        //validating username
        let usernameValidationMessage = validateUsername(author.username);
        if(usernameValidationMessage !== null){
            alert(usernameValidationMessage);
            return;
        }

        //validating first name
        let firstNameValidationMessage = validateFirstName(author.firstName);
        if(firstNameValidationMessage !== null){
            alert(firstNameValidationMessage);
            return;
        }

        //validating last name
        let lastNameValidationMessage = validateLastName(author.lastName);
        if(lastNameValidationMessage !== null){
            alert(lastNameValidationMessage);
            return;
        }

        //validating gender (it will be a drop down list in the end)
        let genderValidationMessage = validateGender(author.gender)
        if(genderValidationMessage !== null){
            alert(genderValidationMessage);
            return;
        }
        
        //validating password
        let passwordValidationMessage = validatePassword(author.password);
        if(passwordValidationMessage !== null){
            alert(passwordValidationMessage);
            return;
        }
        
        publishCallback(author);
    }

    //used for page navigation
    //const navigate = useNavigate();

    return (
        <div className='new-author-form'>
            <h1>{formTitle}</h1>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <label htmlFor='username'>Username</label>
                <input type="text" placeholder='Username' id='username' ref={usernameRef} defaultValue = {initialUsername}/>
                
                {/* First Name */}
                <label htmlFor='firstName'>First Name</label>
                <input type="text" placeholder='First Name' id='firstName' ref={firstNameRef} defaultValue = {initialFirstName}/>

                {/* Last Name */}
                <label htmlFor='lastName'>Last Name</label>
                <input type="text" placeholder='Last Name' id='lastName' ref={lastNameRef} defaultValue = {initialLastName}/>

                {/* Gender */}
                <label htmlFor='gender'>Gender</label>
                <select id='gender' ref={genderRef} defaultValue = {initialGender}>
                    <option value="None">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                {/* Password */}
                <label htmlFor='password'>Password</label>
                <input type="password" placeholder='Password' id='password' ref={passwordRef} defaultValue = {initialPassword}/>

                {/* Add Author button */}
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default AuthorForm