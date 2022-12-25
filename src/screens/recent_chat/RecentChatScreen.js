import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Button} from "native-base";
import {observer} from "mobx-react";
import ThemeStore from "../../model/ThemeStore";
import TabSwitcher from "../../component/TabSwitcher";
import CustomHeader from "../../component/CustomHeader";
import TabContent from "../../component/TabContent";
import AllChatTab from "./AllChatTab";
import WorkChatTab from "./WorkChatTab";
import GroupChatTab from "./GroupChatTab";
import PersonalChatTab from "./PersonalChatTab";
import ChatListModel from "../../model/ChatListModel";
import NewChatButton from "../../component/NewChatButton";
import {useEffect, useState} from "react";
import {BollingLoader} from "../../component/BollingLoader";
import {SafeAreaView} from "react-native";
import NewChatItem from "../../component/NewChatItem";
import NewChatModel from "../../model/NewChatModel";
import NavModel from "../../model/NavModel";

const RecentChatScreen = ({appNav, route}) => {
    //state
    const [newChatModal, setNewChatModal] = useState(false)
    useEffect(() => {
        NewChatModel.setUserSelected([])
    }, [newChatModal])
    //static data
    let allChatItem = {
        id: 1,
        title: 'All Chats',
        render: <AllChatTab appNav={appNav}/>
    }
    let personChatTab = {
        id: 2,
        title: 'Person',
        render: <PersonalChatTab appNav={appNav}/>
    }
    let workChatTab = {
        id: 3,
        title: 'Work',
        render: <WorkChatTab appNav={appNav}/>
    }
    let groupChatTab = {
        id: 4,
        title: 'Group',
        render: <GroupChatTab appNav={appNav}/>
    }
    const tabItems = [
        allChatItem,
        personChatTab,
        workChatTab,
        groupChatTab
    ]

    useEffect(() => {
        const bsSync = async () => {
            await ChatListModel.onGetAllChatById()
        }
        if (ChatListModel.allChat.length <= 0) {
            bsSync()
        }
    }, [])
    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <Box flex={1} px={4} bgColor={ThemeStore.baseProps.bgColor}>
                    <CustomHeader/>
                    <TabSwitcher items={tabItems}></TabSwitcher>
                    {ChatListModel.allChatFetching ? <BollingLoader/>
                        : <TabContent items={tabItems} flex={.78}/>
                    }
                    <NewChatButton handleClick={setNewChatModal}/>
                    {newChatModal && <NewChatItem setOpen={setNewChatModal}/>}
                </Box>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}
export default observer(RecentChatScreen)