import {observer} from "mobx-react";
import {Keyboard} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../util/helper";
import {Box, ScrollView, VStack} from "native-base";
import {Message} from "./Message";

const MessageView = ({headerHeight, typerHeight, typerDefaultHeight}) => {
    return (
        <Box onTouchStart={() => {
            Keyboard.dismiss()
        }} width={SCREEN_WIDTH} style={{minHeight: SCREEN_HEIGHT - headerHeight - 180}}
             height={SCREEN_HEIGHT - headerHeight}
             bgColor={'white'}>
            <Box style={{minHeight: SCREEN_HEIGHT - (typerHeight || typerDefaultHeight) - 180}}
                 height={SCREEN_HEIGHT - headerHeight - (typerHeight || typerDefaultHeight) - 20}>
                <ScrollView showsVerticalScrollIndicator={false} pt={3} px={3}>
                    <VStack space={5}>
                        <Message messageItem={{}}/>
                        <Message messageItem={{}} sender={true}/>
                    </VStack>
                </ScrollView>
            </Box>
        </Box>
    )
}
export default observer(MessageView)