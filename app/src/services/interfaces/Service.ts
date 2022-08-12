import IConnector from '../connector/interfaces/Connector';

export default interface IService<
	Instance,
	RequestHeaders,
	Response,
	Interceptor
> {
	connector: IConnector<Instance, RequestHeaders, Response, Interceptor>;
}
