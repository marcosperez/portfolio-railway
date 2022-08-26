import axios from "axios";

const BASE_PATH = process.env.REACT_APP_SECRET_NAME;
const USER_BASE_PATH = "users";

interface LoginResponse {
  token: string;
}

interface Response<T> {
  status: boolean;
  reason: string;
  data: T;
}

export function login(loginData: {
  username: string;
  password: string;
}): Promise<Response<LoginResponse>> {
  const LoginURL = `${BASE_PATH}/${USER_BASE_PATH}/login`;
  return axios.post(LoginURL, loginData);
}
