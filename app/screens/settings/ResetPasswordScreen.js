import React, {useState} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import {NetworkConsumer} from 'react-native-offline';

import {BlueButton} from '../../shared/components/buttons';
import {Input} from '../../shared/components/form';
import CustomSafeAreaView from '../../shared/components/safe-area-view';
import {TextButton} from '../../shared/components/typography';
import {API_URL} from '../../shared/config/api';
import {useUserState} from '../../shared/config/user-context';
import {Back, BackContainer} from './InformationScreen';
import {useRequestsDispatch} from '../../shared/config/offline';

function ResetPasswordScreen({navigation}) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const passReg = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})/
  // const passReg = /.*[0-9].*/
  const passReg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
  const {MobileToken} = useUserState();
  const dispatchReq = useRequestsDispatch();

  const GoBack = () => {
    navigation.navigate('Settings');
  };

  const ResetPassword = (isConnected) => {
    if (password !== confirmPassword) {
      return Alert.alert('Password must match');
    }
    if (!passReg.test(password)) {
      return Alert.alert(
        'Validation error',
        // 'Please enter a valid password. Password must have at least eight characters, one uppercase letter, one number and one symbol'
        'Please enter a valid password. Password must have at least 6 characters with at least one number. ',
      );
    }
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    const data = {
      Password: password,
    };
    const endpoint = '/SDGme/api/Action/ChangePassword';
    if (isConnected) {
      axios
        .post(`${API_URL + endpoint}`, data, config)
        .then((response) =>
          response.data.Success
            ? navigation.navigate('Settings')
            : Alert.alert(response.data.Message),
        )
        .catch((error) => console.error(error));
    } else {
      dispatchReq({
        type: 'add-request',
        state: {
          request: endpoint,
          data,
          config,
        },
      });
      navigation.navigate('Settings');
    }
  };

  return (
    <CustomSafeAreaView>
      <BackContainer>
        <Back onPress={() => GoBack()}>&lt; Back to settings</Back>
      </BackContainer>
      <Container>
        <Input
          secureTextEntry
          value={password}
          placeholder="New Password"
          onChangeText={(value) => setPassword(value)}
          placeholderTextColor="#999999"
        />
        <Input
          secureTextEntry
          value={confirmPassword}
          placeholder="Confirm New Password"
          onChangeText={(value) => setConfirmPassword(value)}
          placeholderTextColor="#999999"
        />
        <ButtonContainer>
          <NetworkConsumer>
            {({isConnected}) => (
              <BlueButton onPress={() => ResetPassword(isConnected)}>
                <TextButton>Change Password</TextButton>
              </BlueButton>
            )}
          </NetworkConsumer>
        </ButtonContainer>
      </Container>
    </CustomSafeAreaView>
  );
}

export const Container = styled.View`
  margin: 0 20px;
`;

export const ButtonContainer = styled.View`
  min-width: 200px;
  width: 100%;
  margin: auto;
  padding: 0 20%;
`;

export default ResetPasswordScreen;
