import {makeAutoObservable} from "mobx";
import {child, get, getDatabase, ref, set} from "firebase/database";
import {firebaseApp} from "../../configs/firebase_config";
import UserStore from "./UserStore";
import 'react-native-get-random-values'

class ChatListModel {

    allChatFetching = false
    error = false
    errMessage = ''
    allChat = []
    personal = []
    works = []
    groups = []

    constructor() {
        makeAutoObservable(this)
    }

    setAllChat = (value) => {
        this.allChat = value
    }
    setPersonalChat = (value) => {
        this.personal = value
    }

    setWorkChat = (value) => {
        this.works = value
    }
    setGroupsChat = (value) => {
        this.groups = value
    }


    setErr = (value) => {
        this.error = value
    }
    setErrMsg = (value) => {
        this.errMessage = value
    }
//    sync

    setAllChatFetching = (value) => {
        this.allChatFetching = value
    }
    onClassifyData = (data) => {
        let personalChats = []
        let workChat = []
        let groupChat = []
        data.forEach((chat, index) => {
            switch (chat.type) {
                case 'personal':
                    personalChats.push(chat)
                    break;
                case 'work':
                    workChat.push(chat)
                    break;
                case 'groups':
                    groupChat.push(chat);
                    break
            }
            this.setAllChat(data)
            this.setPersonalChat(personalChats)
            this.setWorkChat(workChat)
            this.setGroupsChat(groupChat)
        })
    }

    onGetAllChatById = async () => {
        try {
            this.setAllChatFetching(true)
            setTimeout(() => {
                const dbRef = ref(getDatabase(firebaseApp))
                get(child(dbRef, "chats/" + UserStore.user.id)).then(sns => {
                    if (sns.exists()) {
                        this.onClassifyData(sns.val())
                    }
                    this.setAllChatFetching(false)
                })
            }, 1000)
        } catch (e) {
            this.setAllChatFetching(false)
            console.log(e)
        }

    }

    setChats = async () => {
        const types = ['work', 'personal', 'groups']
        try {

        } catch (e) {
            console.log(e)
        }
    }
}

const chatListStore = new ChatListModel()
export default chatListStore