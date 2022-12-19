import {observer} from "mobx-react";
import {Box, HStack, Image, Text, VStack} from "native-base";
import {faker} from "@faker-js/faker";
import ThemeStore from "../model/ThemeStore";
import user from '../../assets/static/images/user.jpg'
import {TouchableOpacity} from "react-native";
import {useEffect} from "react";
import ChatListModel from "../model/ChatListModel";
import UserStore from "../model/UserStore";

const ChatItem = ({chatItem, appNav}) => {
    const handleToChatScreen = () => {
        appNav.navigate("chat_screen", {roomId: chatItem?.roomId})
    }
    useEffect(() => {
        console.log('render')
        return ChatListModel.onListenChatList(UserStore.user.id)
    }, [UserStore.user.id])
    return (
        <TouchableOpacity activeOpacity={.8} onPress={handleToChatScreen}>
            <HStack bgColor={ThemeStore.baseProps.bgColor} borderRadius={8} py={2} width={'100%'}
                    justifyContent={'space-between'}
                    alignItems={'center'} px={0}>
                <HStack justifyContent={'flex-start'} alignItems={'center'} space={6} width={'50%'}>
                    <Box position={'relative'}>
                        <Image source={user} alt={'user avatar'} width={60} height={60}
                               bgColor={'gray.200'} borderRadius={100}/>
                        <Box bgColor={'green.400'}
                             position={'absolute'}
                             right={-2}
                             bottom={1}
                             style={{
                                 width: 16,
                                 height: 16,
                                 borderRadius: 100,
                                 borderWidth: 2,
                                 borderColor: 'white'
                             }}></Box>
                    </Box>
                    <VStack space={1}>
                        <Text fontSize={16} color={ThemeStore.baseProps.textColor}>
                            {chatItem.name}
                        </Text>
                        <Text fontSize={12} numberOfLines={1} color={'gray.500'}>
                            {chatItem.lastMessage}
                        </Text>
                    </VStack>
                </HStack>
                <VStack space={1} width={'20%'}>
                    <Text
                        color={'gray.600'}>{new Date(chatItem.updatedAt).getHours()} : {+new Date(chatItem.updatedAt).getMinutes()}</Text>
                    <Box width={'50%'} px={2} bgColor={'blue.400'} borderRadius={100}>
                        <Text color={'white'} textAlign={'center'}>{chatItem.unReadMessage}</Text>
                    </Box>
                </VStack>
            </HStack>
        </TouchableOpacity>
    )
}
export default observer(ChatItem)