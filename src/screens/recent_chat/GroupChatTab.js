import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const GroupChatTab = () => {
    return (
        <ChatGenerator chats={ChatListModel.groups}></ChatGenerator>
    )
}
export default observer(GroupChatTab)