import {Dimensions} from "react-native";
import {getStorage, getDownloadURL, uploadBytes, ref} from 'firebase/storage'
import {firebaseApp} from "../../configs/firebase_config";

export const [SCREEN_WIDTH, SCREEN_HEIGHT] = [Dimensions.get('window').width, Dimensions.get('window').height]
export const getRoomName = (nameArr, separator = ",") => {
    return nameArr.join(separator)
}
export const getChatName = (currentName, nameArr, separator = ",") => {
    if (nameArr.length > 2) {
        return getRoomName(nameArr, ",")
    } else {
        return nameArr.filter((name) => {
            return name !== currentName
        }).join(separator)
    }
}
export const checkHasOneDay = (prevTime) => {
    const preTime = new Date(prevTime).getDate()
    const curTime = new Date().getDate();
    return curTime - preTime >= 1
}
export const checkDateExit = (dates, curDate) => {
    const ref = dates.filter((date) => date === curDate)
    return ref.length === 0
}
export const uploadImageToFirebase = async (fileUri) => {
    try {
        const response = await fetch(fileUri)
        const blob = await response.blob()
        const filename = fileUri.substring(fileUri.lastIndexOf("/") + 1)
        const storage = getStorage(firebaseApp)
        const storageRef = ref(storage, filename)
        return uploadBytes(storageRef, blob).then((sns) => {
            return getDownloadURL(sns.ref).then((downloadUrl) => {
                return downloadUrl
            })
        })
    } catch (e) {
        return false
    }
}
export const serverLimitCheck = (files, limit) => {
    for (let file of files) {
        if (file?.size > limit) {
            return false
        }
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