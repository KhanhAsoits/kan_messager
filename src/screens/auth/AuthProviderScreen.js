import {observer} from "mobx-react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const AuthProviderScreen = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name={'sign_in'} options={{headerShown: false}}
                          component={SignInScreen}></Stack.Screen>
            <Stack.Screen name={'sign_up'} options={{headerShown:false}} component={SignUpScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}
export default observer(AuthProviderScreen)