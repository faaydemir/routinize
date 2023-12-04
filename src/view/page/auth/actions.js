import action from "core/action-builder/app-action-builder";
import { deleteAccount, signIn, signOut, signUp } from "core/firebase/auth/authentication";
import { loggedOut, authFailed, loginSucceed, accountDeleted } from "state/auth";

const logout = action().lock().do(
    async () => {
        await signOut();
        loggedOut();
    }
);


const deleteUser = action().lock().do(

    /*
    delete user data
    delete user
    signout
    */
    async () => {
        if (confirm("User and all user data will be deleted")) {

            await deleteAccount();
            accountDeleted();
        }
    }
);

const login = action().lock().do(
    async ({ email, password, pushHistory }) => {
        try {
            await signIn(email, password);
            loginSucceed(email);
            pushHistory("/");
        } catch (error) {
            authFailed([error.message]);
        }
    }
);

const register = action().lock().do(
    async ({ email, password, passwordAgain, pushHistory }) => {
        try {
            await signUp(email, password, passwordAgain);
            loginSucceed(email);
            pushHistory("/");
        } catch (error) {
            authFailed([error.message]);
        }
    }
);



export {
    deleteUser,
    login,
    logout,
    register,
};