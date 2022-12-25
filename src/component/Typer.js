import {observer} from "mobx-react";
import {Box, Center, HStack, KeyboardAvoidingView} from "native-base";
import {Keyboard, TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SingleChatModel from "../model/SingleChatModel";
import {MessageBody} from "../../types";
import {useEffect, useState} from "react";

const Typer = ({
                   roomId,
                   setAttach,
                   attach,
               }) => {
    const [message, setMessage] = useState("")

    const handleSendMessage = () => {
        if (message !== "") {
            setMessage("")
            setTimeout(() => {
                const message_ = new MessageBody("text", message, [])
                SingleChatModel.onSendMessage(message_, roomId)
            }, 50)
        }
    }

    return (
        <Box style={{height: 66}} justifyContent={'center'}
             bgColor={'white'} borderTopWidth={.2} borderTopColor={"rgba(0,0,0,0.2)"}>
            <HStack px={3} justifyContent={'space-between'} alignItems={'center'}>
                <TouchableOpacity>
                    <Ionicons name={'happy-outline'} color={'rgba(0,0,0,0.3)'} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    setAttach(!attach)
                }}>
                    <Ionicons name={'attach-outline'} color={attach ? "#2f80ed" : 'rgba(0,0,0,0.3)'} size={30}/>
                </TouchableOpacity>
                <Box style={{
                    width: "66%",
                    backgroundColor: "rgba(0,0,0,0.06)",
                    borderRadius: 6,
                    maxHeight: 200,
                    paddingVertical:8,
                    paddingHorizontal: 8,
                    justifyContent: 'center',
                    paddingBottom:12,
                    minHeight: 45,
                }}>
                    <TextInput
                        multiline={true}
                        onChangeText={text => setMessage(text)}
                        value={message}
                        placeholder={'Type some message..'}
                        placeholderTextColor={'rgba(0,0,0,0.4)'}
                        style={{
                            fontSize: 14,
                            width: "100%"
                        }}
                    />
                </Box>
                <TouchableOpacity activeOpacity={.9} onPress={handleSendMessage} style={{
                    backgroundColor: "#2f80ed",
                    padding: 8,
                    borderRadius: 12
                }}>
                    <Ionicons name={message !== "" ? 'navigate-outline' : "mic-outline"} color={'white'} size={26}/>
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}
export default observer(Typer)