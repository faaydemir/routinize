import { getAnalytics, logEvent } from "firebase/analytics";

export function logError(error) {
    new Promise(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'error_occured', error);
    }).catch(e => console.error(e));
}