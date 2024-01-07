import { post } from '@/http/request';

export interface LoginRequest {
	username: string;
	password: string;
}

// 刷新登录信息需要的参数
export interface reLoginRequest {
	accessToken: string;
}

export interface LoginResponse {
	username: string;
	roles: string[];
	accessToken: string;
}

// 定义的接口
export const userLogin = async (data?: LoginRequest): Promise<LoginResponse> => {
	return await post<LoginResponse>({}, '/login', data);
};

export const refreshUserInfo = async (data?: reLoginRequest): Promise<LoginResponse> => {
	return await post<LoginResponse>({}, '/getUserInfo', data);
};
