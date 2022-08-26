import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { ApiResponse } from "../common.models";
import { LoginResponse, UserLogin } from "./models/UserLogin";

const USER_BASE_PATH = "users";

export function login(
  loginData: UserLogin
): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
  const LoginURL = `${USER_BASE_PATH}/login`;
  console.log("Login URL: ", LoginURL);

  return AxiosClient.post(LoginURL, loginData);
}
