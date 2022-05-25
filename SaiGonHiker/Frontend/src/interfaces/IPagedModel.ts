import IBaseQueryModel from "./IBaseQueryModel";

export default interface IPagedModel<T> {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    items: [T];
}