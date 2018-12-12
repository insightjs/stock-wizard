import React, { useState, useEffect } from 'react';
import LoginBox from './LoginBox.jsx'
import '../app.css';

export default function App() {
  const [stocks, setStock] = useState('');
  const [credentials, setCredentials] = useState({username: '', password: ''});

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <LoginBox loginUser={console.log('hey you logged in')}/>
    </div>
  );
}
