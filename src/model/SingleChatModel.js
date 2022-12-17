import {makeAutoObservable, values} from "mobx";
import {child, get, getDatabase, onValue, ref, set, update} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import {Message, Room} from "../../types";
import UserStore from "./UserStore";
import {getChildOfObject} from "../util/helper";

class SingleChatModel {
    messages = []
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
    onSendMessage = (messageBody, roomId) => {
        try {
            //    get if has exit
            const db = getDatabase(firebaseApp)
            get(child(ref(db), "messages/" + roomId,)).then(async (sns) => {
                let messages = []
                if (sns.exists()) {
                    messages = [...sns.val()]
                }
                const message = new Message(UserStore.user.id, roomId, messageBody, new Date().getTime(), new Date().getTime())
                messages.push(message)
                await set(ref(db, "messages/" + roomId), [...messages])
                //    after add message , update chat list
            })

            get(child(ref(db), "chats/" + UserStore.user.id)).then(async (sns) => {
                if (sns.exists()) {
                    let chats = sns.val()
                    for (let i = 0; i < chats.length; i++) {
                        if (chats[i].roomId === roomId) {
                            chats[i].updatedAt = new Date().getTime()
                            chats[i].unReadMessage += 1
                            chats[i].lastMessage = messageBody.text
                        }
                    }
                    await set(ref(db, "chats/" + UserStore.user.id), [...chats])
                } else {
                    console.log('no result')
                }
            })
        } catch (e) {
            console.log(e)
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

    onListenChat = (roomId) => {
        const db = getDatabase(firebaseApp)
        const messageCountRef = ref(db, "messages/" + roomId)
        onValue(messageCountRef, (sns) => {
            if (sns.exists()) {
                const listMessage = getChildOfObject(sns)
                if (listMessage.length > 0) {
                    this.setMessages(listMessage)
                }
                console.log(listMessage)
            } else {
                console.log('no messages on listen')
            }
        })
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
}

const singleChatModel = new SingleChatModel()
export default singleChatModel