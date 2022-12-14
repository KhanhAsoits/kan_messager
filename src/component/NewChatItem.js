import {observer} from "mobx-react";
import {BottomSheet} from "./BottomSheet";
import UserFinder from "./UserFinder";
import {HStack, Text} from "native-base";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import NewChatModel from "../model/NewChatModel";
import UserSearchStore from "../model/UserSearchStore";

const NewChatItem = ({setOpen}) => {
    const handleCreate = async () => {
        let result = await NewChatModel.handleCreateNewChat()
        if (result) {
            setOpen(false)
        }
    }
    return (
        <BottomSheet height={30} setOpen={setOpen}>
            <HStack pb={6} justifyContent={'space-between'}>
                <TouchableOpacity onPress={() => {
                    UserSearchStore.setListUserFound([])
                    setOpen(false)
                }}>
                    <Text color={'blue.400'}>Cancel</Text>
                </TouchableOpacity>
                <Text color={'black'} my={2} fontWeight={'500'}>New Chat</Text>
                <TouchableOpacity onPress={handleCreate}>
                    {NewChatModel.fetching ? <ActivityIndicator color={'black'} size={36}/>
                        : <Text color={'blue.400'}>Done</Text>
                    }
                </TouchableOpacity>
            </HStack>
            <UserFinder height={95}/>
        </BottomSheet>
    )
}

export default observer(NewChatItem)
