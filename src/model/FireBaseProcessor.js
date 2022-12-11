import {get, child, getDatabase, orderByChild, set, ref} from 'firebase/database'
import {firebaseApp} from "../../configs/firebase_config";

class FireBaseProcessor {

    constructor() {
        this.DB = ref(getDatabase(firebaseApp))
    }

    getByProperties = (childName, patch) => {
        try {
            return get(child(this.DB, patch)).then(snapShot => {
                console.log(snapShot.val())
            })
        } catch (e) {
            console.log(e)
        }
    }
    getOneTime = async (patch) => {
        try {
            get(child(this.DB, patch)).then((snapshot) => {
                console.log(snapshot.val())
            })
        } catch (e) {
            console.log(e)
        }

    }
    writeOneTime = async (patch, value) => {
        try {
            await set(ref(getDatabase(), patch), {
                ...value
            })
        } catch (e) {
            console.log(e)
        }
    }
}

const firebaseProcessor = new FireBaseProcessor()
export default firebaseProcessor