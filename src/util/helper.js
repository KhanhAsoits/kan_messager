import {Dimensions} from "react-native";

export const [SCREEN_WIDTH, SCREEN_HEIGHT] = [Dimensions.get('window').width, Dimensions.get('window').height]
export const getRoomName = (nameArr, separator = ",") => {
    return nameArr.join(separator)
}
export const getChatName = (currentName,nameArr,separator = ",")=>{
    if (nameArr.length > 2){
        return getRoomName(nameArr,",")
    }else {
        return nameArr.filter((name)=>{return name !== currentName}).join(separator)
    }
}
export const getUpdateDate = (date, separator) => {
    return (
        new Date(date).getHours() + separator + new Date(date).getMinutes()
    )
}
export const getChildOfObject = (sns) => {
    const children = []

    sns.forEach((val) => {
        children.push(val)
    })
    return children;
}