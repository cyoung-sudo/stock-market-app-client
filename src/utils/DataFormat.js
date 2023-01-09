//----- Format data for chart compatibility
export const chartDataFormat = (chartStocks, chartData) => {
  let result = [];

  chartData.forEach((chartData, idx) => {
    let formattedChartData = [];
    let limit = 50;
    let counter = 0;
    for(let key in chartData) {
      if(counter >= limit) break; // limit to past 50 weeks

      let formattedWeeklyData = {
        ticker: chartStocks[idx].ticker,
        date: key,
        close: parseInt(chartData[key]["4. close"])
      };
      formattedChartData.push(formattedWeeklyData);

      counter += 1;
    }
    result.push(formattedChartData);
  });

  return result;
};