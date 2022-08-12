import {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosRequestHeaders,
	AxiosResponse,
} from 'axios';
import ConnectorAxios from '../connector/implementations/ConnectorAxios';
import Connector from '../connector/interfaces/Connector';
import IService from '../interfaces/Service';

export default abstract class BaseServiceAxios<T>
	implements
		IService<
			AxiosInstance,
			AxiosRequestHeaders,
			AxiosResponse<T, any>,
			AxiosRequestConfig<any>
		>
{
	connector: Connector<
		AxiosInstance,
		AxiosRequestHeaders,
		AxiosResponse<T, any>,
		AxiosRequestConfig<any>
	>;

	constructor(public endpoint: string) {
		console.log(endpoint);
		this.connector = new ConnectorAxios('http://localhost:8080/api/v1');
	}
}
