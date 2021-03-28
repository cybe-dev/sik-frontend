import axios from "axios";

export const baseURL = "http://192.168.43.184:8080";
export const service = axios.create({ baseURL });
