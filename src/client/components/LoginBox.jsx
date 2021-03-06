import React, { useState } from 'react';
// import TextField from '@material-ui/core/TextField';

const LoginBox = ({ setLoggedIn }) => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  return (
    <div id='LoginBox'>
      <h2>Login</h2>
      <form onSubmit={e => {
        e.preventDefault(); 
        fetch('/api/signin', {
          method: 'POST', 
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          body: JSON.stringify({
            'username': username,
            'password': password
          })
        })
        .then((res) => res.json())
        .then((res) => {
          res.msg === 'Login success' ? setLoggedIn(true) : alert('Invalid credentials');
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
export default LoginBox;