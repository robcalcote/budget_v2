import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Months from './Months';
import Transactions from './Transactions';
import NoPage from "./pages/NoPage";
import Navbar from "./Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Transactions />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="months" element={<Months />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));