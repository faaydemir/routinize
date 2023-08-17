import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics'
import * as firebase from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";
import firebaseConfig from 'core/firebase/firebase-config';


const initFirebase = (firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);
    const analytics = getAnalytics();
    logEvent(analytics, 'init', { date: new Date() });
    return firebase;
}

export default initFirebase(firebaseConfig);