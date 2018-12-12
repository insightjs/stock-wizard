import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const LoginBox = ({ loginUser }) => {
  const [username, setUsername] = useState(''); //initialize username state to empty string
  const [password, setPassword] = useState('');

  // useEffect(() => { });

  return (
    <form onSubmit={e => { e.preventDefault(); loginUser(console.log(username, password)) }}>
      {/* <input type='text' placeholder='username' value={value} onChange={e => setUsername(e.target.value)} /> */}
      {/* <input type='text' placeholder='password' value={value} onChange={e => setPassword(e.target.value)} /> */}
      <TextField variant='outlined' placeholder='username' value={value} onChange={e => setUsername(e.target.value)} />;
      <TextField variant='outlined' placeholder='password' value={value} onChange={e => setPassword(e.target.value)} />;
    </form>
  );
}
export default LoginBox;