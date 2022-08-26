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

function handleError(serverError: any) {
  console.log(serverError);
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
  handleError(error?.response?.data);
  return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, undefined);

  axiosInstance.interceptors.response.use(undefined, onResponseError);

  return axiosInstance;
}

export default setupInterceptorsTo(instance);
