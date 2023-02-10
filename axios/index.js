import axios from "axios";
import { backendApi } from "../config/variables";
export const axiosClient = axios.create({ baseURL: backendApi });
