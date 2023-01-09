//----- Format data for chart compatibility
export const chartDataFormat = chartData => {
  let result = [];

  chartData.forEach(stockData => {
    let formattedStockData = [];
    let limit = 50;
    let counter = 0;
    for(let key in stockData) {
      if(counter >= limit) break; // limit to past 50 weeks

      let formattedWeeklyData = {
        date: key,
        close: parseInt(stockData[key]["4. close"])
      };
      formattedStockData.push(formattedWeeklyData);

      counter += 1;
    }
    result.push(formattedStockData);
  });

  return result;
};