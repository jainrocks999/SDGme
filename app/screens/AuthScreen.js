import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  FormContainer,
  Input,
  PasswordFieldContainer,
} from '../shared/components/form';
import {
  BlackText,
  BottomLinks,
  Link,
  TextButton,
} from '../shared/components/typography';
import {MainButton} from '../shared/components/buttons';
import {LogoContainer} from '../shared/components/containers';
import Eye from '../assets/visibility.svg';
import EyeOff from '../assets/visibility_off.svg';
import {API_URL, X_API_KEY} from '../shared/config/api';
import {useUserDispatch, useUserState} from '../shared/config/user-context';
import colors from '../shared/config/colors';
import Logo from '../assets/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingContainer} from './ResultsScreen';

function AuthScreen({next}) {
  const [isLogin, setIsLogin] = useState(true);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });
  const {MobileToken} = useUserState();
  console.log('MobileToken  ; ', MobileToken);
  const dispatch = useUserDispatch();
  const navigation = useNavigation();

  const SwitchMode = () => {
    setResetSuccess(false);
    setCreds({email: '', password: ''});
    setIsLogin(!isLogin);
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('Name', value);
    } catch (e) {
      // saving error
    }
  };
  const handlePress = async () => {
    const {userId} = await OneSignal.getDeviceState();
    console.log('userId : ', userId);
    const config = {
      headers: {
        'X-API': X_API_KEY,
      },
    };
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,50}$/;
    if (isLogin) {
      const data = {
        Email: creds.email.trim(),
        Password: creds.password.trim(),
        DeviceId: userId,
      };
      if (!emailReg.test(data.Email)) {
        return Alert.alert(
          'Validation error',
          'Please enter a valid email address',
        );
      }
      if (!passReg.test(data.Password)) {
        return Alert.alert(
          'Validation error',
          'Please enter a valid password. Password must have at least 6 characters with at least one number. ',
        );
      }
      setIsLoading(true);

      axios
        .post(`${API_URL}/SDGme/api/User/Login`, data, config)
        .then((response) => {
          setIsLoading(false);
          storeData(response.data.Name);

          response.data.Success && response.data.MobileToken
            ? (dispatch({
                type: 'change-token',
                state: response.data.MobileToken,
              }),
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Home',
                    state: {
                      routes: [
                        {
                          name: next || 'Actions',
                        },
                      ],
                    },
                  },
                ],
              }))
            : Alert.alert('Error', 'Incorrect credentials');
        })
        .catch((error) => console.error('error ', error));
    } else {
      const data = {
        Email: creds.email.trim(),
      };
      if (!emailReg.test(data.Email)) {
        return Alert.alert(
          'Validation error',
          'Please enter a valid email address',
        );
      }
      setIsLoading(true);
      axios
        .post(`${API_URL}/SDGme/api/User/ForgotPassword`, data, config)
        .then((response) => {
          setIsLoading(false);
          response.data.Success && setResetSuccess(true);
        })
        .catch((error) => console.error(error));
    }
  };
  const getViewHeight = (height) =>
    Platform.OS === 'ios'
      ? height >= 800
        ? height - 62
        : height - 15
      : height;

  useEffect(() => {
    // If logged in and/or deep linked push notification
    if (MobileToken) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
            state: {
              routes: [
                {
                  name: next || 'Actions',
                },
              ],
            },
          },
        ],
      });
    }
  }, [MobileToken, navigation, next]);

  return (
    <SafeAreaView style={{backgroundColor: colors.appBg}}>
      {!isLoading ? (
        <KeyboardAwareScrollView
          enableAutomaticScroll
          enableOnAndroid
          extraHeight={Platform.select({android: 200})}
          style={{flexGrow: 1}}>
          <View
            style={{
              height: getViewHeight(Dimensions.get('window').height),
            }}>
            <LogoContainer>
              <Logo width={140} height={140} />
            </LogoContainer>
            <FormContainer style={{marginTop: 'auto'}}>
              {isLogin ? (
                <>
                  <Input
                    value={creds.email}
                    placeholder="email"
                    autoCompleteType="email"
                    onChangeText={(email) =>
                      setCreds((creds) => ({...creds, email}))
                    }
                    placeholderTextColor="#999999"
                    keyboardType="email-address"
                  />
                  <PasswordFieldContainer>
                    <Input
                      secureTextEntry={!isPassVisible}
                      value={creds.password}
                      placeholder="password"
                      autoCompleteType="password"
                      onChangeText={(password) =>
                        setCreds((creds) => ({...creds, password}))
                      }
                      placeholderTextColor="#999999"
                    />
                    <TouchableWithoutFeedback
                      onPress={() => setIsPassVisible(!isPassVisible)}>
                      {isPassVisible ? (
                        <EyeOff
                          style={{position: 'absolute', right: 10, top: 12}}
                          width={20}
                          height={20}
                        />
                      ) : (
                        <Eye
                          style={{position: 'absolute', right: 10, top: 12}}
                          width={20}
                          height={20}
                        />
                      )}
                    </TouchableWithoutFeedback>
                  </PasswordFieldContainer>
                </>
              ) : !resetSuccess ? (
                <>
                  <BlackText>
                    To reset your password please enter your email address below
                    and click submit
                  </BlackText>
                  <Input
                    secureTextEntry={false}
                    value={creds.email}
                    placeholder="email"
                    autoCompleteType="email"
                    onChangeText={(email) =>
                      setCreds((creds) => ({...creds, email}))
                    }
                    placeholderTextColor="#999999"
                    keyboardType="email-address"
                  />
                </>
              ) : (
                <>
                  <BlackText>Thank you.</BlackText>
                  <BlackText end>
                    An email with password reset instructions has been sent to
                    that email address if it has been registered to an account.
                  </BlackText>
                </>
              )}
              {!resetSuccess && (
                <MainButton onPress={() => handlePress()}>
                  <TextButton>{isLogin ? 'Login' : 'Submit'}</TextButton>
                </MainButton>
              )}
              <BottomLinks>
                <Link onPress={() => SwitchMode()}>
                  {isLogin ? 'Forgotten password?' : 'Back to login'}
                </Link>
                <Link onPress={() => navigation.navigate('SignUp')}>
                  Sign Up
                </Link>
              </BottomLinks>
            </FormContainer>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <LoadingContainer />
      )}
    </SafeAreaView>
  );
}

export default AuthScreen;
