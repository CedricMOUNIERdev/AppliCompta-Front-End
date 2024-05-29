



export interface IPagedResponse<T> {
    pageNumber : number;
    totalRecord: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: T[]
}


