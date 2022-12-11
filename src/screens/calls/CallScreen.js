import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Center, Text} from "native-base";
import {observer} from "mobx-react";

const CallScreen = ({route}) => {

    return (

        <NativeBaseProvider>
            <Center flex={1}>
                <Text>Calls Screen</Text>
            </Center>
        </NativeBaseProvider>

    )
}
export default observer(CallScreen)