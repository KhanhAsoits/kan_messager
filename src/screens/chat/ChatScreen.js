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

const ChatScreen = () => {
    const headerHeight = 76;
    const typerDefaultHeight = 45
    const [typerHeight, setTyperHeight] = useState(typerDefaultHeight)
    const [inlineText, setInlineText] = useState(false)
    const nav = useNavigation()
    const [message, setMessage] = useState('')
    const handleBack = () => {
        nav.goBack()
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Center width={SCREEN_WIDTH}>
                    {/*    header */}
                    <HStack borderBottomWidth={1} borderBottomColor={'gray.200'} height={headerHeight}
                            backgroundColor={'white'} shadow={1} px={3}
                            justifyContent={'space-between'}
                            alignItems={'center'} space={6}
                            py={2}>
                        <TouchableOpacity onPress={handleBack} style={{width: '6%'}}>
                            <Ionicons name={'arrow-back'} size={33} color={'rgba(0,0,0,0.5)'}>
                            </Ionicons>
                        </TouchableOpacity>
                        <HStack space={6} alignItems={'center'} justifyContent={'center'}>
                            <Image alt={'chat thumnail'} source={avatar} width={50} height={50}
                                   borderRadius={100}></Image>
                            <VStack>
                                <Text fontSize={19} fontWeight={'600'}>Fullsnak Designer</Text>
                                <Text fontSize={13} fontWeight={'300'}>7 online from 12 people</Text>
                            </VStack>
                            <TouchableOpacity>
                                <Ionicons name={'videocam'} color={'rgba(0,0,0,0.5)'} size={33}></Ionicons>
                            </TouchableOpacity>
                        </HStack>

                        <TouchableOpacity>
                            <Ionicons name={'ellipsis-vertical'} color={'rgba(0,0,0,0.5)'} size={26}></Ionicons>
                        </TouchableOpacity>
                    </HStack>
                    {/*end header*/}

                    <Box onTouchStart={() => {
                        setInlineText(true)
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
                </Center>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}
export default observer(ChatScreen)