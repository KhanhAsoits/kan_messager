import {observer} from "mobx-react";
import UserSearchStore from "../model/UserSearchStore";
import {Box, Text} from "native-base";
import {useEffect} from "react";
import UserFinderResult from "./UserFinderResult";
import SelectedUser from "./SelectedUser";
import UserFinderSearcher from "./UserFinderSeacher";

const UserFinder = ({height}) => {
    useEffect(() => {
        const bsSync = async () => {
            await UserSearchStore.onGetUserByName();
        }
        bsSync()
    }, [UserSearchStore.query])

    const selectListHeight = 100

    const handleScroll = () => {

    }
    return (
        <Box>
            <UserFinderSearcher/>
            {/*select list*/}
            <SelectedUser/>
            {/*select list*/}
            {/*result*/}
            <Text px={1} my={2}>Suggests({UserSearchStore.listLocalUser.length})</Text>
            <UserFinderResult height={height} selectListHeight={selectListHeight}/>
            {/*result*/}
        </Box>
    )
}
export default observer(UserFinder)