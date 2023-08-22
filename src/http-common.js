import axios from "axios";

export default axios.create({
  baseURL: "YOUR_API_URL",
  headers: {
    "Content-type": "application/json"
  }
});