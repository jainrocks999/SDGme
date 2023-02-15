import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Text} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import {NetworkConsumer} from 'react-native-offline';
import FastImage from 'react-native-fast-image';

import {API_URL} from '../config/api';
import {useUserState} from '../config/user-context';
import {useActionsState} from '../config/actions-context';
import AcceptIcon from '../../assets/accept-mod.svg';
import RemoveIcon from '../../assets/remove-mod.svg';
import {useRequestsDispatch} from '../config/offline';
import {getImage} from './action-images';

function DetailedAction({action, remove, color, disableConfirm}) {
  const [actionState, setAction] = useState();

  const {Id, ActionDate, ActionId} = action;
  const {MobileToken} = useUserState();
  const {Actions} = useActionsState();
  const dispatchReq = useRequestsDispatch();

  useEffect(() => {
    setAction(Actions.filter((act) => act.Id === ActionId)[0]);
  }, [ActionId, Actions]);

  const confirmActionModeration = (Id, deleteAction = false, isConnected) => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    const data = {
      UserActionId: Id,
    };
    const endpoint = deleteAction
      ? '/SDGme/api/Action/DeleteModerationItem'
      : '/SDGme/api/Action/ConfirmActionModerationItem';
    if (isConnected) {
      axios
        .post(`${API_URL + endpoint}`, data, config)
        .then((response) => {
          response.data.Success
            ? remove(Id)
            : console.log('Detailed Action :', response.data);
        })
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
      remove(Id);
    }
  };

  const addZeroBefore = (n) => (n < 10 ? '0' : '') + n;

  const formatDate = (date) => {
    const d = new window.Date(date);
    return `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear().toString().substr(-2)} at ${addZeroBefore(
      d.getHours(),
    )}:${addZeroBefore(d.getMinutes())}`;
  };

  const ActionType = useMemo(
    () => Actions.find((act) => act.Id === action.ActionId),
    [action, Actions],
  );

  const image = useMemo(() => getImage(ActionType.Image), [ActionType]);

  if (!actionState) {
    return <></>;
  }
  return (
    <DetailedActionContainer>
      <DetailedActionImageContainer>
        <IconCircleBackground color={color.toLowerCase()} />
        <FastImage
          style={{
            zIndex: 2,
            width: 25,
            height: 25,
          }}
          source={image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </DetailedActionImageContainer>
      <Date>
        <Text maxFontSizeMultiplier={1} style={{padding: 0, margin: 0}}>
          {ActionType.Description}
        </Text>
        <DateText style={{padding: 0, margin: 0}} maxFontSizeMultiplier={1}>
          {formatDate(ActionDate)}
        </DateText>
      </Date>
      <NetworkConsumer>
        {({isConnected}) => (
          <>
            {action && !disableConfirm ? (
              <Remove
                onPress={() => confirmActionModeration(Id, false, isConnected)}
                style={{marginRight: 20}}>
                <AcceptIcon height="20" width="20" />
              </Remove>
            ) : null}
            {remove ? (
              <Remove
                onPress={() => confirmActionModeration(Id, true, isConnected)}>
                <RemoveIcon height="20" width="20" />
              </Remove>
            ) : null}
          </>
        )}
      </NetworkConsumer>
    </DetailedActionContainer>
  );
}

const Remove = styled.TouchableOpacity``;

const DateText = styled.Text`
  font-size: 13px;
  margin: 0;
  padding: 0;
`;

const Date = styled.View`
  flex: 1;
  padding: 5px;
`;

const DetailedActionImageContainer = styled.View`
  margin-left: 10px;
  margin-right: 20px;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const IconCircleBackground = styled.View`
  position: absolute;
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;

const DetailedActionContainer = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
  margin-top: 15px;
`;

export default DetailedAction;
