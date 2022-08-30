import axios from "axios";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { isObject, isEmpty } from "lodash";

const BASE_PATH = process.env.REACT_APP_API_BASE_PATH;

const instance = axios.create({
  baseURL: BASE_PATH,
  headers: {
    "Content-type": "application/json",
  },
});

const API_DEFAULT_MESSAGE_REQUEST = "The request is invalid";

function handleError(responseError: any) {
  const serverError = responseError.data;

  if (responseError.status === 401) {
    window.location.href = "/login";
  }
  if (!!serverError.reason) {
    toast.error(`${serverError.reason}`);
    return;
  }

  if (isObject(serverError)) {
    Object.entries(serverError).forEach(([, value]) => {
      const errorMessage = isEmpty(value) ? API_DEFAULT_MESSAGE_REQUEST : value;
      toast.error(`${errorMessage}`);
    });
  }
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  handleError(error?.response);
  return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  const token = localStorage.getItem("token") || "";

  axiosInstance.interceptors.request.use(onRequest, undefined);

  axiosInstance.interceptors.response.use(undefined, onResponseError);

  axiosInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return axiosInstance;
}

export default setupInterceptorsTo(instance);
