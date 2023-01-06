import "./App.css";
// React
import { useState } from "react";
// Socket
import { io } from "socket.io-client";
// Components
import Chart from "./components/Chart";
import Form from "./components/Form";
import ChartStocks from "./components/ChartStocks";
// APIs
import * as ChartStockAPI from "./apis/ChartStockAPI";
import * as StockDataAPI from "./apis/StockDataAPI";

// Connect to server (proxy server path)
const socket = io();

function App() {
  // Controlled input
  const [ticker, setTicker] = useState("");
  // Requested data
  const [chartStocks, setChartStocks] = useState(null);
  const [chartData, setChartData] = useState(null);

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Create new chart-stock
    ChartStockAPI.create(ticker)
    .then(res => {
      if(res.data.success) {
        // Retrieve data for all chart-stocks
        return StockDataAPI.getAll();
      } else {
        return { error: res.data.message };
      }
    })
    .then(res => {
      if(res.error) {
        console.log(res.error);
      } else if (res.data.success) {
        setChartStocks(res.data.chartStocks);
        setChartData(res.data.chartData);
      } else {
        console.log(res.data.message);
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
        <Chart chartData={chartData}/>
      </div>

      <div id="app-chartStocks-wrapper">
        <ChartStocks chartStocks={chartStocks}/>
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
