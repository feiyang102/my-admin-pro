import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
  AxiosRequestConfig,
  // AxiosInstance,
} from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "./status";

// interface IBaseResponse<T> {
//   code: number | string;
//   message: string;
//   data: T;
// }

export interface IServiceOptions {
  url: string;
  method: Method;
  params?: any;
  data?: any;
  mock?: boolean; // 是否在该请求中使用 Mock Api
}

const instance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL:
    import.meta.env.VITE_APP_DEV_USE_MOCK === "true"
      ? import.meta.env.VITE_APP_MOCK_BASEURL
      : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 15000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data = {} } = response;
    if (status === 200) {
      if (data.code !== 0) {
        ElMessage({
          message: data.message,
          type: "error",
        });
        return Promise.reject(data);
      } else {
        return data;
      }
    }

    ElMessage({
      message: getMessageInfo(response.status),
    });
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      ElMessage({
        message: getMessageInfo(response.status),
        type: "error",
      });
      return Promise.reject(response.data);
    }
    ElMessage({
      message: "网络连接异常，请稍后重试！",
      type: "error",
    });
  },
);

// 对请求进一步处理，T 为返回值 data 的类型
function request<T>(options: IServiceOptions): Promise<AxiosResponse<T, any>> {
  const config = {
    url: options.url,
    method: options.method,
    data: options.data ?? {},
    params: options.params ?? {},
  } as AxiosRequestConfig;

  // 局部 mock 开关的优先级高于全局 mock 开关，只有本地开发可以使用 mock
  if (options.mock && import.meta.env.MODE == "development") {
    config.baseURL = import.meta.env.VITE_APP_MOCK_BASEURL;
  }
  return instance(config);
}

// mock 可以控制当前请求是否使用 mock api
// export function get<T>(url: string, data: any, mock: boolean = false) : Promise<AxiosResponse<T, any>>;
export function get<T>(url: string, data: any, mock: boolean = false) {
  const params = data;
  return request<T>({ method: "get", url, params, mock });
}
export function post<T>(url: string, data: any, mock: boolean = false) {
  return request<T>({ method: "post", url, data, mock });
}
export function put<T>(url: string, data: any, mock: boolean = false) {
  return request<T>({ method: "put", url, data, mock });
}
export function del<T>(url: string, data: any, mock: boolean = false) {
  return request<T>({ method: "delete", url, data, mock });
}

export default request;
