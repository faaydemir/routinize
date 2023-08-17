import delay from "core/delay";
import OneTimeEvent from "core/event";
import { getAuth } from "firebase/auth";


let currentUser = undefined;
let token = undefined;
let isAuthStateKnown = false;

const auth = getAuth();

if (auth.currentUser) {
    currentUser = auth.currentUser;
    isAuthStateKnown = true;
};

let authStateChangedEvent = new OneTimeEvent('AuthStateChangedEvent');

auth.onAuthStateChanged((user) => {
    isAuthStateKnown = true;
    token = undefined;
    currentUser = user;
    authStateChangedEvent.dispatch();
});

async function waitWhileChecking(waitTimeOut = 2000) {
    let id = undefined;
    await Promise.race([
        new Promise(function (resolve, reject) {
            if (isAuthStateKnown) resolve(undefined);
            id = authStateChangedEvent.register(() => resolve(undefined));
        }),
        delay(waitTimeOut)
    ]);

    if (id !== undefined) {
        authStateChangedEvent.unregister(id);
    }
}

async function getUser() {

    if (!isAuthStateKnown) {
        await waitWhileChecking();
    }
    return currentUser;
}

async function getToken() {
    if (token) return token;
    const user = await getUser();
    if (user) {
        token = await user.getIdToken(true);
        return token;
    }
}

async function isAuthenticated() {
    return Boolean(await getToken());
}

export {
    isAuthenticated,
    getToken,
    getUser,
};