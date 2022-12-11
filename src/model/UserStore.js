import {makeAutoObservable} from "mobx";
import {User} from "../../types";

class UserStore {

    user = new User()

    constructor() {
        makeAutoObservable(this)
    }

    setUser = (value) => {
        if (!value instanceof  User){
            console.log('Value must User class type.')
            return;
        }
        this.user = value
    }
}

const userStore = new UserStore();
export default userStore