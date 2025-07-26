import axios from "axios";

const buildClient = () => {
  return axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default buildClient;
