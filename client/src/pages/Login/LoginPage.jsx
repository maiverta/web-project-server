import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import { Link } from 'react-router-dom';

import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <main className='login-page'>
      <h1>LOGIN</h1>
      <LoginForm />
      <Link to="/authors/new">Don't have an account yet?</Link>
    </main>

  )
}

export default LoginPage