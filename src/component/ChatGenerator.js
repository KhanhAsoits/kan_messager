import {observer} from "mobx-react";
import {ScrollView, VStack} from "native-base";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import ChatItem from "./ChatItem";
import {useEffect} from "react";
import ChatListModel from "../model/ChatListModel";
import UserStore from "../model/UserStore";

const ChatGenerator = ({chats,appNav}) => {
    useEffect(() => {
        return ChatListModel.onListenChatList(UserStore.user.id)
    }, [UserStore.user.id])
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space={4}>
                {chats.map((chat, index) => {
                    return (
                        <ChatItem appNav={appNav} key={UUID()} chatItem={chat}/>
                    )
                })}
            </VStack>
        </ScrollView>
    )
}
export default observer(ChatGenerator)