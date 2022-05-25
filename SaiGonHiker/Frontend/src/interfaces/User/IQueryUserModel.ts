import IBaseQueryModel from "../IBaseQueryModel";

export default interface IQueryUserModel extends IBaseQueryModel {
    Types: string[];
    Location?: string
}