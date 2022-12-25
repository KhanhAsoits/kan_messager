import {Box, HStack, Image, Text, VStack} from "native-base";
import {getUpdateDate, SCREEN_WIDTH} from "../util/helper";
import avatar from '../.././assets/static/images/user.jpg'
import UserStore from "../model/UserStore";

export const Message = ({messageItem, sender, isLastOfList}) => {
    return (
        <HStack my={2} space={1} flexDir={sender ? 'row-reverse' : 'row'}
                alignSelf={sender ? 'flex-end' : "flex-start"}
                justottomRightRadius={sender ? 0 : 12}
                flexWrifyContent={'flex-start'}
                maxW={SCREEN_WIDTH - 79} alignItems={'flex-end'}>
            {!sender ?
                isLastOfList ?
                    <Image alt={'user avatar'} source={avatar} width={31} height={31} borderRadius={100}></Image>
                    :
                    <Box width={31} height={31}></Box>
                :
                <Box></Box>
            }
            <Box>
                {UserStore.user.username !== messageItem.senderName &&
                    <Text textAlign={sender ? 'right' : 'left'} px={2} color={'gray.400'}
                          fontSize={10}>{messageItem.senderName}</Text>}
                <VStack p={3} space={1} borderRadius={12} borderBottomLeftRadius={sender ? 12 : 0}
                        borderBap={'wrap'} bgColor={'rgba(247,247,247,1)'} maxW={SCREEN_WIDTH - 120}>
                    <Box flexDir={'row'} flexWrap={'wrap'} maxW={SCREEN_WIDTH - 120}>
                        <Text>{messageItem?.body?.text || ""}</Text>
                    </Box>
                    <Text textAlign={sender ? 'right' : 'left'} fontSize={12}
                          color={'black'}>{getUpdateDate(messageItem?.updatedAt, ":")}</Text>
                </VStack>
            </Box>
        </HStack>
    )
}
