import {HStack, Image, Text} from "native-base";
import ThemeStore from "../model/ThemeStore";
import {TouchableOpacity} from "react-native";
import user from "../../assets/static/images/user.jpg";
import {observer} from "mobx-react";

const CustomHeader = ({headerTitle}) => {
    return (
        <HStack justifyContent={'space-between'} alignItems={'flex-end'} flex={.12}>
            <Text color={ThemeStore.baseProps.textColor} fontSize={26} fontWeight={'600'}>Recent Chats</Text>
            <TouchableOpacity>
                <Image source={user} alt={'user avatar'} style={{width: 50, height: 50}} resizeMode={'cover'}
                       borderRadius={100}/>
            </TouchableOpacity>
        </HStack>
    )
}
export default observer(CustomHeader)