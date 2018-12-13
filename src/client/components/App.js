import '../app.css';
import React, { useState, useEffect } from 'react';
import LoginBox from './LoginBox.jsx'
import StockChart from './StockChart.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {  });

  if (!loggedIn) {    
    return (
      <div>
        <h1>Welcome to the Stock Wizard</h1>
        <LoginBox setLoggedIn={setLoggedIn} />
      </div>
    );
  } else {
    return (
      <div>
        <StockChart symbol={symbol} setSymbol={setSymbol} />
      </div>
    )
  }
}