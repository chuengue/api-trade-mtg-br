import * as create from './Create';
import * as deleteRole from './Delete';

export const roleControllers = {
    ...create,
    ...deleteRole
};
