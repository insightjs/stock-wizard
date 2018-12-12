import '../app.css';
import React, { useState, useEffect } from 'react';
import LoginBox from './LoginBox.jsx'

export default function App() {
  const [count, setCount] = useState(0);
  const [stocks, setStock] = useState('');
  const [credentials, setCredentials] = useState({username: '', password: ''});
  useEffect(() => {
    
  });

  return (
    <div>
      <h1>You clicked {count} times</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <LoginBox loginUser={)}/>
    </div>
  );
}