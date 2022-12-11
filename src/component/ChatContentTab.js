import {observer} from "mobx-react";
import {Box} from "native-base";
import {v4 as UUID} from "uuid";

const ChatContentTab = ({tab})=>{
    return (
        <Box key={UUID()} flex={1} height={'100%'}>
            {tab.render}
        </Box>
    )
}
export default observer(ChatContentTab)