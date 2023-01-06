import "./App.css";
// React
import { useState, useEffect } from "react";
// Socket
import { io } from "socket.io-client";
// Components
import Chart from "./components/Chart";
import Form from "./components/Form";
import ChartStocks from "./components/ChartStocks";
import UpdateStatus from "./components/UpdateStatus";
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
  // Update status
  const [updated, setUpdated] = useState(true);
  // Manual refresh
  const [refresh, setRefresh] = useState(true);

  //----- Retrieve data on load
  useEffect(() => {
    StockDataAPI.getAll()
    .then(res => {
      setChartStocks(res.data.chartStocks);
      setChartData(res.data.chartData);
      setUpdated(true);
    })
    .catch(err => console.log(err));
  }, [refresh]);

  //----- Handle chart updates from server
  useEffect(() => {
    socket.on("update_chart", () => {
      setUpdated(false);
    });
  }, [socket]);

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
        // Notify server of chart update
        socket.emit("chart_updated");
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => console.log(err));
  };

  //----- Delete an existing chart-stock
  const handleDelete = ticker => {
    ChartStockAPI.deleteOne(ticker)
    .then(res => {
      console.log("Ticker removed");
      setRefresh(state => !state);
      // Notify server of chart update
      socket.emit("chart_updated");
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="app">
      <div id="app-header">
        <h1>Stock Market App</h1>
        <div>Compare stocks with weekly price-action</div>
      </div>

      <div id="app-updateStatus-wrapper">
        <UpdateStatus 
          updated={updated}
          setRefresh={setRefresh}/>
      </div>

      <div id="app-chart-wrapper">
        <Chart chartData={chartData}/>
      </div>

      <div id="app-chartStocks-wrapper">
        <ChartStocks 
          chartStocks={chartStocks}
          handleDelete={handleDelete}/>
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
