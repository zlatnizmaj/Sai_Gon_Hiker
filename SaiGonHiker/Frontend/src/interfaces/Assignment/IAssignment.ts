export default interface IAssignemnt {
    id: number;
    assetCode: string;
    assetName: string;
    assignedToStaffCode: string;
    assignedToFullName: string;
    assignedToUserName: string;
    assignedByUserName: string;
    assignedDate: Date;
    stateId: number;
    stateName: string;
    note : string;
}
