import {observer} from 'mobx-react'
import {HStack, Image, Text, VStack} from "native-base";
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import avatar from "../../assets/static/images/user.jpg";

const ChatHeader = ({headerHeight}) => {
    return (
        <HStack borderBottomWidth={1} borderBottomColor={'gray.200'} height={headerHeight}
                backgroundColor={'white'} shadow={1} px={3}
                justifyContent={'space-between'}
                alignItems={'center'} space={6}
                py={2}>
            <TouchableOpacity style={{width: '6%'}}>
                <Ionicons name={'chevron-back'} size={33} color={'rgba(0,0,0,0.5)'}>
                </Ionicons>
            </TouchableOpacity>
            <HStack space={6} alignItems={'center'} justifyContent={'center'}>
                <Image alt={'chat thumnail'} source={avatar} width={50} height={50}
                       borderRadius={100}></Image>
                <VStack>
                    <Text fontSize={19} fontWeight={'600'}>Fullsnak Designer</Text>
                    <Text fontSize={13} fontWeight={'300'}>7 online from 12 people</Text>
                </VStack>
                <TouchableOpacity>
                    <Ionicons name={'videocam'} color={'rgba(0,0,0,0.5)'} size={33}></Ionicons>
                </TouchableOpacity>
            </HStack>

            <TouchableOpacity>
                <Ionicons name={'ellipsis-vertical'} color={'rgba(0,0,0,0.5)'} size={26}></Ionicons>
            </TouchableOpacity>
        </HStack>
    )
}
export default observer(ChatHeader)