import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';

const RegisterBox = ({ setLoggedIn }) => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  return (
    <div id='RegisterBox'>
      <h2>Register</h2>
      <form onSubmit={e => {
        e.preventDefault(); 
        fetch('/api/register', {
          method: 'POST', 
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          body: JSON.stringify({
            'username': username,
            'password': password
          })
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.msg === 'Login success') {
            setLoggedIn(true)
          } else if (res.msg === 'User already exists') {
            alert('User already exists');
          } else {
            alert('Registration error');
          }
          setUsername(''); setPassword('');
        });
        
      }}>
        <input type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
        <input type='text' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button id='submit-button' value="Submit">submit</button>
        {/* <TextField variant='outlined' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
        <TextField variant='outlined' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} /> */}
      </form>
    </div>
  );
}
export default RegisterBox;