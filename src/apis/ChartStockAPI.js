import api from "./configs/axiosConfig";

//----- Create new chart-stock
export const create = async ticker => {
  const res = await api.request({
    method: "POST",
    data: { ticker },
    url: "/api/chartStock"
  });

  return res;
};

//----- Delete a chart-stock
export const deleteOne = async ticker => {
  const res = await api.request({
    method: "DELETE",
    data: { ticker },
    url: "/api/chartStock"
  });

  return res;
};

//----- Delete all chart-stocks
export const deleteAll = async () => {
  const res = await api.request({
    method: "DELETE",
    url: "/api/chartStock/all"
  });

  return res;
};