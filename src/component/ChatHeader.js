import {observer} from 'mobx-react'
import {Box, HStack, Image, Text, VStack} from "native-base";
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import avatar from "../../assets/static/images/user.jpg";
import SingleChatModel from "../model/SingleChatModel";
import {useEffect, useLayoutEffect} from "react";

const ChatHeader = ({roomId, headerHeight}) => {

    return (
        <HStack width={'100%'} borderBottomWidth={1} borderBottomColor={'gray.200'} height={headerHeight}
                backgroundColor={'white'} shadow={1} px={2}
                justifyContent={'space-between'}
                alignItems={'center'} space={6}
                py={2}>
            <TouchableOpacity style={{width: '6%'}}>
                <Ionicons name={'chevron-back'} size={36}
                          color={SingleChatModel.roomFetching ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)'}>
                </Ionicons>
            </TouchableOpacity>
            <HStack space={6} alignItems={'center'} justifyContent={'center'}>
                {SingleChatModel.roomFetching ?
                    <Box bgColor={'gray.200'} width={60} height={60}
                         borderRadius={100}></Box>
                    :
                    <Image alt={'chat thumnail'}
                           source={SingleChatModel.room.thumbnail ? {uri: SingleChatModel.room.thumbnail} : avatar}
                           width={60} height={60}
                           borderRadius={100}></Image>
                }
                <VStack space={.5}>
                    {SingleChatModel.roomFetching ?
                        <>
                            <Box w={'150'} h={8} borderRadius={12} bgColor={'gray.200'}></Box>
                            <Box w={'80%'} h={4} borderRadius={12} bgColor={'gray.200'}></Box>
                        </>
                        :
                        <Box maxW={150}>
                            <Text fontSize={19} fontWeight={'600'} numberOfLines={1}>{SingleChatModel.room.roomName}</Text>
                            {SingleChatModel.room.limit > 2 ?
                                <Text fontSize={13} fontWeight={'300'}>7 online
                                    from {SingleChatModel.room.limit} people</Text>
                                :
                                <Text fontSize={13} fontWeight={'300'}>Active on 7 minutes</Text>
                            }
                        </Box>
                    }
                </VStack>
                <TouchableOpacity>
                    <Ionicons name={'videocam'}
                              color={SingleChatModel.roomFetching ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)'}
                              size={33}></Ionicons>
                </TouchableOpacity>
            </HStack>

            <TouchableOpacity>
                <Ionicons name={'ellipsis-vertical'}
                          color={SingleChatModel.roomFetching ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)'}
                          size={26}></Ionicons>
            </TouchableOpacity>
        </HStack>
    )
}
export default observer(ChatHeader)