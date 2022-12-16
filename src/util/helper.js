import {Dimensions} from "react-native";

export const [SCREEN_WIDTH, SCREEN_HEIGHT] = [Dimensions.get('window').width, Dimensions.get('window').height]
export const getRoomName = (nameArr) => {
    return nameArr.join(",")
}