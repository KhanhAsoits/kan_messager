import {observer} from "mobx-react";
import {Box, Center, HStack, KeyboardAvoidingView} from "native-base";
import {SCREEN_WIDTH} from "../util/helper";
import {Keyboard, TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SingleChatModel from "../model/SingleChatModel";
import {Message} from "../../types";
import {MessageBody} from "../../types";
import {useEffect} from "react";
import UserStore from "../model/UserStore";

const Typer = ({
                   roomId,
                   typerHeight,
                   typerDefaultHeight,
                   setTyperHeight,
                   message,
                   setMessage,
                   setPaddingBottom,
                   paddingBottom
               }) => {
    const handleSendMessage = () => {
        if (message !== "") {
            setMessage("")
            setTimeout(() => {
                const message_ = new MessageBody("text", message, [])
                SingleChatModel.onSendMessage(message_, roomId)
            }, 50)
        }
    }
    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardWillShow", () => {
            setPaddingBottom(350)
        })
        const keyboardHideListener = Keyboard.addListener("keyboardWillHide", () => {
            setPaddingBottom(100)
        })
        return () => {
            keyboardShowListener.remove()
            keyboardHideListener.remove()
        }
    }, [])
    return (
        <KeyboardAvoidingView
            style={{maxHeight: 160}}
            h={Math.max(typerDefaultHeight, typerHeight) + (100 - typerDefaultHeight)}
            borderTopWidth={1}
            borderTopColor={'gray.200'}
            position={'absolute'}
            bottom={0}
            width={SCREEN_WIDTH}
            behavior={'position'}
        >
            <Center bgColor={'white'} height={'100%'} style={{maxHeight: 200}} alignItems={'center'}
                    justifyContent={'center'}>
                {/*    chat typer*/}
                <HStack flexWrap={'wrap'} style={{maxHeight: 120, height: Math.max(typerDefaultHeight, typerHeight)}}
                        bgColor={'white'}
                        py={0}
                        my={0}
                        width={SCREEN_WIDTH} px={3}
                        space={2}
                        alignItems={typerHeight > typerDefaultHeight ? 'flex-end' : 'center'}
                        justifyContent={'space-between'}>
                    <TouchableOpacity>
                        <Ionicons name={'happy-outline'} size={30} color={'rgba(0,0,0,0.3)'}/>
                    </TouchableOpacity>
                    <Box style={{
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        paddingHorizontal: 12,
                        paddingTop: 9,
                        paddingBottom: 9,
                        width: "60%",
                        height: "100%",
                        borderRadius: 20,
                    }}>
                        <TextInput
                            value={message}
                            multiline={true}
                            textAlignVertical={'center'}
                            onContentSizeChange={(e) => {
                                const contentHeight = e.nativeEvent.contentSize.height
                                setTyperHeight(contentHeight)
                            }}
                            onChangeText={text => setMessage(text)}
                            style={{
                                width: '100%',
                                maxHeight: 120,
                                height: '100%',
                            }}
                            placeholder={'Write a message...'}
                        />
                    </Box>
                    <TouchableOpacity>
                        <Ionicons name={'attach-outline'} size={33} color={'rgba(0,0,0,0.3)'}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={handleSendMessage} style={{
                        backgroundColor: '#2F80ED',
                        paddingVertical: 12,
                        paddingHorizontal: 13,
                        borderRadius: 100
                    }}>
                        <Ionicons name={message.trim().length === 0 ? 'mic' : 'navigate'} size={20}
                                  color={'white'}/>
                    </TouchableOpacity>
                </HStack>
                {/*    end typer*/}
            </Center>
        </KeyboardAvoidingView>
    )
}
export default observer(Typer)