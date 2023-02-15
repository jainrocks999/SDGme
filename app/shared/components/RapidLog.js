import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Image, Modal, Text, View, TouchableOpacity} from 'react-native';
import {NetworkConsumer} from 'react-native-offline';
import FastImage from 'react-native-fast-image';

import colors from '../config/colors';
import {BlueButton, GreyButton} from './buttons';
import {LgTitle, MText, TextButton, Title} from './typography';
import {
  ActionButtonContainer,
  ActionContainer,
  ActionContentContainer,
  ActionIconContainer,
  ActionTitleContainer,
} from './containers';
import {API_URL} from '../config/api';
import LinkedGoals from './linked-goals';
import {useUserState} from '../config/user-context';
import {useActionsDispatch} from '../config/actions-context';
import {getImage} from './action-images';
import {useRequestsDispatch} from '../config/offline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function Action({
  id,
  title,
  description,
  amount,
  viewDetails,
  bgColor,
  image,
  goals,
  setRefreshing,
  removeAction,
  addAction,
}) {
  const [selected, setSelected] = useState(null);
  const [height, setHeight] = useState();
  const [count, setCount] = useState(amount);
  const [initialCount, setInitialCount] = useState(amount);
  const [disableButton, enableButton] = useState(amount === 0 ? true : false);
  const [counter, setCounter] = useState([]);

  const handleClick = (id) => {
    setSelected(id);
  };

  const decrementCount = async (id) => {
    if (count > 0) {
      setCount(count - 1);
      removeAction(id, count - 1, initialCount);
    } else {
      enableButton(true);
    }
  };
  const incrementCount = async (id) => {
    setCount(count + 1);
    enableButton(false);
    addAction(id, count + 1, initialCount);
  };

  return (
    <ActionContainer viewDetails={viewDetails}>
      <ActionIconContainer
        viewDetails={viewDetails}
        underlayColor="none"
        onPress={() => handleClick(id)}
        bgColor={colors.bgBlue}>
        <>
          <IconCircleBackground color={bgColor} />
          <FastImage
            style={{
              zIndex: 2,
              width: 50,
              height: 50,
            }}
            source={getImage(image)}
            resizeMode={FastImage.resizeMode.contain}
          />
          {viewDetails && (
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor:
                  count > 0 ? colors.primaryColor : colors.placeholder,
                borderRadius: 50,
                flex: 1,
                width: height,
                height,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          )}
        </>
      </ActionIconContainer>
      <ActionListContainer>
        <>
          <ActionTitleContainer>
            <Title adjustsFontSizeToFit style={{flex: 1}}>
              {title}
            </Title>
          </ActionTitleContainer>
          <ActionButtonContainer>
            <CountContainer>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                disabled={disableButton}
                onPress={() => decrementCount(id)}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={
                      count > 0
                        ? require('../../assets/rapidLog/Minus_icons_blue.png')
                        : require('../../assets/rapidLog/Minus_icons_grey.png')
                    }
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: hp('40%'),
                    height: hp('4.1%'),
                    width: hp('4.1%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor:
                      count > 0 ? colors.primaryColor : colors.placeholder,
                    maxHeight: hp('13%'),
                    maxWidth: hp('13%'),
                  }}>
                  <Amount adjustsFontSizeToFit>{count}</Amount>
                  {/* >{598}</Amount>  */}
                </View>
              </View>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => incrementCount(id)}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={require('../../assets/rapidLog/Plus_Icons_blue.png')}
                    // source={
                    //   disableButton
                    //       ? require('../../assets/rapidLog/Minus_icons_grey.png')
                    //       : require('../../assets/rapidLog/Minus_icons_blue.png')
                    //     }
                  />
                </View>
              </TouchableOpacity>
            </CountContainer>
          </ActionButtonContainer>
        </>
      </ActionListContainer>
    </ActionContainer>
  );
}

const ImageContainer = styled.View`
  margin-bottom: 20px;
  flex-flow: row wrap;
  align-content: space-around;
  justify-content: space-around;
`;

export const ModalBackground = styled.View`
  position: absolute;
  background-color: ${colors.black};
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

const ButtonContainer = styled.View`
  align-content: center;
  justify-content: center;
  width: 150px;
`;
const CountContainer = styled.View`
  flex-direction: row;

  align-items: center;
  align-self: flex-end;
  justify-content: space-between;
  width: 50%;
`;

export const ModalView = styled.View`
  margin-top: 22px;
  background: white;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 25px;
  text-align: center;
  border-radius: 20px;
  margin-top: 20%;
  margin-bottom: 20%;
  width: 80%;
  height: 80%;
`;

const IconCircleBackground = styled.View`
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;

export const Amount = styled.Text`
  color: ${colors.white};
  text-align: center;
  font-size: 11px;
`;
export const ActionListContainer = styled.View`
  ${({viewDetails}) => viewDetails && 'display: none;'}
  padding: 19px 20px;
  flex: 0.6;
  background-color: ${colors.white};
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

export default Action;
