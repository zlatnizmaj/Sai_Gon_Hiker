import IBaseQueryModel from "../IBaseQueryModel";

export default interface IQueryAssetModel extends IBaseQueryModel {
    States: number[];
    Categories: number[];
    Location?: string
}