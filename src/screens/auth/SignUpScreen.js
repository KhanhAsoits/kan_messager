import {observer} from "mobx-react";
import {ActivityIndicator, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";
import {Box, HStack, ScrollView, Text, VStack} from "native-base";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../../util/helper";
import thumbnail from "../../../assets/static/images/sign_bg.jpg";
import AuthStore from "../../model/AuthStore";
import {Loader} from "../../component/Loader";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";
import {faker} from "@faker-js/faker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const SignUpScreen = ({route}) => {
    const nav = useNavigation()
    const [emailErr, setEmailErr] = useState('')
    const handleBack = () => {

    }
    const handleSignUp = () => {
        AuthStore.signUp(nav)
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <NativeBaseProvider>
                <ImageBackground style={{height: SCREEN_HEIGHT, backgroundColor: 'black'}} source={thumbnail}>
                    {AuthStore.autoLoginFetching && <Loader></Loader>}
                    <Box flex={1}>
                        <HStack px={4} flex={.12} justifyContent={'space-between'}
                                alignItems={'center'}>
                            <TouchableOpacity onPress={handleBack}>
                                <Ionicons name={'arrow-back'} color={'white'} size={26}></Ionicons>
                            </TouchableOpacity>
                            <Text color={'white'} fontSize={30} fontWeight={"500"}>Sign Up</Text>
                            <Text color={'white'} fontSize={26} fontWeight={"500"}></Text>
                        </HStack>
                        <Box flex={.88} bgColor={'white'} borderTopRadius={10} py={12} overflow={"hidden"}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <VStack py={6} px={4} space={6}>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>Username</Text>
                                        <TextInput onChangeText={text => AuthStore.setSignUpUserName(text)}
                                                   placeholder={faker.name.fullName()}
                                                   placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                                   style={{
                                                       letterSpacing: 1,
                                                       width: '100%',
                                                       fontSize: 15,
                                                       color: "rgba(0,0,0,0,0.6)",
                                                       paddingVertical: 8,
                                                       borderRadius: 8
                                                   }}/>
                                        {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                                    </Box>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>Email</Text>
                                        <TextInput onChangeText={text => AuthStore.setSignUpEmail(text)}
                                                   placeholder={faker.internet.email()}
                                                   placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                                   style={{
                                                       letterSpacing: 1,
                                                       width: '100%',
                                                       fontSize: 15,
                                                       color: "rgba(0,0,0,0,0.6)",
                                                       paddingVertical: 8,
                                                       borderRadius: 8
                                                   }}/>
                                        {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                                    </Box>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>Phone</Text>
                                        <TextInput maxLength={10} keyboardType={'number-pad'}
                                                   onChangeText={text => AuthStore.setSignUpPhone(text)}
                                                   placeholder={faker.phone.number()}
                                                   placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                                   style={{
                                                       letterSpacing: 1,
                                                       width: '100%',
                                                       fontSize: 15,
                                                       color: "rgba(0,0,0,0,0.6)",
                                                       paddingVertical: 8,
                                                       borderRadius: 8
                                                   }}/>
                                        {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                                    </Box>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>Password</Text>
                                        <TextInput secureTextEntry={true}
                                                   onChangeText={text => AuthStore.setSignUpPassword(text)}
                                                   placeholder={faker.internet.password()}
                                                   placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                                   style={{
                                                       letterSpacing: 1,
                                                       width: '100%',
                                                       fontSize: 15,
                                                       color: "rgba(0,0,0,0,0.6)",
                                                       paddingVertical: 8,
                                                       borderRadius: 8
                                                   }}/>
                                        {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                                    </Box>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>Confirm Password</Text>
                                        <TextInput secureTextEntry={true}
                                                   onChangeText={text => AuthStore.setConfirmPassword(text)}
                                                   placeholder={faker.internet.password()}
                                                   placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                                   style={{
                                                       letterSpacing: 1,
                                                       width: '100%',
                                                       fontSize: 15,
                                                       color: "rgba(0,0,0,0,0.6)",
                                                       paddingVertical: 8,
                                                       borderRadius: 8
                                                   }}/>
                                        {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                                    </Box>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>Address</Text>
                                        <TextInput
                                            onChangeText={text => AuthStore.setSignUpAddress(text)}
                                            placeholder={faker.address.streetAddress()}
                                            placeholderTextColor={"rgba(0,0,0,0,0.6)"}
                                            style={{
                                                letterSpacing: 1,
                                                width: '100%',
                                                fontSize: 15,
                                                color: "rgba(0,0,0,0,0.6)",
                                                paddingVertical: 8,
                                                borderRadius: 8
                                            }}/>
                                        {emailErr.length > 0 && <Text color={'red.400'} fontSize={12}>{emailErr}</Text>}
                                    </Box>
                                    <Box bgColor={'white'} shadow={1} p={3} borderRadius={8}>
                                        <Text mb={2} fontSize={16} fontWeight={'600'} color={'black'}
                                              letterSpacing={1}>What your birthday?</Text>
                                        <RNDateTimePicker style={{height: 300}} onChange={(event, date) => {
                                            const {type, nativeEvent: {timestamp}} = event
                                            AuthStore.setSignUpBirthday(timestamp)
                                        }}
                                                          value={new Date(new Date().getFullYear() - 10, 1, 0)}
                                                          display={'spinner'}></RNDateTimePicker>
                                    </Box>
                                    <TouchableOpacity onPress={handleSignUp} activeOpacity={.8}>
                                        <Box width={'100%'} bgColor={'black'} py={4} borderLeftRadius={16}
                                             borderBottomRightRadius={16}>
                                            {AuthStore.fetching ? <ActivityIndicator size={24} color={'white'}/>
                                                :
                                                <Text color={'white'} textAlign={'center'} fontSize={16}
                                                      fontWeight={'600'}>Sign Up</Text>
                                            }
                                        </Box>
                                    </TouchableOpacity>
                                </VStack>
                            </ScrollView>
                        </Box>
                    </Box>
                </ImageBackground>
            </NativeBaseProvider>
        </SafeAreaView>
    )
}

export default observer(SignUpScreen)