import statefy from "core/statefy";

const authState = statefy({
    isAuthenticated: false,
    user: undefined,
    errors: undefined,
});


export const loginSucceed = (user) => {
    authState.mutate({
        isAuthenticated: true,
        user: user,
        errors: undefined,
    });
}

export const authFailed = (error) => {
    authState.mutate({
        isAuthenticated: false,
        user: undefined,
        errors: error,
    });
}

export const loggedOut = () => {
    authState.mutate({
        isAuthenticated: false,
        user: undefined,
        errors: undefined,
    });
}

export const accountDeleted = () => {
    authState.mutate({
        isAuthenticated: false,
        user: undefined,
        errors: undefined,
    });
}

export default authState;
