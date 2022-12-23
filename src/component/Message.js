import {Box, HStack, Image, Text, VStack} from "native-base";
import {getUpdateDate, SCREEN_WIDTH} from "../util/helper";
import avatar from '../.././assets/static/images/user.jpg'
import UserStore from "../model/UserStore";

export const Message = ({messageItem, sender, loader}) => {
    return (
        <HStack my={2} space={1} flexDir={sender ? 'row-reverse' : 'row'}
                alignSelf={sender ? 'flex-end' : "flex-start"}
                justifyContent={'flex-start'}
                maxW={SCREEN_WIDTH - 79} alignItems={'flex-end'}>
            {loader ?
                <Box width={41} height={41} borderRadius={100} background={'gray.200'}></Box>
                :
                <Image alt={'user avatar'} source={avatar} width={41} height={41} borderRadius={100}></Image>
            }
            {loader ?
                <VStack p={3} space={1} borderRadius={12} borderBottomLeftRadius={sender ? 12 : 0}
                        borderBottomRightRadius={sender ? 0 : 12}
                        flexWrap={'wrap'} bgColor={'rgba(247,247,247,1)'} w={SCREEN_WIDTH - 120}>
                    <Box flexDir={'row'} flexWrap={'wrap'} maxW={SCREEN_WIDTH - 120}>
                        <Text></Text>
                    </Box>
                    <Text textAlign={'right'} fontSize={12} color={'black'}></Text>
                </VStack>
                :
                <Box>
                    {UserStore.user.username !== messageItem.senderName &&
                        <Text textAlign={'right'} px={2} fontSize={10}>{messageItem.senderName}</Text>}
                    <VStack p={3} space={1} borderRadius={12} borderBottomLeftRadius={sender ? 12 : 0}
                            borderBottomRightRadius={sender ? 0 : 12}
                            flexWrap={'wrap'} bgColor={'rgba(247,247,247,1)'} maxW={SCREEN_WIDTH - 120}>


                        <Box flexDir={'row'} flexWrap={'wrap'} maxW={SCREEN_WIDTH - 120}>
                            <Text>{messageItem?.body?.text || ""}</Text>
                        </Box>
                        <Text textAlign={'right'} fontSize={12}
                              color={'black'}>{getUpdateDate(messageItem?.updatedAt, ":")}</Text>
                    </VStack>
                </Box>
            }
        </HStack>
    )
}
