export interface IJwtData {
    uid: string;
    roles: string[];
}

export enum EJWTErrors {
    SECRET_NOT_FOUND = 'JWT_SECRET_KEY_NOT_FOUND',
    INVALID_TOKEN = 'INVALID_TOKEN'
}
