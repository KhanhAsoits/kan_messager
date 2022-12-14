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

    onSearchInLocal = () => {
        const listFound = []
        for (let user of this.listUserFound) {
            if (user.username.includes(this.query.toLowerCase())) {
                listFound.push(user)
            }
        }
        if (listFound.length > 0) {
            this.setListLocalUser(listFound)
            return true;
        }
        return false
    }

    setListUserFound = (value) => {
        this.listUserFound = value
    }

    onFetchSync = async () => {
        setTimeout(() => {
            //connect db
            const db = getDatabase(firebaseApp)
            get(query(ref(db, 'users'), orderByChild('username'), startAt(this.query.toLowerCase()), endAt(this.query.toLowerCase() + "\uf8ff"))).then((sns) => {
                if (sns.exists()) {
                    this.setListUserFound(Object.values(sns.val()))
                    this.onSearchInLocal()
                } else {
                    console.log('no result')
                    this.setListLocalUser([])
                }
            })
            this.setFetching(false)
        }, 200)
    }

    onGetUserByName = async () => {
        try {
            if (this.query.length === 0) {
                this.setListLocalUser([])
                return;
            }
            if (!this.onFetching) {
                this.setFetching(true)
                let searchInLocal = false
                if (this.listUserFound.length > 0) {
                    searchInLocal = this.onSearchInLocal()
                }
                if (!searchInLocal) {
                    await this.onFetchSync()
                } else {
                    this.setFetching(false)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
}

const userSearchStore = new UserSearchStore()
export default userSearchStore