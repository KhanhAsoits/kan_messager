import {observer} from "mobx-react";
import {HStack, Image, ScrollView} from "native-base";
import NewChatModel from "../model/NewChatModel";
import {TouchableOpacity} from "react-native";
import avatar from "../../assets/static/images/user.jpg";
import UserItem from "./UserItem";

const SelectedUser = () => {
    return (
        <ScrollView px={1} mt={4} mb={2} horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={2} justifyContent={'flex-start'} alignItems={'center'}>
                {NewChatModel.userSelected.map((val, index) => {
                    return (
                        <TouchableOpacity activeOpacity={.8} onPress={() => {
                            NewChatModel.unSelectUser(val)
                        }} key={index.toString()}>
                            <Image alt={'user avatar'} source={avatar}
                                   style={{width: 60, height: 60, borderRadius: 100}}></Image>
                        </TouchableOpacity>
                    )
                })}
            </HStack>
        </ScrollView>
    )
}
export default observer(SelectedUser)