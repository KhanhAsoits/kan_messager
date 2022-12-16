import {makeAutoObservable} from "mobx";
import {equalTo, get, getDatabase, startAt, endAt, orderByChild, query, ref} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import NewChatModel from "./NewChatModel";

class UserSearchStore {

    //list user found.

    listUserFound = []
    listLocalUser = []

    onFetching = false

    query = ""

    constructor() {
        makeAutoObservable(this)
    }

    setQuery = (value) => {
        this.query = value
    }
    setFetching = (value) => {
        this.onFetching = value
    }


    setListLocalUser = (value) => {
        this.listLocalUser = value
    }

    setListUserFound = (value) => {
        this.listUserFound = value
    }

    onFetchSync = async () => {
        const db = getDatabase(firebaseApp)
        get(query(ref(db, 'users'), orderByChild('username'), startAt(this.query.toLowerCase()), endAt(this.query.toLowerCase() + "\uf8ff"))).then((sns) => {
            if (sns.exists()) {
                //add id
                const listUser = []
                const listKey = Object.keys(sns.val())
                const listValue = Object.values(sns.val())
                for (let i = 0; i < listKey.length; i++) {
                    const user = {id: listKey[i], ...listValue[i]}
                    listUser.push(user)
                }
                this.setListUserFound(listUser)
            } else {
                console.log('no result')
                this.setListUserFound([])
            }
        })

        setTimeout(() => {
            this.setFetching(false)
        }, 300)
    }

    onGetUserByName = async () => {
        try {
            if (this.query.length === 0) {
                this.setListUserFound([])
                return;
            }
            if (!this.onFetching) {
                this.setFetching(true)
                await this.onFetchSync()
            }
        } catch (e) {
            console.log(e)
        }
    }
}

const userSearchStore = new UserSearchStore()
export default userSearchStore