export interface ContentError {
    code: number;
    message: string;
}
export interface ErrorMessage {
    [key: string]: ContentError[];
}

export interface PathHandleResult {
    archiveName: string;
    errorList: string;
}
export interface ListResult {
    totalItems: number;
    itemsPerPage: number;
    page: number;
    results: unknown[];
}
export interface SuccessListResponse {
    totalItems?: number;
    itemsPerPage?: number;
    totalPages?: number;
    page?: number;
    results: unknown;
    success: boolean;
}
