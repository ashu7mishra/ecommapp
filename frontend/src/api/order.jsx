import axios from "./axios";

export const placeOrder = async (data) => {
  console.log(data);
  const res = await axios.post("/api/order/", data);
  return res.data;
};

export const fetchOrders = async () => {
  const res = await axios.get("/api/order/");
  console.log(res.data);
  return res.data;
};
