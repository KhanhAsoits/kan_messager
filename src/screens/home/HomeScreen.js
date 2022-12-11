import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Center, Text} from "native-base";
import UserStore from "../../model/UserStore";
const HomeScreen = () => {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Text>home screen</Text>
            </Center>
        </NativeBaseProvider>
    )
}

export default observer(HomeScreen)