import {observer} from "mobx-react";
import {TouchableOpacity} from "react-native";
import {Box, Text} from "native-base";
import ThemeStore from "../model/ThemeStore";
import TabModel from "../model/TabModel";

const SwitchButton = ({item}) => {
    const handleSwitch = () => {
        TabModel.setActiveTab(item.id)
    }
    const active = TabModel.activeTab === item.id
    return (
        <TouchableOpacity onPress={handleSwitch} activeOpacity={.8}>
            <Box px={3} py={2} bgColor={active ? 'blue.400' : 'white'} shadow={1} borderRadius={8}>
                <Text fontSize={12} color={active ? 'white' : ThemeStore.baseProps.textColor}>{item.title}</Text>
            </Box>
        </TouchableOpacity>
    )
}
export default observer(SwitchButton)