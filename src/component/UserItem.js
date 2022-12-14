import {TouchableOpacity} from "react-native";
import {HStack, Image, Text} from "native-base";
import avatar from "../../assets/static/images/user.jpg";
import {observer} from "mobx-react";
import NewChatModel from "../model/NewChatModel";

const UserItem = ({user, index, name = true}) => {
    const handleSelectUser = () => {
        NewChatModel.selectUser(user)
    }
    return (
        <TouchableOpacity activeOpacity={.8} onPress={handleSelectUser}>
            <HStack key={index.toString()} borderRadius={8} py={2} px={3}
                    bgColor={'gray.50'}
                    alignItems={'center'}
                    space={2}>
                <Image source={avatar}
                       alt={'user avatar'}
                       style={{
                           width: 50,
                           borderRadius: 100,
                           height: 50,
                           backgroundColor: 'rgba(0,0,0,0.3)'
                       }}/>
                {name && <Text fontSize={17} fontWeight={'500'}>{user?.username}</Text>}
            </HStack>
        </TouchableOpacity>
    )
}
export default observer(UserItem)