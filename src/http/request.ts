import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
  // AxiosRequestConfig,
  // AxiosInstance,
} from "axios";
import { ElMessage } from "element-plus";
import { getMessageInfo } from "./status";

// interface IBaseResponse<T> {
//   code: number | string;
//   message: string;
//   data: T;
// }

interface IServiceOptions {
  url: string;
  method: Method;
  params?: any;
  data?: any;
  mock?: boolean; // 是否在该请求中使用 Mock Api？
}

const instance = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  baseURL: import.meta.env.VITE_APP_DEV_USE_MOCK
    ? import.meta.env.VITE_APP_MOCK_BASEURL
    : import.meta.env.VITE_APP_API_BASEURL,
  timeout: 15000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO mock 判断，baseUrl 处理
    console.log("TODO Mock支持全局和局部控制: ", import.meta.env);
    // import.meta.env
    // const { mock } = config;
    // if(mock && import.meta.env)
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

// 对请求进一步处理
export function service<T>(
  options: IServiceOptions,
): Promise<AxiosResponse<T, any>> {
  return instance(options);
}

export function get<T>(url: string, data: any) {
  const params = data;
  return service<T>({ method: "get", url, params });
}
export function post<T>(url: string, data: any) {
  return service<T>({ method: "post", url, data });
}
export function put<T>(url: string, data: any) {
  return service<T>({ method: "put", url, data });
}
export function del<T>(url: string, data: any) {
  return service<T>({ method: "delete", url, data });
}

// // 此处相当于二次响应拦截
// // 为响应数据进行定制化处理
// const requestInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
//   const conf = config;
//   return new Promise((resolve, reject) => {
//     service
//       .request<T, AxiosResponse<IBaseResponse<T>>>(conf)
//       .then((res: AxiosResponse<IBaseResponse<T>>) => {
//         const data = res.data;
//         // 如果data.code为错误代码返回message信息
//         if (data.code != 0) {
//           ElMessage({
//             message: data.message,
//             type: "error",
//           });
//           reject(data.message);
//         } else {
//           ElMessage({
//             message: data.message,
//             type: "success",
//           });
//           // 此处返回data信息 也就是 api 中配置好的 Response类型
//           resolve(data.data as T);
//         }
//       });
//   });
// };

// // 在最后使用封装过的axios导出不同的请求方式
// export function get<T, U>(
//   config: AxiosRequestConfig,
//   url: string,
//   parms?: U,
// ): Promise<T> {
//   return requestInstance({ ...config, url, method: "GET", params: parms });
// }

// export function post<T, U>(
//   config: AxiosRequestConfig,
//   url: string,
//   data: U,
// ): Promise<T> {
//   return requestInstance({ ...config, url, method: "POST", data: data });
// }

// export function put<T, U>(
//   config: AxiosRequestConfig,
//   url: string,
//   data: U,
// ): Promise<T> {
//   return requestInstance({ ...config, url, method: "PUT", data: data });
// }

// export function del<T, U>(
//   config: AxiosRequestConfig,
//   url: string,
//   data: U,
// ): Promise<T> {
//   return requestInstance({ ...config, url, method: "DELETE", data: data });
// }

export { service as default, IServiceOptions };
