import {Provider} from "mobx-react";
import MainScreen from "./src/screens/MainScreen";
import {LogBox} from "react-native";

export default function App() {
    LogBox.ignoreAllLogs()
    return (
        <MainScreen/>
    )
}

