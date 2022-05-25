import IBaseQueryModel from "../IBaseQueryModel";

export default interface IQueryAssignmentModel extends IBaseQueryModel {
    States: number[];
    AssignedDate?: string;
    AssignTo?: string;
}