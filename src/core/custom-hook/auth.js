import { isAuthenticated } from "core/firebase/auth/session";
import { useState } from "react";

/**
 * @deprecated
 */
export default function useAuthState() {
    const [authState, setAuthState] = useState(false);
    const checkAuth = async () => {
        const authenticated = await isAuthenticated();
        if (authenticated !== authState)
            setAuthState(authenticated);
    };
    checkAuth();
    return authState;
}