import { IUser } from '../../database/models';

export interface ISignUpUserBodyProps
    extends Omit<IUser, 'id' | 'updatedAt' | 'createdAt'> {}

export interface ISignInUserBodyProps {
    identifier: string;
    username?: string;
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string | null;
    password: string;
}

export interface ISignInUserBodyPropsValidation {
    identifier: string;
    password: string;
}
