export default interface IMyAssignemnt {
    id: number;
    staffCode: string;
    assetCode: string;
    assetName: string;
    categoryId: number;
    categoryName: string;
    specification: string;
    assignedToUserName: string;
    assignedByUserName: string;
    assignedDate: Date;
    stateId: number;
    stateName: string;
    note: string;
}
