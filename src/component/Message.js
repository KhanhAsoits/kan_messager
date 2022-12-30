import {Box, HStack, Image, Text, VStack} from "native-base";
import {SCREEN_WIDTH} from "../util/helper";
import avatar from '../.././assets/static/images/user.jpg'
import UserStore from "../model/UserStore";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import SingleChatModel from "../model/SingleChatModel";
import 'react-native-get-random-values'
import defaultSource from '../../assets/static/images/sign_bg.png'
import ExpoCachedImage, {CacheManager} from 'expo-cached-image'
import {useEffect, useState} from "react";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'

export const Message = ({messageItem, sender, isFirst}) => {
    const handleSetShowMedia = () => {
        SingleChatModel.setMedia(messageItem.body?.media)
        SingleChatModel.setShowMedia(true)
    }
    return (
        <>
            <HStack my={.9} space={1} flexDir={sender ? 'row-reverse' : 'row'}
                    alignSelf={sender ? 'flex-end' : "flex-start"}
                    justottomRightRadius={sender ? 0 : 12}
                    flexWrifyContent={'flex-start'}
                    maxW={SCREEN_WIDTH - 79} alignItems={'flex-end'}>
                <Box>
                    <Box>
                        {messageItem.body?.media ?
                            <Box>
                                <TouchableOpacity activeOpacity={1} onPress={handleSetShowMedia}>
                                    {messageItem.body.media.includes("file:///") ?
                                        <Image source={{uri: messageItem.body.media}} style={{
                                            width: SCREEN_WIDTH / 3,
                                            borderRadius: 6,
                                            marginVertical: 12,
                                            height: 200,
                                            resizeMode: "cover",
                                            backgroundColor: 'rgba(0,0,0,0.1)'

                                        }}
                                               alt={'image'}
                                        /> :
                                        <ExpoCachedImage
                                            source={{uri: messageItem.body.media}}
                                            cacheKey={messageItem.id}
                                            style={{
                                                width: SCREEN_WIDTH / 3,
                                                borderRadius: 6,
                                                marginVertical: 12,
                                                height: 200,
                                                resizeMode: "cover"
                                            }}
                                            placeholderContent={
                                                <Box style={{
                                                    width: SCREEN_WIDTH / 3,
                                                    borderRadius: 6,
                                                    marginVertical: 12,
                                                    height: 200,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: 'rgba(0,0,0,0.1)'
                                                }}>
                                                    <ActivityIndicator color={'gray'} size={20}
                                                                       style={{justifyContent: 'center'}}/>
                                                </Box>
                                            }
                                        />
                                    }
                                </TouchableOpacity>
                            </Box>
                            :
                            <VStack p={3} space={1} borderRadius={12} borderBottomLeftRadius={sender ? 12 : 0}
                                    borderBap={'wrap'} bgColor={'rgba(247,247,247,1)'} maxW={SCREEN_WIDTH - 120}>
                                <Box flexDir={'row'} flexWrap={'wrap'} maxW={SCREEN_WIDTH - 120}>
                                    <Text>{messageItem?.body?.text || ""}</Text>
                                </Box>
                            </VStack>
                        }
                    </Box>
                </Box>
            </HStack>
            {UserStore.user.username
                !== messageItem.senderName && isFirst &&
                <Text textAlign={sender ? 'right' : 'left'} color={'gray.400'}
                      fontSize={12}>{messageItem.senderName}</Text>

            }
        </>

    )
}
