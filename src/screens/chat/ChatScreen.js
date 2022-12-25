import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, ScrollView, Text, VStack, KeyboardAvoidingView, Center} from "native-base";
import {ImageBackground, Keyboard, Platform, SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import avatar from '../../../assets/static/images/sign_bg.jpg'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../util/helper";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import ChatHeader from "../../component/ChatHeader";
import MessageView from "../../component/MessageView";
import Typer from "../../component/Typer";
import {BollingLoader} from "../../component/BollingLoader";
import SingleChatModel from "../../model/SingleChatModel";
import UserStore from "../../model/UserStore";
import AttachPicker from "../../component/AttachPicker";

const ChatScreen = ({route}) => {
    const headerHeight = 76;
    const {roomId} = route.params
    const typerDefaultHeight = 45
    const [typerHeight, setTyperHeight] = useState(typerDefaultHeight)
    const [attachShow, setAttachShow] = useState(false)
    const nav = useNavigation()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [paddingBottom, setPaddingBottom] = useState(0)
    const defaultBottomPadding = 100
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])
    useEffect(() => {
        SingleChatModel.onFetchingRoom(roomId)
    }, [roomId])

    useEffect(() => {
        console.log(UserStore.user)
    }, [UserStore.user])
    console.log(UserStore.user)
    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                {loading ?
                    <BollingLoader speed={200}></BollingLoader>
                    :
                    <Center width={SCREEN_WIDTH}>
                        <ImageBackground source={avatar} resizeMode={'cover'}
                                         style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>

                            <KeyboardAvoidingView
                                height={SCREEN_HEIGHT}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                                <ChatHeader roomId={roomId} headerHeight={headerHeight}/>
                            <MessageView bottomPadding={paddingBottom}
                                         defaultBottomPadding={defaultBottomPadding}
                                         roomId={roomId} headerHeight={headerHeight} typerHeight={typerHeight}
                                         typerDefaultHeight={typerDefaultHeight}/>
                            <Box position={'relative'}>
                                {attachShow &&
                                    <AttachPicker/>
                                }
                                <Typer
                                    attach={attachShow}
                                    setAttach={setAttachShow}
                                    setPaddingBottom={setPaddingBottom} roomId={roomId} message={message}
                                    typerDefaultHeight={typerDefaultHeight}
                                    typerHeight={typerHeight}
                                    setTyperHeight={setTyperHeight} setMessage={setMessage}></Typer>
                            </Box>
                            </KeyboardAvoidingView>
                        </ImageBackground>
                    </Center>
                }
            </NativeBaseProvider>
        </SafeAreaView>
    )
}
export default observer(ChatScreen)