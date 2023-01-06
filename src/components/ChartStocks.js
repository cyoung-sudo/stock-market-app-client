import "./ChartStocks.css";

export default function(props) {
  if(props.chartStocks) {
    return (
      <ul id="chartStocks">
        {props.chartStocks.map((chartStock, idx) => (
          <li key={idx}>
            <button>{chartStock.ticker}</button>
          </li>
        ))}
      </ul>
    );
  }
};