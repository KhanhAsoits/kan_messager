import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {observer} from "mobx-react";
import HomeScreen from "../screens/home/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import RecentChatScreen from "../screens/recent_chat/RecentChatScreen";
import CallScreen from "../screens/calls/CallScreen";
import UserScreen from "../screens/user/UserScreen";
import {Platform} from "react-native";
import ThemeStore from "../model/ThemeStore";
import ChatScreen from "../screens/chat/ChatScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllScreen from "./AllScreen";

const HomeNavigate = ({route}) => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name={'all_screen'} options={{headerShown: false}} component={AllScreen}></Stack.Screen>
            <Stack.Screen name={'chat_screen'} options={{headerShown: false}} component={ChatScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default observer(HomeNavigate);