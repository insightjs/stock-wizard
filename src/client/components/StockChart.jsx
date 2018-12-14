import React, { useState, useEffect } from 'react';
import PredictionChart from './PredictionChart.jsx';

const StockChart = ({ symbol, setSymbol }) => {
  const [input, handleInput] = useState('');
  const [stockData, handleStockData] = useState('');

  useEffect(() => { });

  return (
    <div id='StockChart'>
      <h1>Stock Predictions</h1>
      <h2>Symbol: {symbol}</h2>
      <form onSubmit={e => {
        e.preventDefault(); 
        fetch(`/api/stock/${input}`)
        .then(res => res.json())
        .then(res => {
          if (res.dberror == 'no such stock found') {
            alert('no such stock found')
          } else {
            handleStockData(res[0]['predictions'])
            setSymbol(input);
          }
        })
        .then(() => handleInput(''))
        .catch(err => console.log(err))
      }}>
        <input type='text' placeholder='ticker / symbol' value={input} onChange={e => handleInput(e.target.value)} />
        <button id='submit-button' value="Submit">submit</button>
      </form>
      
      <PredictionChart stockData={{stockData}} />
      
    </div>
  );
}
export default StockChart;