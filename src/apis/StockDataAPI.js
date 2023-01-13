import api from "./configs/axiosConfig";

//----- Retrieve weekly data for all chart-stocks
export const getAll = async chartStocks => {
  const res = await api.request({
    method: "POST",
    data: { chartStocks },
    url: "/api/stockData/stocks"
  });

  return res;
};