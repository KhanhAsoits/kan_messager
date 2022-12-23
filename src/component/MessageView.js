import {observer} from "mobx-react";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../util/helper";
import {Box, ScrollView, VStack} from "native-base";
import {useEffect, useLayoutEffect, useRef} from "react";
import SingleChatModel from "../model/SingleChatModel";
import {FlatList} from "react-native";
import {Message} from "./Message";
import UserStore from "../model/UserStore";

const MessageView = ({roomId, headerHeight, typerHeight, typerDefaultHeight, bottomPadding, defaultBottomPadding}) => {
    const ref = useRef()

    const renderListMessage = ({item}) => {
        return (
            <Message sender={item.senderId === UserStore.user.id} messageItem={item} loader={false}/>
        )
    }
    useEffect(() => {
        SingleChatModel.setMessages([])
        SingleChatModel.onReadMessage(roomId)
        return SingleChatModel.onListenChat(roomId)
    }, [roomId])
    return (
        <Box onTouchStart={() => {
            // Keyboard.dismiss()
        }} width={SCREEN_WIDTH} style={{minHeight: SCREEN_HEIGHT - headerHeight - 180}}
             height={SCREEN_HEIGHT - headerHeight}
             bgColor={'white'}>
            <Box style={{minHeight: SCREEN_HEIGHT - (typerHeight || typerDefaultHeight) - 100}}
                 height={SCREEN_HEIGHT - headerHeight - (typerHeight || typerDefaultHeight) - 100}>
                {/*<ScrollView*/}
                {/*    onContentSizeChange={(e) => {*/}
                {/*        return ref.current.scrollToEnd({animate: true})*/}
                {/*    }}*/}
                {/*    ref={ref}*/}
                {/*    contentContainerStyle={{*/}
                {/*        paddingBottom: bottomPadding || defaultBottomPadding,*/}
                {/*    }}*/}
                {/*    showsVerticalScrollIndicator={false} pt={3}*/}
                {/*    px={3}>*/}
                {/*    <VStack space={5}>*/}
                {/*        {SingleChatModel.messages.map((val, index) => {*/}
                {/*            return (*/}
                {/*                <Message key={index.toString()} loader={SingleChatModel.chatFetching}*/}
                {/*                         sender={val.senderId === UserStore.user.id} messageItem={val}/>*/}
                {/*            )*/}
                {/*        })*/}
                {/*        }*/}
                {/*    </VStack>*/}
                {/*</ScrollView>*/}
                <FlatList
                    ref={ref}
                    inverted={true}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: bottomPadding || defaultBottomPadding
                    }}
                    data={SingleChatModel.messages.slice(0, SingleChatModel.messages.length).reverse()}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderListMessage}
                    keyExtractor={item => item?.id}
                />
            </Box>
        </Box>
    )
}
export default observer(MessageView)