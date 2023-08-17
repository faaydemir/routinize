import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";

class AuthFailed extends Error {

    constructor(error) {
        super(AuthFailed.mapErrorMessage(error))
        Error.captureStackTrace(this, Error)
    }

    static mapErrorMessage(error) {
        const errorMessageMapping = {
            'auth/user-not-found': 'User not found',
            'auth/email-already-in-use': 'Email already in use',
            'auth/invalid-email': 'Invalid email',
            'auth/wrong-password': 'Wrong password',
            'auth/weak-password': 'Weak password'
        }

        return errorMessageMapping[error] ?? error;
    }
}

async function signIn(email, password) {
    try {
        await setPersistence(getAuth(), browserSessionPersistence);
        return await signInWithEmailAndPassword(getAuth(), email, password)
    } catch (error) {
        throw new AuthFailed(error.code);
    }
}

async function signOut() {
    try {
        await getAuth().signOut()
    } catch (error) {
        throw new AuthFailed(error.code);
    }
}

async function signUp(email, password, passwordAgain) {

    if (password !== passwordAgain) {
        throw new AuthFailed("Passwords are not matched");
    }
    try {
        return await createUserWithEmailAndPassword(getAuth(), email, password)
    } catch (error) {
        throw new AuthFailed(error.code);
    }
}

async function deleteAccount() {
    try {
        await getAuth().currentUser.delete()
    } catch (error) {
        throw new AuthFailed(error.code);
    }
}
export {
    signIn,
    signOut,
    signUp,
    deleteAccount,
};