import {makeAutoObservable, values} from "mobx";
import {Alert} from "react-native";
import {child, getDatabase, ref, query, orderByChild, equalTo, get, set} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import 'react-native-get-random-values'
import UserStore from "./UserStore";
import {User} from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStore {
    isLogin = false

    singInInfo = {
        username: '',
        password: ''
    }
    confirmPassword = ''
    singUpInfo = new User()
    autoLoginFetching = false
    fetching = false

    constructor() {
        makeAutoObservable(this)
    }

    setFetching = (value) => {
        this.fetching = value
    }
    setSignUpBirthday = (value) => {
        const date = new Date(value)
        this.singUpInfo.age = new Date().getFullYear() - date.getFullYear()
        this.singUpInfo.birthday = date.toUTCString()
    }
    setSignUpAddress = (value) => {
        this.singUpInfo.address = value
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
    setSignUpUserName = (value) => {
        this.singUpInfo.username = value
    }
    setSignUpEmail = (value) => {
        this.singUpInfo.email = value
    }
    setSignUpPhone = (value) => {
        this.singUpInfo.phone = value
    }
    setConfirmPassword = (value) => {
        this.confirmPassword = value
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

    onValidSignUpInfo = async () => {
        try {
            const db = getDatabase()
            //    valid user name
            if (!this.singUpInfo.username || this.singUpInfo.username.trim().length === 0) {
                Alert.alert("Notification", "Username not empty.")
                return false
            }
            let result_username = await get(query(ref(db, "users"), orderByChild('username'), equalTo(this.singUpInfo.username))).then((sns) => {
                return !sns.exists()
            })
            if (!result_username) {
                Alert.alert("Notification", "Username has taken.")
                return false
            }

            //       valid email format
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.singUpInfo.email))) {
                Alert.alert("notification", "Email format incorrect.")
                return false;
            }

            //    valid email taken
            let result = await get(query(ref(db, "users"), orderByChild('email'), equalTo(this.singUpInfo.email))).then((sns) => {
                return !sns.exists()
            })

            if (!result) {
                Alert.alert("Notification", "Email has taken.")
                return false
            }

            if (!this.singUpInfo.phone || this.singUpInfo.phone.trim().length < 10) {
                Alert.alert("Notification", "Phone number can not less than 10 number.")
                return false
            }

            //valid phone has taken
            let result_phone = await get(query(ref(db, "users"), orderByChild('phone'), equalTo(this.singUpInfo.phone))).then((sns) => {
                return !sns.exists()
            })

            if (!result_phone) {
                Alert.alert("Notification", "Phone has taken.")
                return false
            }

            if (!this.singUpInfo.password || this.singUpInfo.password.trim().length < 8) {
                Alert.alert("Notification", "Password can not less than 8 characters.")
                return false
            }
            if (!this.singUpInfo.address || this.singUpInfo.address.trim().length < 8) {
                Alert.alert("Notification", "Address can not be empty.")
                return false
            }
            if (this.confirmPassword !== this.singUpInfo.password) {
                Alert.alert("Notification", "Confirm password not match.")
                return false
            }
            if (!this.singUpInfo.age && !this.singUpInfo.birthday) {
                Alert.alert("Notification", "If you do not set your birthday , it will set as default.")
            }
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
    signUp = async (nav) => {
        try {
            this.setFetching(true)
            if (await this.onValidSignUpInfo()) {
                if (!this.singUpInfo.age && !this.singUpInfo.birthday) {
                    this.setSignUpBirthday(new Date(new Date().getFullYear() - 10, 1, 0).getTime())
                }
                const dbRef = ref(getDatabase(), 'users/' + this.singUpInfo.id)
                const id = this.singUpInfo.id
                delete this.singUpInfo.id
                await set(dbRef, {
                    ...this.singUpInfo
                })
                await AsyncStorage.setItem('@authorize_user_id', id)
            }
            this.setFetching(false)
            nav.navigate("sign_in")
        } catch (e) {
            console.log(e)
            Alert.alert('Something wrong,try later.')
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

    setSignUpPassword = (text) => {
        this.singUpInfo.password = text
    }
}

const authStore = new AuthStore();
export default authStore