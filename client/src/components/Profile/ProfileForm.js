import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = event => { 
    event.preventDefault(); 

    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation

    fetch ('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC9-FCX6q25Bxwn3Vc6caYXxmDq-NGVbFo', 
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true
      }),
      headers: {
        'content-type': 'application/json'
      }
    }
    ).then(res => {
      console.log("password changed");
      navigate('/');
    })
  }

  return (
    <form className={classes.form} onSubmit ={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
