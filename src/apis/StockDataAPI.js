import api from "./configs/axiosConfig";

//----- Retrieve weekly data for stock
export const search = async ticker => {
  const res = await api.request({
    method: "POST",
    data: { ticker },
    url: "/api/stockData"
  });

  return res;
};