import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as whoami from './WhoAmi';

export const UsersController = {
    ...signIn,
    ...signUp,
    ...whoami
};
