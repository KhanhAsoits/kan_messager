import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const AllChatTab = () => {
    return (
        <ChatGenerator chats={ChatListModel.allChat}></ChatGenerator>
    )
}
export default observer(AllChatTab)