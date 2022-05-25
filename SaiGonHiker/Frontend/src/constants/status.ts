import IError from "src/interfaces/IError";

export const Status = {
    Success: 1,
    Failed: 2,
    DeleteFailed: 3,
    Unauthentication: 4,
}

export type SetStatusType = {
    status?: number;
    error?: IError;
};