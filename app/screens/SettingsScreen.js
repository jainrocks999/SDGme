import React from 'react';
import styled from 'styled-components';
import {Alert, Linking, Text} from 'react-native';
import {NetworkConsumer} from 'react-native-offline';
import axios from 'axios';
import OneSignal from 'react-native-onesignal';

import CustomSafeAreaView from '../shared/components/safe-area-view';
import colors from '../shared/config/colors';
import {useUserDispatch, useUserState} from '../shared/config/user-context';
import {useResultsDispatch} from '../shared/config/results-context';
import {useActionsDispatch} from '../shared/config/actions-context';
import chevron from '../assets/chevron.png';
import {useRequestsDispatch} from '../shared/config/offline';
import {API_URL} from '../shared/config/api';

function SettingsScreen({navigation}) {
  const dispatch = useUserDispatch();
  const dispatchResults = useResultsDispatch();
  const dispatchActions = useActionsDispatch();
  const {MobileToken} = useUserState();
  const dispatchReq = useRequestsDispatch();

  const handleLogout = async (isConnected) => {
    const endpoint = `${API_URL}/SDGme/api/Action/Logout`;
    const {userId} = await OneSignal.getDeviceState();
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    const data = {
      DeviceId: userId,
    };
    if (isConnected) {
      axios
        .post(endpoint, data, config)
        .then((response) =>
          response.data.Success
            ? console.log('RESPONSE RECEIVED 🥰', response.data)
            : console.log('RESPONSE NOT RECEIVED 👹', response.data),
        )
        .catch((error) => console.error('FAILED ERROR:', error));
    } else {
      dispatchReq({
        type: 'add-request',
        state: {
          request: endpoint,
          config,
        },
      });
      navigation.navigate('Auth');
    }
  };

  const Options = [
    {
      name: 'Reset Password',
      component: 'ResetPassword',
    },
    {
      name: 'Change Access Key',
      component: 'ChangeAccessKey',
    },
    {
      name: 'Help',
      component: 'Help',
    },
    {
      name: 'Push Notifications (On/Off)',
      push: true,
    },
    {
      name: 'Terms & Conditions',
      component: 'TermsAndConditionsScreen',
    },
    {
      name: 'Privacy Policy',
      component: 'PrivacyPolicyScreen',
    },
  ];

  const Logout = (isConnected) => {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          onPress: () => {
            handleLogout(isConnected);
            dispatch({
              type: 'change-token',
              state: null,
            });
            dispatchResults({
              type: 'add-results',
              state: {Results: []},
            });
            dispatchActions({
              type: 'add-actions',
              state: {
                Actions: [],
                Buckets: [],
              },
            });
            navigation.navigate('Auth');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <CustomSafeAreaView>
      <LogOutContainer>
        <NetworkConsumer>
          {({isConnected}) => (
            <LogOut onPress={() => Logout(isConnected)}>Log out</LogOut>
          )}
        </NetworkConsumer>
      </LogOutContainer>
      <SettingsContainer>
        {Options.map((option) => (
          <SettingsItem
            key={option.name}
            onPress={() => {
              option.push
                ? Linking.openSettings()
                : navigation.navigate(option.component);
            }}>
            <Text style={{fontSize: 16}}>{option.name}</Text>
            <Chevron source={chevron} resizeMode="contain" />
          </SettingsItem>
        ))}
      </SettingsContainer>
    </CustomSafeAreaView>
  );
}

const LogOutContainer = styled.View`
  margin: 0 10px 10px 10px;
  flex-direction: row;
  justify-content: flex-end;
  height: 40px;
  align-items: center;
`;

const LogOut = styled.Text`
  color: ${colors.links};
  font-size: 16px;
`;

const SettingsContainer = styled.ScrollView``;

const SettingsItem = styled.TouchableOpacity`
  min-height: 60px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Chevron = styled.Image`
  width: 30px;
  height: 20px;
  align-self: center;
`;

export default SettingsScreen;
