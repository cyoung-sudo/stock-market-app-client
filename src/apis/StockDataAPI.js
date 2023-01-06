import api from "./configs/axiosConfig";

//----- Retrieve weekly data for all chart-stocks
export const getAll = async () => {
  const res = await api.request({
    method: "GET",
    url: "/api/stockData/stocks"
  });

  return res;
};