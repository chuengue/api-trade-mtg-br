export enum SQLErrors {
    DUPLICATE_REGISTER = 'ER_DUP_ENTRY',
    ERROR_DB_CONNECT = 'ECONNREFUSED',
    GENERIC_DB_ERROR = 'GENERIC_DB_ERROR',
    NOT_FOUND_REGISTER = 'NOT_FOUND_REGISTER'
}

export enum ProvidersErrors {
    ALREADY_EXISTS_WISHLIST = 'ALREADY_EXISTS_WISHLIST',
    NOT_EXIST_ITEM_WISHLIST = ' NOT_EXIST_ITEM_WISHLIST',
    FAILED_FETCH_INSERTED_COLLECTION = 'FAILED_FETCH_INSERTED_COLLECTION',
    ALREADY_EXISTS_IN_COLLECTION = 'ALREADY_EXISTS_IN_COLLECTION',
    COLLECTION_UNAUTHORIZED = 'COLLECTION_UNAUTHORIZED',
    FAILED_UPDATE = 'FAILED_UPDATE'
}
export enum ProvidersSuccessMessage {
    SUCCESS_UPDATE = 'SUCCESS_UPDATE',
    SUCCESS_REMOVE_ITEM = 'SUCCESS_REMOVE_ITEM',
    SUCCESS_INSERT = 'SUCCESS_INSERT'
}
