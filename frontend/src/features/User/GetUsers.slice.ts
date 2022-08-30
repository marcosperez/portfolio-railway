import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import AxiosClient from "../AxiosClient";
import type { AxiosRequestConfig, AxiosError } from "axios";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await AxiosClient({ url: url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

const getUsersApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: "users",
  endpoints: (builder) => ({
    getUsers: builder.query<void, void>({
      query: () => ({ url: "/users", method: "get" }),
    }),
  }),
});

export default getUsersApi;

export const { useGetUsersQuery } = getUsersApi;
