import "./Chart.css";
// Chart
import { 
  ResponsiveContainer,
  LineChart,
  Line, 
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function Chart(props) {
  // Chart line colors
  const lineColors = ["dodgerblue", "crimson"];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div id="chart-tooltip">
          <div>{payload[0].payload.date}</div>
          <ul>
            {payload.map((data, idx) => (
              <li key={idx}>
                <span style={{ color: lineColors[idx] }}>{data.payload.ticker}: ${data.payload.close}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  if(props.chartData) {
    return (
      <div id="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis 
              type="category"
              dataKey="date"
              allowDuplicatedCategory={false}
              tick={{fontSize: 14}}
              reversed/>
            <YAxis 
              type="number"
              domain={['auto', 'auto']}
              tick={{fontSize: 14}}/>
            <Tooltip content={<CustomTooltip/>}/>
            {props.chartData.map((stockData, idx) => (
              <Line 
                key={idx}
                data={stockData}
                type="monotone"
                dataKey="close"
                stroke={lineColors[idx]}
                dot={false}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
};