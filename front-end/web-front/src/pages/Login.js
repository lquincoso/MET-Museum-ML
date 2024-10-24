import React, { useState } from 'react'
import '../App.css';
import './Sign-Up-Login.css';
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
    <div className='main'>
      <div className='form-container'>
        <h1 className='title'>Login</h1>
        <form className='login-signup-form' onSubmit={submit}>
          <InputField inputStyle='input--credentials' type='text' placeholder='Username' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
          <InputField inputStyle='input--credentials' type='password' placeholder='Password' name='password' value={password} onChange={e => setPassword(e.target.value)}/>
          <div className='btn-wrapper'>
            <Button buttonStyle='btn--login-signup' to='/' aria-label='Login'>Login</Button>
          </div>
          <a className='login-signup-link' href='/sign-up'>Already registered? Login</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
