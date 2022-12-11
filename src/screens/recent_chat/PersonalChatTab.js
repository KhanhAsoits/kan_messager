import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const PersonalChatTab = () => {
    return (
        <ChatGenerator chats={ChatListModel.personal}></ChatGenerator>
    )
}
export default observer(PersonalChatTab)