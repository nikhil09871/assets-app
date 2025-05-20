import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio')
      .then(res => setPortfolio(res.data))
      .catch(err => console.error(err));
  }, []);

  const executeTrade = () => {
    axios.post('http://localhost:5000/api/trades', { symbol: 'AAPL', action: 'buy' })
      .then(res => alert('Trade executed!'))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {portfolio ? (
        <>
          <pre>{JSON.stringify(portfolio, null, 2)}</pre>
          <button onClick={executeTrade}>Execute Trade</button>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default Dashboard;
