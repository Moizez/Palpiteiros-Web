import BaseModel from '../../mvvm/models/Generic/Model/BaseModel';
import ISerializerParseStrategy from '../../serializer/parse/interfaces/SerializerParseStrategy';

export interface IAction<P, Output extends BaseModel, Draft> {
	type?: string;
	payload?: P;
	key?: string;
	instance: ISerializerParseStrategy<Output, Draft>;
}
