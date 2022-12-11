import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {observer} from "mobx-react";
import HomeScreen from "../screens/home/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import RecentChatScreen from "../screens/recent_chat/RecentChatScreen";
import CallScreen from "../screens/calls/CallScreen";
import UserScreen from "../screens/user/UserScreen";
import {Platform} from "react-native";

const HomeNavigate = ({route}) => {
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
            return <Ionicons name={iconName} size={26} color={color}/>;
        },
        tabBarShowLabel: false,
        tabBarStyle: {height: Platform.OS === 'android' ? 40 : 60}
    })

    return (
        <Tab.Navigator screenOptions={tabConfigs}>
            <Tab.Screen name={'home_screen'} options={{headerShown: false}} component={HomeScreen}></Tab.Screen>
            <Tab.Screen name={'recent_screen'} options={{headerShown: false}} component={RecentChatScreen}></Tab.Screen>
            <Tab.Screen name={'call_screen'} options={{headerShown: false}} component={CallScreen}></Tab.Screen>
            <Tab.Screen name={'user_screen'} options={{headerShown: false}} component={UserScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}
export default observer(HomeNavigate);