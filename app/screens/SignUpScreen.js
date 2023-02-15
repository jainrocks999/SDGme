import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Alert,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import styled from 'styled-components';
import OneSignal from 'react-native-onesignal';
import PrivacyPolicy from '../shared/components/privacy-policy';
import {Input, PasswordFieldContainer} from '../shared/components/form';
import {
  BottomLinks,
  Link,
  TextButton,
  MText,
} from '../shared/components/typography';
import {BlueButton, MainButton} from '../shared/components/buttons';
import {LogoContainer} from '../shared/components/containers';
import {API_URL, X_API_KEY} from '../shared/config/api';
import {useUserDispatch} from '../shared/config/user-context';
import Eye from '../assets/visibility.svg';
import EyeOff from '../assets/visibility_off.svg';
import colors from '../shared/config/colors';
import Logo from '../assets/logo.svg';
import {ModalBackground} from '../shared/components/action';
import {CloseButton} from '../shared/components/result-action';
import close from '../assets/close.png';
import TermsAndConditions from '../shared/components/terms-conditions';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const initialState = {
  name: '',
  email: '',
  occupation: '',
  company: '',
  password: '',
  passwordConfirm: '',
  accKey: '',
};
const config = {
  headers: {
    'X-API': X_API_KEY,
  },
};

function SignUpScreen({navigation}) {
  const [creds, setCreds] = useState(initialState);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isPassConfirmVisible, setIsPassConfirmVisible] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);

  const dispatch = useUserDispatch();

  const handlePress = useCallback(async () => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,50}$/;
    const data = {
      Email: creds.email,
      AccessKey: creds.accKey,
    };
    if (creds.name === '') {
      return Alert.alert('Validation error', 'Please enter a name');
    }
    if (!emailReg.test(creds.email)) {
      return Alert.alert(
        'Validation error',
        'Please enter a valid email address',
      );
    }
    if (creds.password !== creds.passwordConfirm) {
      return Alert.alert('Validation error', 'Password must match');
    }
    if (!passReg.test(creds.password)) {
      return Alert.alert(
        'Validation error',
        'Please enter a valid password. Password must have at least 6 characters with at least one number. ',
      );
    }
    if (creds.accKey === '') {
      return Alert.alert('Validation error', 'Please enter an access key');
    }
    axios
      .post(`${API_URL}/SDGme/api/User/PreregistrationCheck`, data, config)
      .then((response) => {
        response.data.Success
          ? handleAcceptTerms()
          : Alert.alert('Error', response.data.Message);
      })
      .catch((error) => console.error(error));
  }, [creds]);

  const handleAcceptTerms = useCallback(async () => {
    const {userId} = await OneSignal.getDeviceState();
    console.log('userId  ; ', userId);
    const loginUser = (token) => {
      dispatch({
        type: 'change-token',
        state: token,
      });
      setViewModal(false);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
            state: {
              routes: [
                {
                  name: 'Actions',
                },
              ],
            },
          },
        ],
      });
    };

    const data = {
      Fullname: creds.name,
      Email: creds.email,
      Password: creds.password,
      DeviceId: userId,
      AccessKey: creds.accKey,
      Occupation: creds.occupation,
      CompanyName: creds.company,
    };
    axios
      .post(`${API_URL}/SDGme/api/User/Register`, data, config)
      .then((response) => {
        response.data.Success && response.data.MobileToken
          ? loginUser(response.data.MobileToken)
          : Alert.alert('Error', response.data.Message);
      })
      .catch((error) => console.error(error));
  }, [
    creds.accKey,
    creds.company,
    creds.email,
    creds.name,
    creds.occupation,
    creds.password,
    dispatch,
    navigation,
  ]);

  const closeModal = () => {
    setViewModal(false);
  };

  const canRegister = useMemo(() => {
    if (!creds.name) {
      return false;
    }
    if (!creds.email) {
      return false;
    }
    if (!creds.password) {
      return false;
    }
    if (!creds.passwordConfirm) {
      return false;
    }
    if (!creds.accKey) {
      return false;
    }
    return true;
  }, [creds]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.appBg}}>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        enableOnAndroid
        extraHeight={Platform.select({android: 200})}
        style={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <LogoContainer style={{marginBottom: 40}}>
            <Logo width={140} height={140} />
          </LogoContainer>
          <Input
            value={creds.name}
            placeholder="your name"
            autoCompleteType="name"
            onChangeText={(name) => setCreds((cur) => ({...cur, name}))}
            placeholderTextColor="#999999"
          />

          <Input
            value={creds.email}
            placeholder="your email"
            autoCompleteType="email"
            keyboardType="email-address"
            onChangeText={(email) => setCreds((cur) => ({...cur, email}))}
            placeholderTextColor="#999999"
          />

          <Input
            value={creds.occupation}
            placeholder="your occupation"
            onChangeText={(occupation) =>
              setCreds((cur) => ({...cur, occupation}))
            }
            placeholderTextColor="#999999"
          />

          <Input
            value={creds.company}
            placeholder="your company"
            onChangeText={(company) => setCreds((cur) => ({...cur, company}))}
            placeholderTextColor="#999999"
          />

          <PasswordFieldContainer>
            <Input
              secureTextEntry={!isPassVisible}
              value={creds.password}
              placeholder="password"
              autoCompleteType="password"
              onChangeText={(password) =>
                setCreds((cur) => ({...cur, password}))
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

          <PasswordFieldContainer>
            <Input
              secureTextEntry={!isPassConfirmVisible}
              value={creds.passwordConfirm}
              placeholder="confirm"
              autoCompleteType="password"
              onChangeText={(pass) =>
                setCreds((cur) => ({
                  ...cur,
                  passwordConfirm: pass,
                }))
              }
              placeholderTextColor="#999999"
            />
            <TouchableWithoutFeedback
              onPress={() => setIsPassConfirmVisible(!isPassConfirmVisible)}>
              {isPassConfirmVisible ? (
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

          <Input
            value={creds.accKey}
            placeholder="access key"
            onChangeText={(accKey) => setCreds((cur) => ({...cur, accKey}))}
            placeholderTextColor="#999999"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <CheckBox
              tintColors={{true: colors.links, false: colors.links}}
              onCheckColor={colors.links}
              onTintColor={colors.links}
              boxType="square"
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
                width: '90%',
              }}>
              <MText>
                {`I agree to the `}
                <Link
                  onPress={() => {
                    setViewModal(true);
                    setShowPrivacyPolicy(false);
                  }}>
                  {`Terms and Conditions `}
                </Link>
                <MText>and </MText>
                <Link
                  onPress={() => {
                    setViewModal(true);
                    setShowPrivacyPolicy(true);
                  }}>
                  Privacy Policy.
                </Link>
              </MText>
            </View>
          </View>
          <MainButton onPress={handlePress} disabled={!toggleCheckBox}>
            <TextButton>Register</TextButton>
          </MainButton>
          <BottomLinks>
            <Link onPress={() => navigation.navigate('Auth')}>
              Have an account? Sign in
            </Link>
          </BottomLinks>
          {viewModal && (
            <TCModal
              change={closeModal}
              accept={handleAcceptTerms}
              showPrivacyPolicy={showPrivacyPolicy}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

function TCModal({change, accept, showPrivacyPolicy}) {
  const [tc, setTc] = useState(0);
  const [ref, setRef] = useState(null);
  useEffect(() => {}, [tc]);
  const scrollViewRef = useRef();

  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={() => {
        change();
      }}>
      <ModalBackground />
      <ModalView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <ScrollContainer
          ref={scrollViewRef}
          contentOffset={{
            x: 0,
            y: showPrivacyPolicy ? tc : 0,
          }}>
          <ScrollView
            ref={scrollViewRef}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              setTc(layout.height);
            }}>
            <TermsAndConditions scrollViewRef={scrollViewRef} />
          </ScrollView>
          <PrivacyPolicy scrollViewRef={scrollViewRef} />
        </ScrollContainer>

        <BlueCloseButton
          style={{
            marginTop: 10,
          }}
          onPress={() => change()}>
          <TextButton>Close</TextButton>
        </BlueCloseButton>
      </ModalView>
    </Modal>
  );
}

const ScrollContainer = styled.ScrollView`
  padding-right: 10px;
  width: 100%;
  height: 100%;
`;
export const ModalView = styled.View`
  background: white;
  align-self: center;
  margin: auto;
  padding: 25px;
  text-align: center;
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;
export const BlueCloseButton = styled.TouchableOpacity`
  width: 100%;
  max-width: 120%;
  z-index: 1;
  align-self: center;
  border-radius: 10px;
  align-items: center;
  height: 35px;
  justify-content: center;
  background: ${colors.primaryColor};
`;
export default SignUpScreen;
