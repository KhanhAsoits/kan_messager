import {observer} from "mobx-react";
import {Box, HStack, Text} from "native-base";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../util/helper";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useEffect, useRef, useState} from "react";
import {Alert, Animated, TouchableOpacity, StyleSheet, View} from "react-native";

const NewChatItem = ({setOpen}) => {
    const [hasChange, setHasChange] = useState(false)
    const [hide, setHide] = useState(false)
    const childRef = useRef()
    const slideAnimRef = useRef(new Animated.Value(0)).current
    const slideDownAnimRef = useRef(new Animated.Value(0)).current

    const [modalDynamicHeight, setModalDynamicHeight] = useState(0)
    const [isDrag, setIsDrag] = useState(false)

    const bottomTabHeight = useBottomTabBarHeight()
    const modalHeight = SCREEN_HEIGHT - useBottomTabBarHeight() - 150
    let interpolateSlide = slideAnimRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, modalHeight]
    })
    let interpolateDown = slideDownAnimRef.interpolate({
        inputRange: [0, 1],
        outputRange: [isDrag ? modalDynamicHeight : modalHeight, 0]
    })

    const SlideAnimated = () => {
        Animated.timing(slideAnimRef, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false
        }).start()
    }
    const SlideDown = () => {
        Animated.timing(slideDownAnimRef, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false
        }).start()
    }
    const handleClose = () => {
        setHide(true)
        SlideDown()
        setTimeout(() => {
            setHide(false)
            setIsDrag(false)
            setOpen(false)
        }, 410)
    }

    const handleDone = () => {

    }

    const handleClick = () => {
        hasChange ? handleDone() : handleClose()
    }

    const handleTouchStart = () => {
        setIsDrag(true)
    }
    const handleTouchEnd = () => {
        if (modalDynamicHeight < 50) {
            setIsDrag(false)
        }
    }

    const handleTouchMove = (e) => {
        if (isDrag) {
            setModalDynamicHeight(SCREEN_HEIGHT - bottomTabHeight - e.nativeEvent.pageY)
        }
    }

    const handleContainerTouch = (e) => {
        if (e.nativeEvent.target >= childRef.current?._nativeTag) {
            if (!hasChange) {
                handleClose()
            } else {
                Alert.alert("Discard Change", "Do you want discard?", [
                    {
                        style: 'default', text: 'No', onPress: () => {
                        }
                    },
                    {
                        style: "destructive", text: 'Discard', onPress: () => {
                            setOpen(false)
                        }
                    }
                ])
            }
        }
    }


    useEffect(() => {
    }, [isDrag])
    useEffect(() => {
    }, [hide])
    useEffect(() => {
    }, [slideAnimRef])
    useEffect(() => {
        if (isDrag) {
            if (modalDynamicHeight < 50) {
                setHide(false)
                setOpen(false)
            }
            if (modalDynamicHeight > modalHeight) {
                setIsDrag(false)
            }
        }
    }, [modalDynamicHeight])
    useEffect(() => {
        SlideAnimated()
    }, [])


    return (
        <Box bgColor={'transparent'} ref={childRef} onTouchStart={handleContainerTouch} position={"absolute"} top={0}
             left={0}
             zIndex={99}
             width={SCREEN_WIDTH}
             height={SCREEN_HEIGHT - useBottomTabBarHeight()} borderRightRadius={8} justifyContent={'flex-end'}
             alignItems={'center'}>
            <Animated.View style={{maxHeight: isDrag ? modalDynamicHeight : hide ? interpolateDown : interpolateSlide}}>
                <Box width={SCREEN_WIDTH}
                     px={4}
                     height={'100%'}
                     borderRadius={26}
                     bgColor={'white'}
                     shadow={9}>
                    <HStack position={'relative'} justifyContent={'space-between'} py={3} px={1} alignItems={'center'}>
                        <Text px={10}></Text>
                        <View
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                ...StyleSheet.absoluteFillObject,
                                top: -20
                            }}>

                            <Box width={6} height={2}
                                 bgColor={'gray.300'} borderRadius={100}></Box>
                        </View>
                        <TouchableOpacity activeOpacity={.8} onPress={handleClick}>
                            <Text color={'blue.500'} fontSize={16}
                                  fontWeight={'500'}>{hasChange ? 'Done' : 'Close'}</Text>
                        </TouchableOpacity>
                    </HStack>
                </Box>
            </Animated.View>
        </Box>
    )
}

export default observer(NewChatItem)
//160 line cho 1 cai bottom sheet tu viet vi dung lib  cham vkl