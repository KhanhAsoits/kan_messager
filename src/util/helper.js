import {Dimensions} from "react-native";
import {getStorage, getDownloadURL, uploadBytesResumable, ref} from 'firebase/storage'
import {firebaseApp} from "../../configs/firebase_config";
import 'react-native-get-random-values'
import {v4 as UUID} from 'uuid'

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
        const img = await fetch(fileUri)
        const blob = await img.blob()
        const storage = getStorage(firebaseApp)
        const fileName = UUID() + ".png"
        const fileRef = ref(storage, fileName);
        const uploadTask = await uploadBytesResumable(fileRef, blob);
        const url = await getDownloadURL(fileRef)
        return url;
    } catch (e) {
        console.log(e)
        return false
    }
}
export const serverLimitCheck = (files, limit) => {
    for (let file of files) {
        if (file?.fileSize > limit) {
            return false
        }
    }
    return true
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