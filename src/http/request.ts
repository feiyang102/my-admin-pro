import axios, {
	type AxiosError,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
	type AxiosRequestConfig
} from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

interface BaseResponse<T = any> {
	code: number | string;
	message: string;
	data: T;
}

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 15000
});

// 请求拦截器
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	async (error: AxiosError) => {
		return await Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			return response.data;
		}
		ElMessage({
			message: getMessageInfo(response.status)
		});
		return response.data;
	},
	async (error: any) => {
		const { response } = error;
		if (response) {
			ElMessage({
				message: getMessageInfo(response.status),
				type: 'error'
			});
			return await Promise.reject(response.data);
		}
		ElMessage({
			message: '网络连接异常，请稍后重试！',
			type: 'error'
		});
	}
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return await new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
			const data = res.data;
			// 如果data.code为错误代码返回message信息
			if (data.code != 0) {
				ElMessage({
					message: data.message,
					type: 'error'
				});
				reject(data.message);
			} else {
				ElMessage({
					message: data.message,
					type: 'success'
				});
				// 此处返回data信息 也就是 api 中配置好的 Response类型
				resolve(data.data as T);
			}
		});
	});
};

// 在最后使用封装过的axios导出不同的请求方式
export async function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
	return await requestInstance({ ...config, url, method: 'GET', params: parms });
}

export async function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return await requestInstance({ ...config, url, method: 'POST', data });
}

export async function put<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return await requestInstance({ ...config, url, method: 'PUT', data });
}

export async function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return await requestInstance({ ...config, url, method: 'DELETE', data });
}

export default service;
