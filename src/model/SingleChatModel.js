import {makeAutoObservable, runInAction, values} from "mobx";
import {child, get, getDatabase, onValue, ref, set, update} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import {Message, Room} from "../../types";
import UserStore from "./UserStore";
import {getChildOfObject} from "../util/helper";

class SingleChatModel {
    messages = []
    messageList = []
    chatFetching = false
    roomFetching = false
    room = new Room();
    fetching = true

    constructor() {
        makeAutoObservable(this)
    }

    onFetchingRoom = (roomId) => {
        try {
            this.setRoomFetching(true)
            const db = getDatabase(firebaseApp)
            get(child(ref(db), "rooms/" + roomId)).then((sns) => {
                if (sns.exists()) {
                    this.setRoom(sns.val())
                }
            })
            this.setRoomFetching(false)
        } catch (e) {
            console.log(e)
        }
    }
    onSendLocalMessage = (message, roomId) => {
        const messages = [...this.messages]
        messages.push(message)
        this.setMessages(messages)
        this.onSyncMessageList()
    }
    onSendMessage = (messageBody, roomId) => {
        try {
            //    get if has exit
            const db = getDatabase(firebaseApp)
            const message = new Message(UserStore.user.id, roomId, messageBody, new Date().getTime(), UserStore.user.username)
            this.onSendLocalMessage(message, roomId)
            setTimeout(() => {
                get(child(ref(db), "messages/" + roomId,)).then(async (sns) => {
                    let messages = []
                    if (sns.exists()) {
                        messages = [...sns.val()]
                    }
                    messages.push(message)
                    await set(ref(db, "messages/" + roomId), [...messages])
                    //    after add message , update chat list
                })
                for (let memberInRoom of this.room.members) {
                    get(child(ref(db), "chats/" + memberInRoom)).then(async (sns) => {
                        if (sns.exists()) {
                            let chats = sns.val()
                            for (let i = 0; i < chats.length; i++) {
                                if (chats[i].roomId === roomId) {
                                    chats[i].updatedAt = new Date().getTime()
                                    chats[i].unReadMessage = memberInRoom !== UserStore.user.id ? chats[i].unReadMessage + 1 : 0
                                    chats[i].lastMessage = messageBody.text
                                }
                            }
                            await set(ref(db, "chats/" + memberInRoom), [...chats])
                        } else {
                            console.log('no result')
                        }
                    })
                }
            }, 10)
        } catch (e) {
            console.log(e)
            return false
        }
    }

    onFetchingChat = (roomId) => {
        try {
            this.setChatFetching(true)
            setTimeout(() => {
                const db = getDatabase(firebaseApp)
                get(child(ref(db), "messages/" + roomId)).then((sns) => {
                    if (sns.exists()) {
                        this.setMessages(sns.val())
                    } else {
                        console.log('no message')
                    }
                })
                this.setChatFetching(false)
            }, 100)
        } catch (e) {
            console.log(e)
        }
    }
    setRoom = (value) => {
        this.room = value
    }
    setRoomFetching = (val) => {
        this.roomFetching = val
    }
    setChatFetching = (value) => {
        this.chatFetching = value
    }

    setMessages = (value) => {
        this.messages = value
    }

    onReadMessage = (roomId) => {
        const db = getDatabase(firebaseApp)
        //    update readMessage
        get(child(ref(db), "chats/" + UserStore.user.id)).then(async (sns) => {
            if (sns.exists()) {
                const chats = sns.val()
                for (let i = 0; i < chats.length; i++) {
                    if (chats[i].roomId === roomId) {
                        chats[i].unReadMessage = 0;
                    }
                }
                await set(ref(db, "chats/" + UserStore.user.id), [...chats])
            }
        })
    }

    onVerifyMessage = (messages) => {
        return messages.length === this.messages.length
    }
    onListenChat = (roomId) => {
        const db = getDatabase(firebaseApp)
        const messageCountRef = ref(db, "messages/" + roomId)
        const listener = onValue(messageCountRef, (sns) => {
            if (sns.exists()) {
                if (!this.onVerifyMessage(sns.val())) {
                    let newMessage = [...sns.val()]
                    this.setMessages(newMessage)
                    this.onSyncMessageList()
                }
            }
        })
        return listener;
    }


    clear() {
        this.setMessages([])
        this.setRoom({})
        this.setChatFetching(false)
        this.setRoomFetching(false)
    }

    setFetching(b) {
        this.fetching = b
    }

    setMessageList = (value) => {
        this.messageList = value
    }

    onSyncMessageList() {
        try {
            let tmpMsg = [...this.messages]
            const resultArr = []
            let first = 0;
            let last = 0;
            let count = 1;
            for (let i = first; i < tmpMsg.length; i += count) {
                count = 0;
                let senderId = tmpMsg[i].senderId
                for (let j = first; j < tmpMsg.length; j++) {
                    if (tmpMsg[j].senderId === senderId) {
                        count++
                    } else {
                        break;
                    }
                }
                last = count + first
                const arr_s = tmpMsg.slice(first, last)
                resultArr.push(arr_s)
                first = last
            }

            this.setMessageList([...resultArr])
        } catch (e) {
            console.log(e)
        }
    }
}

const singleChatModel = new SingleChatModel()
export default singleChatModel