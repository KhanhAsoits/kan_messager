import {HStack, Image, Text} from "native-base";
import ThemeStore from "../model/ThemeStore";
import {TouchableOpacity} from "react-native";
import user from "../../assets/static/images/user.jpg";
import {observer} from "mobx-react";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomHeader = ({headerTitle, imageLeft = false}) => {
    return (
        <HStack justifyContent={'space-between'} alignItems={'flex-end'} flex={.1}>
            <Text color={ThemeStore.baseProps.textColor} fontSize={26} fontWeight={'600'}>Recent Chats</Text>
            <TouchableOpacity>
                {imageLeft ?
                    <Image source={user} alt={'user avatar'} style={{width: 50, height: 50}} resizeMode={'cover'}
                           borderRadius={100}/> :
                    <Ionicons name={"search"} size={30}></Ionicons>
                }
            </TouchableOpacity>
        </HStack>
    )
}
export default observer(CustomHeader)