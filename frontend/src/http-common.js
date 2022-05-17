import axios from "axios";

//creating axios instance
export default axios.create({
  baseURL: "http://localhost:4000/api/v1/restaurants",
  headers: {
    "Content-type": "application/json",
  },
});
