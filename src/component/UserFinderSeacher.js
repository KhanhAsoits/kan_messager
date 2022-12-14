import {observer} from "mobx-react";
import {TextInput} from "react-native";
import UserSearchStore from "../model/UserSearchStore";
import Ionicons from "react-native-vector-icons/Ionicons";
import {HStack} from "native-base";

const UserFinderSearcher = () => {

    return (
        <HStack justifyContent={'space-between'}
                alignItems={'center'}
                px={3} bgColor={'blueGray.100'}
                py={2}
                borderRadius={8}
        >
            <TextInput
                onChangeText={text => UserSearchStore.setQuery(text)}
                autoFocus={true}
                placeholderTextColor={"rgba(0,0,0,0.3)"}
                placeholder={'Type someone name or phone to find.'}
                style={{
                    color: 'rgba(0,0,0,0.5)',
                    width: '90%',
                }}
            />
            <Ionicons name={'search'} size={24} color={'rgba(0,0,0,0.3)'}></Ionicons>
        </HStack>
    )

}
export default observer(UserFinderSearcher)