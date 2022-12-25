import {observer} from "mobx-react";
import {Box, HStack} from "native-base";
import {TouchableOpacity} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect} from "react";
import {serverLimitCheck, uploadImageToFirebase} from "../util/helper";

const AttachPicker = () => {

    // image picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result)
        if (!result.cancelled) {
            if (serverLimitCheck(result.assets), 5000) {
                return result.assets[0].uri
            }
        }
        return null;
    }
    const handleSendMedia = async () => {
        let uri = await pickImage()
        if (uri !== null) {
            let response = await uploadImageToFirebase(uri)
            console.log(response)
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