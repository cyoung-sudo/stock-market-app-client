import "./ChartStocks.css";

export default function(props) {
  if(props.chartStocks) {
    return (
      <ul id="chartStocks">
        {props.chartStocks.map((chartStock, idx) => (
          <li key={idx}>
            <button onClick={() => props.handleDelete(chartStock.ticker)}>{chartStock.ticker}</button>
          </li>
        ))}
      </ul>
    );
  }
};