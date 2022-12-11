import {Box, Center, Text} from "native-base";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../util/helper";
import {Animated} from "react-native";
import {useEffect, useRef} from "react";

export const Loader = ({fullScreen, height}) => {

    const aniRef = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(Animated.timing(aniRef, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        })).start()
    }, [aniRef])

    const interpolator = aniRef.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <Center w={SCREEN_WIDTH} h={SCREEN_HEIGHT} bgColor={'rgba(0,0,0,.2)'} zIndex={99} top={0} left={0}
                position={'absolute'}>
            <Animated.View style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                borderColor: 'white',
                borderWidth: 2,
                borderStyle: 'dashed',
                transform: [{rotate: interpolator}]
            }}>

            </Animated.View>
        </Center>
    )
}
