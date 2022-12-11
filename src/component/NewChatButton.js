import {observer} from "mobx-react";
import {Box} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {TouchableOpacity} from "react-native";
import ChatListModel from "../model/ChatListModel";

const NewChatButton = () => {

    return (
        <TouchableOpacity activeOpacity={.9} onPress={ChatListModel.onGetAllChatById}>
            <Box position={'absolute'} bottom={10} right={1} width={76} height={76} justifyContent={'center'}
                 alignItems={'center'} borderRadius={100} bgColor={'blue.400'}>
                <Ionicons name={'chatbubbles'} size={30} color={'white'}/>
            </Box>
        </TouchableOpacity>
    )

}
export default observer(NewChatButton)