import {observer} from "mobx-react";
import {BottomSheet} from "./BottomSheet";
import UserFinder from "./UserFinder";

const NewChatItem = ({setOpen}) => {
    return (
        <BottomSheet height={30} setOpen={setOpen}>
            <UserFinder height={95}/>
        </BottomSheet>
    )
}

export default observer(NewChatItem)
