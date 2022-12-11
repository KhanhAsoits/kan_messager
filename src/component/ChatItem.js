import {observer} from "mobx-react";
import {Box, HStack, Image, Text, VStack} from "native-base";
import {faker} from "@faker-js/faker";
import ThemeStore from "../model/ThemeStore";

const ChatItem = ({chatItem}) => {
    return (
        <HStack bgColor={ThemeStore.baseProps.bgColor} borderRadius={8} py={2} width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'} px={0}>
            <HStack justifyContent={'flex-start'} alignItems={'center'} space={6} width={'50%'}>
                <Box position={'relative'}>
                    <Image source={{uri: faker.image.avatar()}} alt={'user avatar'} width={60} height={60}
                           bgColor={'gray.200'} borderRadius={100}/>
                    <Box bgColor={'green.400'}
                         position={'absolute'}
                         right={-2}
                         bottom={1}
                         style={{width: 16, height: 16, borderRadius: 100, borderWidth: 2, borderColor: 'white'}}></Box>
                </Box>
                <VStack space={1}>
                    <Text fontSize={16} color={ThemeStore.baseProps.textColor}>
                        {faker.name.fullName()}
                    </Text>
                    <Text fontSize={12} numberOfLines={1} color={'gray.500'}>
                        {faker.lorem.sentence()}
                    </Text>
                </VStack>
            </HStack>
            <VStack space={1} width={'20%'}>
                <Text color={'gray.600'}>20:35</Text>
                <Box width={'50%'} px={2} bgColor={'blue.400'} borderRadius={100}>
                    <Text color={'white'} textAlign={'center'}>6</Text>
                </Box>
            </VStack>
        </HStack>
    )
}
export default observer(ChatItem)