import {observer} from "mobx-react";
import {Box, Text} from "native-base";
import {useEffect, useRef, useState} from "react";
import SingleChatModel from "../model/SingleChatModel";
import {FlatList, Keyboard} from "react-native";
import {Message} from "./Message";
import UserStore from "../model/UserStore";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import {checkDateExit} from "../util/helper";

const MessageView = ({roomId}) => {
    const ref = useRef()
    const [limit, setLimit] = useState(10)
    const [dates, setDate] = useState([])
    const [countOfDate, setCountOfDate] = useState(0)
    const renderMessage = (message, index, length) => {
        const newDate = new Date()
        const dateStr = newDate.toUTCString().slice(0, newDate.toUTCString().indexOf(newDate.getFullYear().toString()))
        if (checkDateExit(dates, dateStr)) {
            let tmp = [...dates]
            tmp.push(dateStr)
            setDate(tmp)
            setCountOfDate(c => c + 1)
        }
        return (
            <>
                {
                    countOfDate === 1 ?
                        <Box>
                            <Box my={8}>
                                <Text textAlign={'center'} color={'gray.400'}>{dateStr}</Text>
                            </Box>
                            <Message sender={UserStore.user.id === message.senderId} messageItem={message}
                                     isLastOfList={index === length - 1}/>
                        </Box> :
                        <Message sender={UserStore.user.id === message.senderId} messageItem={message}
                                 isLastOfList={index === length - 1}/>
                }
            </>
        )
    }
    const renderListMessage = ({item, index}) => {
        return (
            <FlatList data={item}
                      contentContainerStyle={{marginVertical: 12}}
                      keyExtractor={message => message?.id}
                      renderItem={({item: message, index}) => {
                          return renderMessage(message, index, item.length)
                      }}/>
        )
    }

    useEffect(() => {
        SingleChatModel.setMessages([])
        SingleChatModel.onReadMessage(roomId)
        return SingleChatModel.onListenChat(roomId)
    }, [roomId])
    const [page, setPage] = useState(1)
    useEffect(() => {
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
            <FlatList
                showsVerticalScrollIndicator={false}
                ref={ref}
                inverted
                contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 20}}
                data={SingleChatModel.messageList.slice((page - 1) * (limit || 10), SingleChatModel.messageList.length).reverse()}
                renderItem={renderListMessage}
                keyExtractor={item => item?.id || UUID()}
                onContentSizeChange={() => {
                    ref.current.scrollToOffset({offset: 0, animate: true})
                }}
            />
        </Box>
    )
}
export default observer(MessageView)