import {observer} from "mobx-react";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, Image, Text, VStack} from "native-base";
import thumbnail from '../../../assets/static/images/sign_bg.jpg'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../util/helper";
import {ActivityIndicator, ImageBackground, TextInput, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AuthStore from "../../model/AuthStore";
import {useEffect, useRef, useState} from "react";
import {Loader} from "../../component/Loader";

const SignInScreen = ({route}) => {

    const [emailErr, setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const firstCount = useRef(1)
    const handleValidEmail = () => {
        if (AuthStore.singInInfo.username.length > 0) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(AuthStore.singInInfo.username))) {
                setEmailErr('Email Format inValid.')
            } else {
                setEmailErr('')
            }
        }
    }

    const handleValidPassword = () => {
        if (AuthStore.singInInfo.password.length > 0) {
            if (AuthStore.singInInfo.password.length < 8) {
                setPasswordErr('Password can not less than 8 character');
            } else {
                setPasswordErr('')
            }
        }
    }

    useEffect(() => {
        handleValidEmail()
    }, [AuthStore.singInInfo.username])

    useEffect(() => {
        handleValidPassword()
    }, [AuthStore.singInInfo.password])

    return (
        <NativeBaseProvider>
            <ImageBackground style={{height: SCREEN_HEIGHT, backgroundColor: 'black'}} source={thumbnail}>
                {AuthStore.autoLoginFetching && <Loader></Loader>}
                <Box flex={1} style={{paddingTop: 40}}>
                    <Box bgColor={'red400'} flex={.3} justifyContent={'center'}>
                        <Box style={{transform: [{rotate: '180deg'}]}} width={SCREEN_WIDTH / 4.5} borderRightRadius={16}
                             borderTopLeftRadius={16} justifyContent={'center'} alignItems={'center'}
                             height={SCREEN_WIDTH / 4.5} alignSelf={'center'} bgColor={'white'}>
                            <Ionicons name={'chatbubble'} size={50} color={'black'}></Ionicons>
                        </Box>
                    </Box>
                    <VStack space={8} bgColor={'white'} px={8} py={12} flex={.7} borderTopLeftRadius={100}>

                        <Text color={'black'} fontSize={36} textAlign={'center'}>
                            Login
                        </Text>
                        <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                            <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}>Email</Text>
                            <TextInput onChangeText={text => AuthStore.setSignInUsername(text)}
                                       placeholder={'aknasclknas@gmail.com'} placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                       style={{
                                           width: '100%',
                                           fontSize: 15,
                                           color: "rgba(0,0,0,0,0.6)",
                                           paddingVertical: 12,
                                           borderRadius: 8
                                       }}/>
                            {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                        </Box>
                        <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                            <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}>Password</Text>
                            <TextInput onChangeText={text => AuthStore.setSignInPassword(text)} secureTextEntry={true}
                                       placeholder={'*******'} placeholderTextColor={"rgba(0,0,0,0,0.6)"} style={{
                                width: '100%',
                                fontSize: 15,
                                color: "rgba(0,0,0,0,0.6)",
                                paddingVertical: 12,
                                borderRadius: 8
                            }}/>
                            {passwordErr.length > 0 && <Text color={'red.400'} fontSize={12}>{passwordErr}</Text>}
                        </Box>
                        <TouchableOpacity onPress={AuthStore.signIn} activeOpacity={.8}>
                            <Box width={'100%'} bgColor={'black'} py={4} borderLeftRadius={16}
                                 borderBottomRightRadius={16}>
                                {AuthStore.fetching ? <ActivityIndicator size={24} color={'white'}/>
                                    :
                                    <Text color={'white'} textAlign={'center'} fontSize={16}
                                          fontWeight={'600'}>Login</Text>
                                }
                            </Box>
                        </TouchableOpacity>
                    </VStack>
                </Box>
            </ImageBackground>
        </NativeBaseProvider>
    )
}

export default observer(SignInScreen)