import {observer} from "mobx-react";
import {Box, Image, Text} from "native-base";
import {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import SingleChatModel from "../model/SingleChatModel";
import {FlatList, Keyboard} from "react-native";
import {Message} from "./Message";
import UserStore from "../model/UserStore";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import {checkDateExit, SCREEN_WIDTH} from "../util/helper";
import MessageGenerator from "./MessageGenerator";

const MessageView = ({roomId}) => {
    const [limit, setLimit] = useState(10)
    useLayoutEffect(() => {
        SingleChatModel.setMessages([])
        SingleChatModel.onReadMessage(roomId)
        return SingleChatModel.onListenChat(roomId)
    }, [roomId])

    const [page, setPage] = useState(1)
    useLayoutEffect(() => {
        let pages = Math.round(SingleChatModel.messages.length / limit);
        if (page <= 0) {
            pages = 1
        }
        setPage(pages)
    }, [])

    return (
        <Box flex={.97} bgColor={'white'} onTouchStart={() => {
            Keyboard.dismiss()
        }}>
            <MessageGenerator
                setLimit={setLimit}
                messages={SingleChatModel.messages.slice(((page || 1) - 1) * (limit || 10), SingleChatModel.messages.length).reverse()}
                page={page} limit={limit}/>
        </Box>
    )
}
export default observer(MessageView)