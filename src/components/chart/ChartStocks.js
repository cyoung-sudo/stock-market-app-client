import "./ChartStocks.css";
// Icons
import { RxCross2 } from "react-icons/rx";

export default function(props) {
  if(props.chartStocks) {
    return (
      <ul 
        data-testid="chartStocks"
        id="chartStocks">
        {props.chartStocks.map((chartStock, idx) => (
          <li key={idx}>
            <button 
              data-testid="chartStocks-remove"
              style={{ backgroundColor: props.lineColors[idx] }}
              onClick={() => props.handleDelete(chartStock.ticker)}>
              {chartStock.ticker}<span><RxCross2/></span>
            </button>
          </li>
        ))}
      </ul>
    );
  }
};