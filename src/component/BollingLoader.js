import {Animated, StyleSheet} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../util/helper";
import {useEffect, useRef} from "react";

export const BollingLoader = ({speed = 200}) => {
    let bollOne = useRef(new Animated.Value(0)).current
    let bollTwo = useRef(new Animated.Value(0)).current
    let bollThree = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                    Animated.timing(bollOne, {
                        toValue: 1,
                        duration: speed,
                        useNativeDriver: true
                    }),
                    Animated.timing(bollTwo, {
                        toValue: 1,
                        duration: speed,
                        useNativeDriver: true
                    }),
                    Animated.timing(bollThree, {
                        toValue: 1,
                        duration: speed,
                        useNativeDriver: true
                    }),
                ]
            )
        ).start()
    }, [bollOne, bollTwo, bollThree])

    const bollOneInterpolate = bollOne.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 8]
    })

    const bollTwoInterpolate = bollTwo.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 8]
    })

    const bollThreeInterpolate = bollThree.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 8]
    })

    return (
        <Animated.View style={styles.loaderContainer}>
            <Animated.View
                style={{
                    ...styles.boll,
                    transform: [{scale: bollOneInterpolate}],
                }}></Animated.View>
            <Animated.View
                style={{
                    ...styles.boll,
                    transform: [{scale: bollTwoInterpolate}],
                }}></Animated.View>
            <Animated.View
                style={{
                    ...styles.boll,
                    transform: [{scale: bollThreeInterpolate}],
                }}></Animated.View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    loaderContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 99,
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    boll: {
        marginHorizontal: 9,
        width: 1,
        height: 1,
        backgroundColor: 'black',
        borderRadius: 100
    }
})