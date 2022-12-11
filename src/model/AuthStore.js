import {makeAutoObservable} from "mobx";
import {Alert} from "react-native";
import {child, getDatabase, ref, query, orderByChild, equalTo, get} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import 'react-native-get-random-values'
import UserStore from "./UserStore";
import {User} from "../../types";

class AuthStore {
    isLogin = false

    singInInfo = {
        username: '',
        password: ''
    }
    autoLoginFetching = false
    fetching = false

    constructor() {
        makeAutoObservable(this)
    }

    setFetching = (value) => {
        this.fetching = value
    }
    setSignInUsername = (value) => {
        this.singInInfo.username = value
    }
    setSignInPassword = (value) => {
        this.singInInfo.password = value
    }
    setLogin = (value) => {
        this.isLogin = value
    }
    signIn = () => {
        try {
            if (this.singInInfo.username.length > 0 && this.singInInfo.password.length > 0) {
                this.setFetching(true)
                setTimeout(async () => {
                    const dbRef = ref(getDatabase(firebaseApp), 'users')
                    get(query(dbRef, orderByChild('email'), equalTo(this.singInInfo.username))).then((sns) => {
                        if (sns.exists()) {
                            const id = Object.keys(sns.val())[0]
                            const {name, email, age, address, password, phone} = sns.val()[id]
                            const user = new User(id, name, email, password, age, phone, address, null)
                            if (user.password.toString() === this.singInInfo.password) {
                                UserStore.setUser(user)
                                return;
                            }
                        }
                        Alert.alert('Notification', 'Email or password incorrect.')
                    })
                    this.setFetching(false)
                }, 500)
            } else {
                Alert.alert("Warning", "Authenticate info not valid.")
            }
        } catch (e) {
            console.log(e)
        }

    }

    setAutoLoginFetching = (value) => {
        this.autoLoginFetching = value
    }

    async autoSignIn(id) {
        try {
            this.setAutoLoginFetching(true)
            setTimeout(() => {
                const dbRef = ref(getDatabase(firebaseApp))
                get(child(dbRef, `users/${id}`)).then(sns => {
                    if (sns.exists()) {
                        const {name, email, age, address, password, phone} = sns.val()
                        const user = new User(id, name, email, password, age, phone, address, null)
                        UserStore.setUser(user)
                    } else {
                        Alert.alert('Wrong', 'Something wrong when processing auto login, try with manual login.')
                    }
                })
                this.setAutoLoginFetching(false)
            }, 500)
        } catch (e) {
            console.log(e)
        }
    }
}

const authStore = new AuthStore();
export default authStore