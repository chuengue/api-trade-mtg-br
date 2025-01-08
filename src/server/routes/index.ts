import { Router } from 'express';

import { UsersController } from '../controllers';
import { roleControllers } from '../controllers/roles';
import { fetchCardControllers } from '../controllers/searchCards';
import { apiStart } from '../services/api';
import { checkUserRole, ensureAuthenticated } from '../shared';
import { usersRoleControllers } from './../controllers/usersRole/index';

const router = Router();
//LOGIN
router.post(
    '/api/login',
    UsersController.signInValidation,
    UsersController.signIn
);
router.post(
    '/api/register',
    UsersController.signUpValidation,
    UsersController.signUp
);
router.get(
    '/api/cardSearch',
    fetchCardControllers.fetchCardCollections(apiStart)
);
//WHOAMI

router.get('/api/whoami', ensureAuthenticated, UsersController.whoami);

//ROLES

router.post(
    '/api/role',
    ensureAuthenticated,
    checkUserRole(['super_admin']),
    roleControllers.createValidation,
    roleControllers.create
);
router.delete(
    '/api/role/:id',
    checkUserRole(['super_admin']),
    ensureAuthenticated,
    roleControllers.deleteValidation,
    roleControllers.deleteRole
);

//USERSROLES

router.post(
    '/api/users-role/:userId/:roleId',
    checkUserRole(['super_admin']),
    ensureAuthenticated,
    usersRoleControllers.addUserRolesValidation,
    usersRoleControllers.addUserRoles
);

export { router };
