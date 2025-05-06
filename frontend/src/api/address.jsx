import axios from "./axios";

export const fetchAddresses = async () => {
  const res = await axios.get("/api/address/");
  return res.data;
};

export const createAddress = async (data) => {
  const res = await axios.post("/api/address/", data);
  return res.data;
};