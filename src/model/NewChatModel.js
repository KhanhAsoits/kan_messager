import {makeAutoObservable} from "mobx";
import {Alert} from "react-native";
import {getDatabase, set, ref, get, child} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import {ChatList, Room} from "../../types";
import {getChatName, getRoomName} from "../util/helper";
import UserStore from "./UserStore";
import ChatListModel from "./ChatListModel";

class NewChatModel {
    userSelected = []
    fetching = false

    constructor() {
        makeAutoObservable(this)
    }

    setFetching = (value) => {
        this.fetching = value
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

    handleCreateNewChat = async () => {
        try {
            if (this.userSelected.length <= 0) {
                Alert.alert('Warning', "No user selected.")
            } else {
                this.setFetching(true)
                const db = getDatabase(firebaseApp)
                //    create new room
                let roomNameArr = this.userSelected.map((val, index) => val.username)
                let chatKeyArr = this.userSelected.map((val, index) => {
                    return val.id
                })
                chatKeyArr.push(UserStore.user.id)
                roomNameArr.push(UserStore.user.username)
                //check chat has exit
                try {
                    let chats = (await get(child(ref(db), "chats/" + UserStore.user.id))).val()
                    if (chats) {
                        for (let chat of chats) {
                            if (chat?.key === getRoomName(chatKeyArr, ",")) {
                                Alert.alert("Warning", "Chat has exit ,please use search tool.")
                                this.setFetching(false)
                                return
                            }
                        }
                    }
                } catch (e) {
                    console.log('empty')
                }

                let roomName = getRoomName(roomNameArr)
                let getType = this.userSelected.length === 1 ? "personal" : "groups"
                const room = new Room(roomName, "", "", this.userSelected.length + 1, new Date().getTime(), 1, getType, null, chatKeyArr)
                await set(ref(db, "rooms/" + room.id), {...room})

                let myChatList = []
                if (ChatListModel.allChat.length > 0) {
                    myChatList = [...ChatListModel.allChat]
                }
                const chatName = getChatName(UserStore.user.username,roomNameArr,",")
                const newChat = new ChatList(room.id, chatName, UserStore.user.id, 1, new Date().getTime(), "You has been created a new chat.", 1, new Date().getTime(), getType, getRoomName(chatKeyArr, ","));
                myChatList.push(newChat)
                await set(ref(db, "chats/" + UserStore.user.id), myChatList)
                // // success
                ChatListModel.setAllChat(myChatList)
                ChatListModel.onClassifyData(myChatList)
                // //    set current user
                // //    getAllUser Chat List
                for (let user of this.userSelected) {
                    get(child(ref(db), "chats/" + user.id)).then(async (sns) => {
                        const chats = sns.val();
                        let myChatList = []
                        if (chats?.length > 0) {
                            myChatList = [...chats]
                        }
                        const chatName = getChatName(user.username,roomNameArr,",")

                        const newChat = new ChatList(room.id, chatName, user.id, 1, new Date().getTime(), `${UserStore.user.username || 'stranger'} has been created a new chat.`, 1, new Date().getTime(), getType, getRoomName(chatKeyArr, ","));
                        myChatList.push(newChat)
                        await set(ref(db, "chats/" + user.id), myChatList)
                    })
                }
                setTimeout(async () => {
                    this.setFetching(false)
                }, 300)
                return true
                //    handle create
                //    create db context
            }
        } catch (e) {
            this.setFetching(false)
            Alert.alert('something err.')
            console.log(e)
            return false
        }
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