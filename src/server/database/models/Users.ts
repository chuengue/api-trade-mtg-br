export interface IUser {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string | null;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}
