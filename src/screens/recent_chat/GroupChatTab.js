import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const GroupChatTab = ({appNav}) => {
    return (
        <ChatGenerator appNav={appNav} chats={ChatListModel.groups}></ChatGenerator>
    )
}
export default observer(GroupChatTab)