import { IBaseModelProps } from '.';

export default abstract class BaseModel implements IBaseModelProps {
	id: number | null = null;
}
