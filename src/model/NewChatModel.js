import {makeAutoObservable} from "mobx";
import UserSearchStore from "./UserSearchStore";

class NewChatModel {
    userSelected = []

    constructor() {
        makeAutoObservable(this)
    }

    setUserSelected = (value) => {
        this.userSelected = value
    }

    selectUser(user) {
        if (user) {
            const tem = [...this.userSelected]
            let exit = false
            for (let us of tem) {
                if (us.id === user.id) {
                    exit = true
                }
            }
            if (!exit) {
                tem.push(user)
                this.setUserSelected(tem)
            }
        }
    }

    onCheckUserExit = (users, user) => {
        let removeIndex = -1
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                removeIndex = i
            }
        }
        return removeIndex
    }

    unSelectUser(user_) {
        if (user_) {
            let tem = [...this.userSelected]
            let removeIndex = tem.map((user, index) => user?.id).findIndex((userId) => userId === user_.id)
            if (removeIndex !== -1) {
                tem.splice(removeIndex, 1)
            }
            this.setUserSelected(tem)
        }
    }
}

const newChatModel = new NewChatModel()
export default newChatModel