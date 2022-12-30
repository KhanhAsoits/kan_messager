import {observer} from "mobx-react";
import {Box, HStack} from "native-base";
import {Alert, TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import Ionicons from "react-native-vector-icons/Ionicons";
import {serverLimitCheck, uploadImageToFirebase} from "../util/helper";
import SingleChatModel from "../model/SingleChatModel";

const AttachPicker = ({setAttachShow}) => {

    // image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result.assets[0])
        if (!result.canceled) {
            if (serverLimitCheck(result.assets, 2000000)) {
                return result.assets[0].uri
            } else {
                Alert.alert("Warning", "file size larger than 5MB.")
            }
        }
        return null;
    }
    const handleSendMedia = async () => {
        let uri = await pickImage()
        if (uri !== null) {
            let messageId = SingleChatModel.onSendMediaMessage(uri);
            // before uploaded we append it to message view and set state is uploading
            let response = await uploadImageToFirebase(uri)
            //     if response is a download url we will update on database
            if (response || response !== null) {
                SingleChatModel.onSaveMediaMessage(response)
            } else {
                SingleChatModel.removeErrorMessage(messageId)
                Alert.alert("Error", 'Something wrong when sent image , please try again.')
            }
            setAttachShow(false)
        }
    }

    return (
        <Box borderRadius={8} shadow={1} position={'absolute'} bottom={81} bgColor={'white'}
             alignSelf={"center"}>
            <HStack py={2} px={3} space={3}>
                <TouchableOpacity>
                    <Ionicons name={'document-outline'} color={'gray'} size={36}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendMedia}>
                    <Ionicons name={'image-outline'} color={'gray'} size={36}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name={'mic-outline'} color={'gray'} size={36}/>
                </TouchableOpacity>
            </HStack>
        </Box>
    )
}
export default observer(AttachPicker)