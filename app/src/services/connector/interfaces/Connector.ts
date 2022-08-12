import IResponse from './Response';

export default interface IConnector<
	Instance,
	RequestHeaders,
	Response,
	Interceptor
> {
	baseUrl: string;
	instance: Instance | null;
	interceptor?: Interceptor;
	useRequestInterceptor(
		interceptor: (config: Interceptor) => Interceptor
	): void;
	get<T>(
		url: string,
		headers?: RequestHeaders
	): Promise<IResponse<T, Response>>;
	post<T, Body>(
		url: string,
		body: Body,
		headers?: RequestHeaders
	): Promise<IResponse<T, Response>>;
	put<T, Body>(
		url: string,
		body: Body,
		headers?: RequestHeaders
	): Promise<IResponse<T, Response>>;
	delete<T>(
		url: string,
		headers?: RequestHeaders
	): Promise<IResponse<T, Response>>;
}
