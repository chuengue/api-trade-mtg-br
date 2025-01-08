import * as create from './Create';
import * as getUser from './GetUser';

export const UsersProviders = {
    ...create,
    ...getUser
};
