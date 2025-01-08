import * as removeUserRoles from './AddRole';
import * as addUserRoles from './RemoveRole';

export const UsersRolesProviders = {
    ...addUserRoles,
    ...removeUserRoles
};
