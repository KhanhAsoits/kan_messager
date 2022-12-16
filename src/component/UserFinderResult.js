import {Box, HStack, Image, ScrollView, Text, VStack} from "native-base";
import {SCREEN_HEIGHT} from "../util/helper";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import UserSearchStore from "../model/UserSearchStore";
import {ActivityIndicator, TouchableOpacity} from "react-native";
import avat from "../../assets/static/images/user.jpg";
import {observer} from "mobx-react";
import {useEffect, useLayoutEffect} from "react";
import NewChatModel from "../model/NewChatModel";
import UserItem from "./UserItem";
import avatar from "../../assets/static/images/user.jpg";
import UserStore from "../model/UserStore";

const UserFinderResult = ({height, selectListHeight}) => {

    useLayoutEffect(() => {
    }, [UserSearchStore.onFetching])


    return (
        <Box px={1} height={SCREEN_HEIGHT - useBottomTabBarHeight() - height - selectListHeight}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {UserSearchStore.onFetching ? <ActivityIndicator color={'black'} size={26}/> :
                    <VStack space={3}>
                        {
                            UserSearchStore.listUserFound.map((val, index) => {
                                return (
                                    <Box key={index.toString()}>
                                        {console.log(UserStore.user.id)}
                                        {console.log(val.id)}
                                        {UserStore.user.id !== val.id &&
                                            <UserItem user={val} index={index}/>
                                        }
                                    </Box>
                                )
                            })
                        }
                    </VStack>
                }
            </ScrollView>
        </Box>
    )
}
export default observer(UserFinderResult)