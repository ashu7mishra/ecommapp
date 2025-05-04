import axios from "./axios";

export const fetchAddresses = async () => {
  const res = await axios.get("/api/addresses/");
  return res.data;
};
