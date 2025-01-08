export interface IreqHeader extends Headers {
    userId?: string;
    roles?: string[];
}

export interface IUserResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    password: string;
    phoneNumber?: string | null;
    createdAt?: string;
    updatedAt?: string;
}
