import React, {useCallback, useState} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import {NetworkConsumer} from 'react-native-offline';

import CustomSafeAreaView from '../../shared/components/safe-area-view';
import {Back, BackContainer} from './InformationScreen';
import {ButtonContainer, Container} from './ResetPasswordScreen';
import {Input} from '../../shared/components/form';
import {useUserState} from '../../shared/config/user-context';
import {BlueButton} from '../../shared/components/buttons';
import {TextButton} from '../../shared/components/typography';
import {API_URL} from '../../shared/config/api';
import {useRequestsDispatch} from '../../shared/config/offline';

function ChangeAccessKeyScreen({navigation}) {
  const defaultFormData = {
    AccessKey: undefined,
    ConfirmAccessKey: undefined,
    Occupation: undefined,
    CompanyName: undefined,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const {MobileToken} = useUserState();
  const dispatchReq = useRequestsDispatch();
  const GoBack = () => {
    navigation.navigate('Settings');
  };

  const ChangeAccessKey = useCallback(
    (isConnected) => {
      if (
        formData.AccessKey &&
        formData.AccessKey !== formData.ConfirmAccessKey
      ) {
        return Alert.alert('Access key must match');
      }
      const config = {
        headers: {
          'X-API': MobileToken,
        },
      };
      const data = {
        AccessKey: formData.AccessKey,
        Occupation: formData.Occupation,
        CompanyName: formData.CompanyName,
      };
      const endpoint = '/SDGme/api/Action/ChangeAccessKey';

      if (isConnected) {
        axios
          .post(`${API_URL + endpoint}`, data, config)
          .then((response) =>
            response.data.Success
              ? navigation.navigate('Actions', {changedAK: true})
              : Alert.alert(
                  `There was an issue${data.AccessKey}`
                    ? '. Check your access key is valid.'
                    : '',
                ),
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
        navigation.navigate('Actions', {changedAK: true});
      }
    },
    [MobileToken, formData, navigation, dispatchReq],
  );

  return (
    <CustomSafeAreaView>
      <BackContainer>
        <Back onPress={() => GoBack()}>&lt; Back to settings</Back>
      </BackContainer>
      <Container>
        <Input
          value={formData.AccessKey}
          placeholder="New Access Key"
          onChangeText={(value) =>
            setFormData((cur) => ({...cur, AccessKey: value}))
          }
          placeholderTextColor="#999999"
        />
        <Input
          value={formData.ConfirmAccessKey}
          placeholder="Confirm Access Key"
          onChangeText={(value) =>
            setFormData((cur) => ({...cur, ConfirmAccessKey: value}))
          }
          placeholderTextColor="#999999"
        />
        <Input
          value={formData.Occupation}
          placeholder="Occupation"
          onChangeText={(value) =>
            setFormData((cur) => ({...cur, Occupation: value}))
          }
          placeholderTextColor="#999999"
        />
        <Input
          value={formData.CompanyName}
          placeholder="Company"
          onChangeText={(value) =>
            setFormData((cur) => ({...cur, CompanyName: value}))
          }
          placeholderTextColor="#999999"
        />
        <ButtonContainer>
          <NetworkConsumer>
            {({isConnected}) => (
              <BlueButton onPress={() => ChangeAccessKey(isConnected)}>
                <TextButton>Save</TextButton>
              </BlueButton>
            )}
          </NetworkConsumer>
        </ButtonContainer>
      </Container>
    </CustomSafeAreaView>
  );
}

export default ChangeAccessKeyScreen;
