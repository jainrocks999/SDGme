import React from 'react';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components';
import {NetworkConsumer} from 'react-native-offline';

function ConnectionToast() {
  return (
    <NetworkConsumer>
      {({isConnected}) =>
        !isConnected && (
          <Toast>
            <ToastText>No Internet Connection</ToastText>
          </Toast>
        )
      }
    </NetworkConsumer>
  );
}

const Toast = styled.View`
  padding: 5px;
  background-color: red;
  text-align: center;
  position: absolute;
  top: 0;
  z-index: 200;
  width: 100%;
  height: ${DeviceInfo.hasNotch() ? '60px' : '33px'};
  justify-content: flex-end;
`;

const ToastText = styled.Text`
  padding-bottom: 0px;
  margin: 0 auto;
  color: white;
  font-weight: 700;
  font-size: 10px;
`;

export default ConnectionToast;
