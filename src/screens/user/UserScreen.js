import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Center, Text} from "native-base";
import {observer} from "mobx-react";
import {TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserStore from "../../model/UserStore";
import AuthStore from "../../model/AuthStore";

const UserScreen = ({route}) => {

    const handleLogout = async () => {
        await AsyncStorage.removeItem("@authorize_user_id");
        UserStore.setUser({})
        AuthStore.setLogin(false)
    }
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Text>User Screen</Text>
                <TouchableOpacity onPress={handleLogout}><Text>LOgout</Text></TouchableOpacity>
            </Center>
        </NativeBaseProvider>

    )
}
export default observer(UserScreen)