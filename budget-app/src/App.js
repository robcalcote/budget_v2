import React, { useState, useEffect } from "react";

function App() {
  const [transactions, setTransactions] = useState(0);

  useEffect(() => {
    fetch('/transactions')
    .then(res => res.json())
    .then(transactions => {
      setTransactions(transactions);
    });
  }, []);

  return (
    <div>
      {Object(transactions).map(t => (
        <li key={t.Id}>
          {t.Location} - ${t.Amount}
        </li>
      ))}
    </div>
  )
};

export default App;