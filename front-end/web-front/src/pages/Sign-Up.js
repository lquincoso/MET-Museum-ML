import React, { useState } from 'react';
import '../App.css';
import './Sign-Up-Login.css';
// import axios from 'axios';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

function SignUp() {
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
        <h1 className='title'>Sign up</h1>
        <form className='login-signup-form' onSubmit={submit}>
          <InputField className='input--credentials' type='input--credentials' placeholder='Username' name='username' value='' onChange=''/>
          <InputField className='input--credentials' type='input--credentials' placeholder='Email' name='email' value='' onChange=''/>
          <InputField className='input--credentials' type='input--credentials' placeholder='Password' name='password' value='' onChange=''/>
          <InputField className='input--credentials' type='input--credentials' placeholder='Password' name='password' value='' onChange=''/>
          <div className='btn-wrapper'>
            <Button buttonStyle='btn--login-signup' to='/' aria-label='signup'>signup</Button>
          </div>
          <a className='login-signup-link' href='/login'>New User? Sign up</a>
        </form>
      </div>
    </div>
  );
}
export default SignUp;