import "./App.css";
// React
import { useState } from "react";
// Socket
import { io } from "socket.io-client";
// Components
import Chart from "./components/Chart";
import Form from "./components/Form";
// APIs
import * as StockDataAPI from "./apis/StockDataAPI";

// Connect to server (proxy server path)
const socket = io();

function App() {
  // Controlled input
  const [ticker, setTicker] = useState("");
  // Requested data
  const [weeklyData, setWeeklyData] = useState(null);

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    
    // Retrieve weekly data for stock
    StockDataAPI.search(ticker)
    .then(res => {
      if(res.data.success) {
        setWeeklyData(res.data.weeklyData);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="app">
      <div id="app-header">
        <h1>Stock Market App</h1>
        <div>Compare stocks with weekly price-action</div>
      </div>

      <div id="app-chart-wrapper">
        <Chart weeklyData={weeklyData}/>
      </div>

      <div id="app-form-wrappper">
        <Form 
          setTicker={setTicker}
          handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default App;
