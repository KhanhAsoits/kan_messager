import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, ScrollView, Text, VStack, KeyboardAvoidingView, Center} from "native-base";
import {Keyboard, Platform, SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import avatar from '../../../assets/static/images/user.jpg'
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../util/helper";
import {Message} from "../../component/Message";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import ChatHeader from "../../component/ChatHeader";
import MessageView from "../../component/MessageView";
import Typer from "../../component/Typer";

const ChatScreen = () => {
    const headerHeight = 76;
    const typerDefaultHeight = 45
    const [typerHeight, setTyperHeight] = useState(typerDefaultHeight)
    const nav = useNavigation()
    const [message, setMessage] = useState('')

    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Center width={SCREEN_WIDTH}>
                    <ChatHeader headerHeight={headerHeight}/>
                    <MessageView headerHeight={headerHeight} typerHeight={typerHeight}
                                 typerDefaultHeight={typerDefaultHeight}/>
                    <Typer message={message} typerDefaultHeight={typerDefaultHeight} typerHeight={typerHeight}
                           setTyperHeight={setTyperHeight} setMessage={setMessage}></Typer>
                </Center>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}
export default observer(ChatScreen)