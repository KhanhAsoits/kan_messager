import {observer} from "mobx-react";
import {Box, HStack, Text, VStack} from "native-base";
import {SCREEN_WIDTH} from "../util/helper";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import TabModel from "../model/TabModel";
import ChatContentTab from "./ChatContentTab";

const TabContent = ({items, flex}) => {
    const left = TabModel.activeTab === 1 ? 0 : TabModel.activeTab === 2 ? -SCREEN_WIDTH : -SCREEN_WIDTH * (TabModel.activeTab - 1)
    return (
        <Box flex={flex} overflow={'hidden'} width={'100%'}>
            <HStack left={left} height={'100%'} width={SCREEN_WIDTH * items.length}>
                {items.map((val, index) => {
                    return (
                        <ChatContentTab key={index.toString()} tab={val}/>
                    )
                })}
            </HStack>
        </Box>
    )
}
export default observer(TabContent)