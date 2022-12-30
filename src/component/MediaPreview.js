import {observer} from "mobx-react";
import {Box, HStack, Image} from "native-base";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../util/helper";
import SingleChatModel from "../model/SingleChatModel";

const MediaPreview = ({media}) => {
    return (
        <Box onTouchStart={() => {
            SingleChatModel.setMedia("")
            SingleChatModel.setShowMedia(false)
        }} justifyContent={'center'} alignItems={'center'} width={SCREEN_WIDTH} height={SCREEN_HEIGHT}
             position={'absolute'} top={0} left={0} zIndex={10}
             bgColor={'rgba(0,0,0,0.9)'}>
            <Image alt={'preview-img'} borderRadius={8} bgColor={'gray.100'} source={{uri: media}}
                   width={SCREEN_WIDTH / 1.2}
                   height={SCREEN_HEIGHT / 2}/>
        </Box>
    )
}
export default observer(MediaPreview)