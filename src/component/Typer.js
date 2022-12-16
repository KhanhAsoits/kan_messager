import {observer} from "mobx-react";
import {Center, HStack, KeyboardAvoidingView} from "native-base";
import {SCREEN_WIDTH} from "../util/helper";
import {TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Typer = ({typerHeight, typerDefaultHeight, setTyperHeight, message, setMessage}) => {
    return (
        <KeyboardAvoidingView
            style={{maxHeight: 200}}
            h={(typerHeight || typerDefaultHeight) + (100 - typerDefaultHeight)}
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
                <HStack flexWrap={'wrap'} style={{maxHeight: 150, height: (typerHeight || typerDefaultHeight)}}
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
                    <TextInput
                        value={message}
                        multiline={true}
                        numberOfLines={1}
                        textAlignVertical={'bottom'}
                        onContentSizeChange={(e) => {
                            const contentHeight = e.nativeEvent.contentSize.height
                            let oneLineHeight = 17
                            let lines = Math.round(contentHeight / oneLineHeight)
                            if (lines > 1) {
                                console.log(contentHeight)
                                let height = Math.round(contentHeight) + 20
                                if (height > typerDefaultHeight) {
                                    setTyperHeight(height)
                                } else {
                                    setTyperHeight(typerDefaultHeight)
                                }
                            } else {
                                setTyperHeight(typerDefaultHeight)
                            }
                        }}
                        onChangeText={text => setMessage(text)}
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.04)',
                            paddingHorizontal: 12,
                            borderRadius: 20,
                            paddingTop: 14,
                            width: '60%',
                            maxHeight: 150,
                            height: '100%',
                        }}
                        placeholder={'Write a message...'}
                    />
                    <TouchableOpacity>
                        <Ionicons name={'attach-outline'} size={33} color={'rgba(0,0,0,0.3)'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
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