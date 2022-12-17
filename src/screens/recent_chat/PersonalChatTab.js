import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const PersonalChatTab = ({appNav}) => {
    return (
        <ChatGenerator appNav={appNav} chats={ChatListModel.personal}></ChatGenerator>
    )
}
export default observer(PersonalChatTab)