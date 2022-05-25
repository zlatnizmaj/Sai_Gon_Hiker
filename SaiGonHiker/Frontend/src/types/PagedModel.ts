export type PagedModel<T, TQuery> = TQuery & {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    items: [T];
}