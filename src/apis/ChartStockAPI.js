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