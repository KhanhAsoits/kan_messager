import {observer} from "mobx-react";
import ChatGenerator from "../../component/ChatGenerator";
import ChatListModel from "../../model/ChatListModel";

const WorkChatTab = ({appNav}) => {
    return (
        <ChatGenerator chats={ChatListModel.works}></ChatGenerator>
    )
}
export default observer(WorkChatTab)