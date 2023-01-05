import "./App.css";
// Components
import Chart from "./components/Chart";
import Form from "./components/Form";

function App() {
  return (
    <div id="app">
      <div id="app-header">
        <h1>Stock Market App</h1>
      </div>

      <div id="app-chart-wrapper">
        <Chart/>
      </div>

      <div id="app-form-wrappper">
        <Form/>
      </div>
    </div>
  );
}

export default App;
