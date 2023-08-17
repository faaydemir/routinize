import action from "core/action-builder/app-action-builder";
import { deleteAccount, signIn, signOut, signUp } from "core/firebase/auth/authentication";
import { loggedOut, authFailed, loginSucceed, accountDeleted } from "state/auth";

const mapErrorMessage = (error) => {
    const errorMessageMapping = {
        'auth/missing-email': 'Missing email',
        'auth/user-not-found': 'User not found',
        'auth/email-already-in-use': 'Email already in use',
        'auth/invalid-email': 'Invalid email',
        'auth/wrong-password': 'Wrong password',
        'auth/weak-password': 'Weak password'
    }

    return errorMessageMapping[error] ?? error;
}

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
            authFailed([mapErrorMessage(error.message)]);
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
            authFailed([mapErrorMessage(error.message)]);
        }
    }
);



export {
    deleteUser,
    login,
    logout,
    register,
};