import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export const loginUser = (dataSubmit) => {
  const request = axios.post("/api/users/login", dataSubmit).then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataSubmit) => {
  const request = axios.post("/api/users/register", dataSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const auth = () => {
  const request = axios.get("/api/users/auth").then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
};
