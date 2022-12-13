import {useEffect} from "react";
import {observer} from "mobx-react";
import AuthStore from "../model/AuthStore";
import AuthProviderScreen from "./auth/AuthProviderScreen";
import {NavigationContainer} from "@react-navigation/native";
import UserStore from "../model/UserStore";
import HomeNavigate from "../common/HomeNavigate";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainScreen = () => {

    useEffect(() => {
        console.log('login app :', AuthStore.isLogin)
    }, [AuthStore.isLogin])

    useEffect(() => {
        const autoLogin = async () => {
            const id = await AsyncStorage.getItem("@authorize_user_id")
            console.log('login with user id :', id)
            if (id !== null && id !== undefined && id.trim().length > 0) {
                await AuthStore.autoSignIn(id)
            }
        }
        autoLogin()
    }, [])

    useEffect(() => {
        const setAutoLogin = async () => {
            await AsyncStorage.setItem('@authorize_user_id', UserStore.user.id)
        }
        if (UserStore.user.email) {
            setAutoLogin()
            AuthStore.setLogin(true)
        }
    }, [UserStore.user])
    return (
        <NavigationContainer>
            {AuthStore.isLogin ?
                <HomeNavigate/>
                :
                <AuthProviderScreen/>
            }
        </NavigationContainer>
    )
}
export default observer(MainScreen)