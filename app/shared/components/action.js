import React, {useRef, useState} from 'react';
import axios from 'axios';

import styled from 'styled-components';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  Platform,
  PixelRatio,
  Dimensions,
} from 'react-native';
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
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BOUNCE_RATE = 2000;

export const useDebounce = () => {
  const busy = useRef(false);

  const debounce = async (callback) => {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return {debounce};
};
function ConfirmModal({id, title, bgColor, image, change, goals}) {
  const [count, setCount] = useState(1);
  const [disableButton, enableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const {MobileToken} = useUserState();
  const dispatch = useActionsDispatch();
  const dispatchReq = useRequestsDispatch();
  const {debounce} = useDebounce();

  const act = (id) => {
    dispatch({
      type: 'increase-count',
      state: id,
    });
    change();
  };
  const decrementCount = async () => {
    count != 1 ? setCount(count - 1) : enableButton(true);
  };
  const incrementCount = async () => {
    setCount(count + 1);
    enableButton(false);
  };

  const confirmAction = (id, isConnected) => {
    change();

    setLoading(true);
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    const data = {
      ActionId: id,
      ActionedOn: new Date(),
      Count: count,
    };
    const endpoint = '/SDGme/api/Action/SubmitAction';
    if (isConnected) {
      axios
        .post(`${API_URL + endpoint}`, data, config)
        .then((response) => {
          response.data.Success
            ? act(id)
            : Alert.alert('Action', response.data.Message);
        })
        .catch((error) => console.error('error', error));
    } else {
      dispatchReq({
        type: 'add-request',
        state: {
          request: endpoint,
          data,
          config,
        },
      });
      dispatch({
        type: 'increase-count',
        state: id,
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={id !== null}
      onRequestClose={() => {
        change();
      }}>
      <ModalBackground />
      <ModalView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
          // borderWidth:1
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}>
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
        </View>

        <LgTitle>Great!</LgTitle>
        <Title normal center>
          {title}
        </Title>
        <MText bold>Goals linked to your action</MText>
        <ImageContainer>
          {goals.map((goalId) => (
            <LinkedGoals key={goalId} goal={goalId} />
          ))}
        </ImageContainer>
        <ButtonContainer>
          <CountContainer>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                backgroundColor: colors.links,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => decrementCount()}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{height: 30, width: 30, tintColor: colors.white}}
                  source={require('../../assets/rapidLog/Minus_icons_blue.png')}
                />
              </View>
            </TouchableOpacity>
            <LgTitle>{count}</LgTitle>

            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                backgroundColor: colors.links,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => incrementCount()}>
              <View
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: colors.white,
                  }}
                  source={require('../../assets/rapidLog/Plus_Icons_blue.png')}
                />
              </View>
            </TouchableOpacity>
          </CountContainer>
          <NetworkConsumer>
            {({isConnected}) => (
              <BlueButton
                onPress={() => debounce(confirmAction(id, isConnected))}>
                <TextButton>Confirm action</TextButton>
              </BlueButton>
            )}
          </NetworkConsumer>

          <GreyButton
            onPress={() => {
              change();
            }}>
            <TextButton grey>Cancel</TextButton>
          </GreyButton>
        </ButtonContainer>
      </ModalView>
    </Modal>
  );
}

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
}) {
  const [selected, setSelected] = useState(null);
  const [height, setHeight] = useState();

  const handleClick = (id) => {
    console.log('iomage : ', getImage(image));
    setSelected(id);
  };

  const modalClick = () => {
    setSelected(null);
    setRefreshing();
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
                  amount > 0 ? colors.primaryColor : colors.placeholder,
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
      <ActionContentContainer
        viewDetails={viewDetails}
        underlayColor="none"
        onPress={() => handleClick(id)}>
        <>
          <ActionTitleContainer>
            <Title style={{width: '80%'}}>{title}</Title>
            <View
              style={{
                width: '20%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: hp('40%'),
                  // borderWidth:1,
                  height: hp('4%'),
                  width: hp('4%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  backgroundColor:
                    amount > 0 ? colors.primaryColor : colors.placeholder,
                  maxHeight: hp('13%'),
                  maxWidth: hp('13%'),
                }}>
                {/* <Text
                adjustsFontSizeToFit
                  >321</Text> */}
                <Amount
                  adjustsFontSizeToFit
                  // >{565}</Amount>
                >
                  {amount}
                </Amount>
              </View>
            </View>
          </ActionTitleContainer>
          <ActionButtonContainer>
            <BlueButton onPress={() => handleClick(id)}>
              <TextButton>Add</TextButton>
            </BlueButton>
          </ActionButtonContainer>
        </>
      </ActionContentContainer>
      {selected !== null && (
        <ConfirmModal
          id={selected}
          title={description}
          bgColor={bgColor}
          image={image}
          change={modalClick}
          goals={goals}
        />
      )}
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
  align-self: center;
  align-items: center;
  width: 65%;
  max-width: 100%;

  margin-top: 10px;
`;
const CountContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

export const ModalView = styled.ScrollView`
  margin-top: 22px;
  background: white;
  align-self: center;
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
  font-size: 11px;
  color: ${colors.white};
  text-align: center;
`;

export default Action;
