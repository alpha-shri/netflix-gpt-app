import axios from "axios";
import { BASE_URI } from "@/utils/constants";

export default axios.create({
  baseURL: BASE_URI,
  params: {
    language: "en-US",
  },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});
