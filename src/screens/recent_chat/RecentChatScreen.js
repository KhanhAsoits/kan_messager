import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, Center, HStack, Image, Text, VStack} from "native-base";
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
import {useEffect} from "react";
import {Loader} from "../../component/Loader";
import {BollingLoader} from "../../component/BollingLoader";

const RecentChatScreen = ({route}) => {

    let allChatItem = {
        id: 1,
        title: 'All Chats',
        render: <AllChatTab/>
    }
    let personChatTab = {
        id: 2,
        title: 'Person',
        render: <PersonalChatTab/>
    }
    let workChatTab = {
        id: 3,
        title: 'Work',
        render: <WorkChatTab/>
    }
    let groupChatTab = {
        id: 4,
        title: 'Group',
        render: <GroupChatTab/>
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
        <NativeBaseProvider>
            <Box flex={1} px={4} bgColor={ThemeStore.baseProps.bgColor}>
                <CustomHeader/>
                <TabSwitcher items={tabItems}></TabSwitcher>
                {ChatListModel.allChatFetching ? <BollingLoader/>
                    : <TabContent items={tabItems} flex={.78}/>
                }
                <NewChatButton/>
            </Box>
        </NativeBaseProvider>

    )
}
export default observer(RecentChatScreen)