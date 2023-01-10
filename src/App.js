import "./App.css";
// React
import { useState, useEffect } from "react";
// Socket
import { io } from "socket.io-client";
// Components
import Chart from "./components/chart/Chart";
import Form from "./components/chart/Form";
import ChartStocks from "./components/chart/ChartStocks";
import UpdateStatus from "./components/chart/UpdateStatus";
import Loading from "./components/static/Loading";
import Popup from "./components/popup/Popup";
import ChartEmpty from "./components/static/ChartEmpty";
// APIs
import * as ChartStockAPI from "./apis/ChartStockAPI";
import * as StockDataAPI from "./apis/StockDataAPI";
// Utils
import * as DataFormat from "./utils/DataFormat";

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
  // Loading status
  const [loading, setLoading] = useState(true);
  // Popup
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");

  //----- Retrieve data on load
  useEffect(() => {
    // Loading in process
    setLoading(true);
    // Retrieve all chart-stock data
    StockDataAPI.getAll()
    .then(res => {
      if(res.data.success) {
        // Check for empty chart
        if(res.data.chartData.length >= 1) {
          // Format chart data
          let formattedChartData = DataFormat.chartDataFormat(res.data.chartStocks, res.data.chartData);
          setChartStocks(res.data.chartStocks);
          setChartData([...formattedChartData]);
        } else {
          setChartStocks(null);
          setChartData(null);
        }
        setUpdated(true);
        handlePopup("Chart updated", "success");
      } else if(res.data.error === "invalid") {
        //--- Invalid ticker
        // Reset chart
        ChartStockAPI.deleteAll()
        .then(() => {
          handlePopup(res.data.message, "error");
          setChartStocks(null);
          setChartData(null);
          // Notify server of chart update
          socket.emit("chart_updated");
        })
        .catch(err => console.log(err));
      } else {
        //--- API limit reached
        handlePopup(res.data.message, "error");
      }
      // Finished loading
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, [refresh]);

  //----- Listen for chart updates from server
  useEffect(() => {
    socket.on("update_chart", () => {
      setUpdated(false);
    });
  }, [socket]);

  //----- Submit form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Loading in process
    setLoading(true);
    // Create new chart-stock
    ChartStockAPI.create(ticker)
    .then(res => {
      if(res.data.success) {
        return { success: true }
      } else {
        return { error: res.data.message };
      }
    })
    .then(res => {
      if(res.error) {
        //--- Duplicate stock
        handlePopup(res.error, "error");
        setLoading(false);
      } else {
        setRefresh(state => !state);
        // Notify server of chart update
        socket.emit("chart_updated");
      }
    })
    .catch(err => console.log(err));
  };

  //----- Delete an existing chart-stock
  const handleDelete = ticker => {
    // Loading in process
    setLoading(true);
    // Delete given chart-stock
    ChartStockAPI.deleteOne(ticker)
    .then(res => {
      setRefresh(state => !state);
      // Notify server of chart update
      socket.emit("chart_updated");
    })
    .catch(err => console.log(err));
  };

  //----- Display popup
  const handlePopup = (message, type) => {
    setPopupMsg(message);
    setPopupType(type);
  };

  // Chart line colors
  const lineColors = ["dodgerblue", "crimson"];

  if(!loading) {
    return (
      <div id="app">
        {popupMsg && popupType &&
          <div id="app-popup-wrapper">
            <Popup
              message={popupMsg}
              type={popupType}
              handlePopup={handlePopup}/>
          </div>
        }

        <div id="app-header">
          <h1>Stock Market App</h1>
          <div>Compare stocks with weekly price-action</div>
        </div>
  
        <div id="app-updateStatus-wrapper">
          <UpdateStatus 
            updated={updated}
            setRefresh={setRefresh}/>
        </div>
  
        {(chartData !== null) &&
          <div id="app-chart-wrapper">
            <Chart 
              lineColors={lineColors}
              chartData={chartData}/>
          </div>
        }

        {(chartData === null) &&
          <div id="app-chartEmpty-wrapper">
            <ChartEmpty/>
          </div>
        }
  
        <div id="app-chartStocks-wrapper">
          <ChartStocks
            lineColors={lineColors}
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
  } else {
    return (
      <div id="app">
        <Loading/>
      </div>
    );
  }
}

export default App;
