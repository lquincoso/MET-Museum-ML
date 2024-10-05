import React, { useState } from 'react'
import '../App.css';
import './Login.css';
// import axios from 'axios';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e) => {
    e.preventDefault();
    console.log('Username: ', username);
    console.log('Password: ', password);
  }

  return (
    <>
      <form className='login-form' onSubmit={submit}>
        <InputField className='input--credentials' type='input--credentials' placeholder='Username' name='username' value='' onChange=''/>

      </form>
    </>
  );
}

export default Login;
