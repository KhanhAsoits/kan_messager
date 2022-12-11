import {observer} from "mobx-react";
import {Box, HStack, ScrollView, Text} from "native-base";
import {TouchableOpacity} from "react-native";
import ThemeStore from "../model/ThemeStore";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'
import SwitchButton from "./SwitchButton";

const TabSwitcher = ({items}) => {
    const handleSwitch = () => {

    }
    return (
        <HStack justifyContent={'space-between'} alignItems={'center'} flex={.1}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <HStack justifyContent={'flex-start'} py={2} alignItems={'center'} space={2}>
                    {items.map((val, index) => {
                        return (
                            <SwitchButton key={UUID()} item={val}/>
                        )
                    })}
                </HStack>
            </ScrollView>
        </HStack>
    )
}

export default observer(TabSwitcher)