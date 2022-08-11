import BaseModel from '../../../mvvm/models/Generic/Model/BaseModel';

export interface Type {
	[key: string]: any;
}

export default interface ISerializerParseStrategy<
	Output extends BaseModel,
	Draft
> {
	parse(entries: Type[]): Output[];
	parseDraft(props: Draft): Draft;
}
