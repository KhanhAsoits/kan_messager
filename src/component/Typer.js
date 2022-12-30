import {observer} from "mobx-react";
import {Box, HStack, Text} from "native-base";
import {TextInput, TouchableOpacity, Vibration} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SingleChatModel from "../model/SingleChatModel";
import {MessageBody} from "../../types";
import {useLayoutEffect, useState} from "react";
import Recorder from "./Recorder";
import {SCREEN_WIDTH} from "../util/helper";
import {Audio} from 'expo-av'

const Typer = ({
                   roomId,
                   setAttach,
                   attach,
               }) => {
    const [message, setMessage] = useState("")
    const [showRecorder, setShowRecorder] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [guide, setGuide] = useState("Press and hold on recorder bar to cancel.")
    const [recording, setRecording] = useState(null)
    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setMessage("")
            setTimeout(() => {
                const message_ = new MessageBody("text", message.trim(), null)
                SingleChatModel.onSendMessage(message_, roomId)
            }, 50)
        }
    }
    const handleSendAudioMessage = async () => {
        console.log('stop')
        setRecording(undefined)
        await recording.stopAndUnloadAsync()
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        await SingleChatModel.onSyncAudioMessage(uri)
    }
    const startRecord = async () => {
        try {
            // get permission
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
            })
            //     recording
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
            setRecording(recording)
        } catch (e) {
            console.log(e)
        }
    }

    useLayoutEffect(() => {
        if (cancel) {
            Vibration.vibrate()
            setShowRecorder(false)
        }
    }, [cancel])
    useLayoutEffect(() => {
        if (showRecorder) {

        }
    }, [showRecorder])
    // get sound


    // end get sound
    return (
        <Box style={{height: 66}} justifyContent={'center'}
             bgColor={'white'} borderTopWidth={.2} borderTopColor={"rgba(0,0,0,0.2)"}>
            {/*guide*/}
            {showRecorder &&
                <Text position={'absolute'} top={-20} width={SCREEN_WIDTH} fontSize={12} textAlign={'center'}
                      color={'gray.400'}>{guide}</Text>
            }
            {/*end guide */}
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
                    backgroundColor: showRecorder ? '#2f80ed' : "rgba(0,0,0,0.06)",
                    borderRadius: 6,
                    maxHeight: 200,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    justifyContent: 'center',
                    paddingBottom: 12,
                    minHeight: 45,
                }}>
                    {showRecorder ?
                        <Recorder setCancel={setCancel}/> :
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
                    }
                </Box>
                <TouchableOpacity
                    onLongPress={(e) => {
                        setCancel(false)
                        setShowRecorder(true)
                        Vibration.vibrate()
                    }}
                    delayLongPress={1000}
                    activeOpacity={1}
                    onPress={handleSendMessage} style={{
                    backgroundColor: "#2f80ed",
                    padding: 8,
                    borderRadius: 12
                }}
                >
                    {showRecorder ?
                        <Ionicons name={'navigate-outline'} color={'white'} size={26}/>
                        :
                        <Ionicons name={message !== "" ? 'navigate-outline' : "mic-outline"} color={'white'} size={26}/>
                    }
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}
export default observer(Typer)