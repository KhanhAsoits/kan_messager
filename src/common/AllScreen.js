import {observer} from "mobx-react";
import HomeScreen from "../screens/home/HomeScreen";
import RecentChatScreen from "../screens/recent_chat/RecentChatScreen";
import CallScreen from "../screens/calls/CallScreen";
import UserScreen from "../screens/user/UserScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Platform} from "react-native";
import ThemeStore from "../model/ThemeStore";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import NavModel from "../model/NavModel";

const AllScreen = () => {
    const appNav = useNavigation()
    const Tab = createBottomTabNavigator()
    const tabConfigs = ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
                case "home_screen":
                    iconName = focused ? "chatbubble" : "chatbubble-outline"
                    break;
                case "recent_screen":
                    iconName = focused ? "time" : "time-outline"
                    break;
                case "call_screen":
                    iconName = focused ? "call" : "call-outline"
                    break;
                case "user_screen":
                    iconName = focused ? "person-circle" : "person-circle-outline"
                    break;
            }
            if (iconName) {
                return <Ionicons name={iconName} size={26} color={color}/>;
            }
        },
        tabBarShowLabel: false,
        tabBarStyle: {height: Platform.OS === 'android' ? 40 : 60, borderTopColor: ThemeStore.tabBorderTopColor}
    })
    return (
        <Tab.Navigator screenOptions={tabConfigs}>
            <Tab.Screen name={'home_screen'} options={{headerShown: false}} component={HomeScreen}></Tab.Screen>
            <Tab.Screen name={'recent_screen'} options={{headerShown: false}}>
                {props => <RecentChatScreen appNav={appNav} {...props}/>}
            </Tab.Screen>
            <Tab.Screen name={'call_screen'} options={{headerShown: false}} component={CallScreen}></Tab.Screen>
            <Tab.Screen name={'user_screen'} options={{headerShown: false}} component={UserScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}
export default observer(AllScreen)