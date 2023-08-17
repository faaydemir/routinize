import { getAuth } from 'firebase/auth';
import 'firebase/database'
import { getFirestore } from 'firebase/firestore';
import { getUser } from "core/firebase/auth/session";

class BaseStore {
    constructor() {
        this.db = getFirestore();
        this.user = getAuth().currentUser;
    }
    async getUserId() {
        const user = await getUser();
        const userId = user.uid;
        return userId;
    }
}

export default BaseStore