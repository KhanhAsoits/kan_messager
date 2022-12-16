import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const AllChatTab = ({appNav}) => {
    return (
        <ChatGenerator appNav={appNav} chats={ChatListModel.allChat}></ChatGenerator>
    )
}
export default observer(AllChatTab)