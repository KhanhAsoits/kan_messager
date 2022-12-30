import {observer} from "mobx-react";
import {Box, HStack, Text} from "native-base";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Animated, TouchableOpacity} from "react-native";

const Recorder = ({setCancel}) => {
    const [counter, setCounter] = useState("0:00")
    const scaleAniRef = useRef(new Animated.Value(0)).current
    let totalTime = 0
    const pad = (time) => {
        let minute = 0;
        let second = 0;
        second = time % 60;
        minute = Math.floor(time / 60);
        if (second.toString().length < 2) {
            second = "0" + second
        }
        return minute + ":" + second
    }
    useLayoutEffect(() => {
        const timeCounter = setInterval(() => {
            ++totalTime
            setCounter(pad(totalTime))
        }, 1000)
        return () => {
            clearInterval(timeCounter)
        }
    }, [])
    useLayoutEffect(() => {
        Animated.loop(Animated.timing(scaleAniRef, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        })).start()
    }, [scaleAniRef])

    const scaleInterpolate = scaleAniRef.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2],
    })

    return (
        <TouchableOpacity activeOpacity={1} onLongPress={(e) => {
            setCancel(true)
        }} delayLongPress={1000}>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
                <HStack justifyContent={'flex-start'} space={2}>
                    {new Array(17).fill(1).map((val, index) => {
                        return (
                            <Animated.View key={index.toString()} style={{
                                width: 4,
                                height: 6,
                                borderRadius: 1,
                                backgroundColor: "white",
                                transform: [{scaleY: scaleInterpolate}]
                            }}>
                            </Animated.View>
                        )
                    })}
                </HStack>
                <Box>
                    <Text color={'white'} fontSize={14} fontWeight={'600'}>{counter}</Text>
                </Box>
            </HStack>
        </TouchableOpacity>
    )
}
export default observer(Recorder
)