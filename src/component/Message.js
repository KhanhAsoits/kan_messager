import {Box, HStack, Image, Text, VStack} from "native-base";
import {SCREEN_WIDTH} from "../util/helper";
import avatar from '../.././assets/static/images/user.jpg'
import {useNavigation} from "@react-navigation/native";

export const Message = ({messageItem, sender = false}) => {

    return (
        <HStack space={1} flexDir={sender ? 'row-reverse' : 'row'}
                alignSelf={sender ? 'flex-end' : "flex-start"}
                justifyContent={'flex-start'}
                maxW={SCREEN_WIDTH - 79} alignItems={'flex-end'}>
            <Image alt={'user avatar'} source={avatar} width={41} height={41} borderRadius={100}></Image>
            <VStack p={3} space={1} borderRadius={12} borderBottomLeftRadius={sender ? 12 : 0}
                    borderBottomRightRadius={sender ? 0 : 12}
                    flexWrap={'wrap'} bgColor={'rgba(247,247,247,1)'} maxW={SCREEN_WIDTH - 120}>
                <Box flexDir={'row'} flexWrap={'wrap'} maxW={SCREEN_WIDTH - 120}>
                    <Text>Someone like you..</Text>
                </Box>
                <Text textAlign={'right'} fontSize={12} color={'black'}>6:16</Text>
            </VStack>
        </HStack>
    )
}
