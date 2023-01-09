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
  Label
} from 'recharts';

export default function Chart(props) {
  // Chart line colors
  const lineColors = ["dodgerblue", "crimson"];

  if(props.chartData) {
    return (
      <div id="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis 
              type="category"
              dataKey="date"
              allowDuplicatedCategory={false}/>
            <YAxis 
              
              tickCount={10}/>
            <Tooltip />
            {props.chartData.map((stockData, idx) => (
              <Line 
                key={idx}
                data={stockData}
                type="monotone"
                dataKey="close"
                stroke={lineColors[idx]}
                dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
};