import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
} from 'axios';
import IConnector from '../interfaces/Connector';
import Response from '../interfaces/Response';

export default class ConnectorAxios
	implements
		IConnector<
			AxiosInstance,
			AxiosRequestHeaders,
			AxiosResponse,
			AxiosRequestConfig<any>
		>
{
	instance: AxiosInstance | null = null;

	constructor(
		public baseUrl: string,
		public interceptor?: AxiosRequestConfig<any>
	) {
		if (!this.interceptor) {
			this.instance = axios.create({
				baseURL: this.baseUrl,
			});
		} else if (this.interceptor) {
			this.useRequestInterceptor(() => {
				if (this.interceptor) return this.interceptor;
				throw new Error('Interceptor not undefined');
			});
		}
	}

	useRequestInterceptor(
		interceptor: (config: AxiosRequestConfig<any>) => AxiosRequestConfig<any>
	): void {
		this.instance?.interceptors.request.use(interceptor);
	}

	private error() {
		return new Error('BaseURL not inform');
	}

	get<T>(
		url: string,
		headers?: AxiosRequestHeaders | undefined
	): Promise<Response<T, AxiosResponse<any, any>>> {
		if (this.instance)
			return this.instance?.get(url, {
				headers,
			});
		throw this.error();
	}

	post<T, Body>(
		url: string,
		body: Body,
		headers?: AxiosRequestHeaders | undefined
	): Promise<Response<T, AxiosResponse<any, any>>> {
		console.log(this);
		if (this.instance)
			return this.instance?.post(url, body, {
				headers,
			});
		throw this.error();
	}

	put<T, Body>(
		url: string,
		body: Body,
		headers?: AxiosRequestHeaders | undefined
	): Promise<Response<T, AxiosResponse<any, any>>> {
		if (this.instance)
			return this.instance?.post(url, body, {
				headers,
			});
		throw this.error();
	}

	delete<T>(
		url: string,
		headers?: AxiosRequestHeaders | undefined
	): Promise<Response<T, AxiosResponse<any, any>>> {
		if (this.instance)
			return this.instance?.delete(url, {
				headers,
			});
		throw this.error();
	}
}
