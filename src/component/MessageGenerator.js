import {observer} from "mobx-react";
import {FlatList} from "react-native";
import {v4 as UUID} from "uuid";
import {useMemo, useRef} from "react";
import {Box} from "native-base";
import SingleChatModel from "../model/SingleChatModel";
import MessageList from "./MessageList";
import {Message} from "./Message";
import UserStore from "../model/UserStore";

const MessageGenerator = ({setLimit, messages}) => {
    const ref = useRef(null)
    let first = 0;
    let oldSenderId = ""
    let last = false
    const lastRef = useRef(false)
    const renderMessage = ({item: message, index}) => {
        if (oldSenderId !== message.senderId) {
            first = 0
        }

        if (first === 0) {
            oldSenderId = message.senderId
        }

        if (oldSenderId === message.senderId) {
            ++first
        }

        const nextSenderId = messages[index + 1]?.senderId;
        if (nextSenderId && nextSenderId !== oldSenderId) {
            last = true
        } else {
            last = false
        }
        return (
            <Message isFirst={last && first > 0}
                     sender={UserStore.user.id === message.senderId}
                     messageItem={message}
            />
        )
    }

    const renderListMessageMemo = useMemo(() => renderMessage, [SingleChatModel.messageList])

    return (
        <FlatList
            onEndReached={(e) => {
                setLimit(c => c + 20)
            }}
            showsVerticalScrollIndicator={false}
            ref={ref}
            inverted
            contentContainerStyle={{paddingHorizontal: 20, paddingVertical: 20}}
            data={messages}
            renderItem={renderListMessageMemo}
            keyExtractor={item => item?.id || UUID()}
        />
    )
}
export default observer(MessageGenerator)