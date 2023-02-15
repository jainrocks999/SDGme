/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Alert, Modal, Text as RNText} from 'react-native';
import FastImage from 'react-native-fast-image';

import colors from '../config/colors';
import Action, {ModalBackground, ModalView} from './action';
import DetailedAction from './detailed-action';
import LinkedGoals from './linked-goals';
import {API_URL} from '../config/api';
import {useUserState} from '../config/user-context';
import {useActionsState} from '../config/actions-context';
import {formatImpact} from '../functions/formatImpact';

function ResultActionGoal({
  data,
  isGoal,
  showConfirmModal = true,
  refreshData,
}) {
  const {user, company, image, color, goalId, Id, actionId} = data;

  const [isSelected, setIsSelected] = useState(false);
  const [items, setItems] = useState();
  const [removedItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);

  const {MobileToken} = useUserState();
  const {Actions} = useActionsState();

  const removeItem = (Id) => {
    // isRefreshing()
    refreshData();
    getData();
  };

  const modalClick = () => {
    setIsSelected(null);
    if (refreshData) {
      refreshData();
    }
  };

  const filterActions = useCallback(
    (Id) => {
      const result = [];
      Actions.forEach((action) => {
        if (action.Goals.includes(Id)) {
          result.push(action);
        }
      });
      return result;
    },
    [Actions],
  );

  const handleResponse = useCallback(
    (Items) => {
      handleRecentActions(Items);
      let x = Items.Items;
      if (isGoal) {
        x = Items.Items.filter((item) =>
          filterActions(data.goalId).some((filt) => filt.Id === item.ActionId),
        );
      }
      setItems(x);
    },
    [data.actionId, data.goalId, filterActions, isGoal, handleRecentActions],
  );

  const handleRecentActions = useCallback((Response) => {
    setRecentItems(Response.RecentActions);
  }, []);

  useEffect(() => {
    if (items) {
      setItems(items.filter((item) => !removedItems.includes(item.Id)));
    }
  }, [removedItems]);

  const getData = useCallback(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    let goalQuery = isGoal ? `?sdgGoal=${goalId}` : undefined;
    if (actionId) {
      goalQuery = `?actionId=${actionId}`;
    }
    axios
      .get(
        `${API_URL}/SDGme/api/Action/GetModerationItems${goalQuery || ''}`,
        config,
      )
      .then((response) => {
        response.data.Success
          ? handleResponse(response.data)
          : console.log('GetModerationItems 1 : ', response.data);
      })
      .catch((error) => console.error(error));
  }, [MobileToken, goalId, handleResponse, isGoal, actionId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <ResultActionContainer onPress={() => setIsSelected(true)} isGoal={isGoal}>
      {/* <Text>{data.actionId || '0'} {JSON.stringify(recentItems)}</Text> */}
      <ActionImageContainer isGoal={isGoal}>
        {isGoal ? (
          <LinkedGoals key={goalId} goal={goalId} isGoal />
        ) : (
          <ActionIconContainer>
            <IconCircleBackground color={color} />
            <FastImage
              style={{
                zIndex: 2,
                width: 25,
                height: 25,
              }}
              source={image}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ActionIconContainer>
        )}
      </ActionImageContainer>
      <DetailsContainer isGoal={isGoal}>
        <View flex={1.6}>
          <Text />
          <Text bold>{user.name}</Text>
          <Text bold>{company.name}</Text>
        </View>
        <View flex={1} center>
          <CentredText bold>Actions</CentredText>
          <CentredText>{Math.ceil(user.actions)}</CentredText>
          <CentredText>{Math.ceil(company.actions)}</CentredText>
        </View>
        <View flex={1} center>
          <CentredText bold>
            CO
            <Text style={{fontSize: 7, fontWeight: 'bold'}}>2</Text>e saved
          </CentredText>
          <CentredText>{formatImpact(user.saved)}</CentredText>
          <CentredText>{formatImpact(company.saved)}</CentredText>
        </View>
      </DetailsContainer>

      {isSelected && showConfirmModal && (
        <ConfirmModal
          id={Id}
          items={items}
          removeItem={removeItem}
          change={modalClick}
          isGoal={isGoal}
          recent={recentItems}
          getData={getData}
        />
      )}
    </ResultActionContainer>
  );
}

export function ConfirmModal({
  id,
  items,
  change,
  removeItem,
  isGoal,
  general,
  recent,
  getData,
}) {
  const {Actions} = useActionsState();

  const moderatedActions = useMemo(() => {
    if (!items) {
      return [];
    }
    return items.filter((item) =>
      isGoal ? true : item.ActionId === item.ActionId,
    );
  }, [items, isGoal, id]);

  const showFilteredHeadingsMod = useMemo(() => {
    if (!general) {
      return (
        moderatedActions &&
        moderatedActions.length &&
        moderatedActions.length > 0
      );
    }
    return items && items.length && items.length > 0;
  }, [moderatedActions, items]);

  const showDetailedHeadings = useMemo(() => {
    return !general && recent && recent.length;
  }, [general, recent]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={id !== null}
      onRequestClose={() => {
        change(id);
      }}>
      <ModalBackground />
      <ModalView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <CloseButton
          onPress={() => {
            change(id);
          }}>
          {/* <Image source={close} /> */}
          <RNText
            allowFontScaling={false}
            style={{fontWeight: 'bold', fontSize: 28, color: 'gray'}}>
            X
          </RNText>
        </CloseButton>
        <Title adjustsFontSizeToFit allowFontScaling={false}>
          {general ? 'Moderated' : 'Detailed'} actions
        </Title>
        {!general ? (
          <>
            <Subtitle allowFontScaling={false}>Moderated actions</Subtitle>
            <ThickLine />
          </>
        ) : null}
        {!showFilteredHeadingsMod ? (
          <RNText allowFontScaling={false}>
            There are no actions to moderate.
          </RNText>
        ) : null}
        {/* Filtered view of moderations */}
        <ActionsContainer>
          {moderatedActions &&
            moderatedActions.map((moderation) => (
              <DetailedAction
                key={`moderation_${moderation.Id}`}
                action={moderation}
                remove={removeItem}
                color={
                  Actions.filter((act) => act.Id === moderation.ActionId)[0]
                    .Colour
                }
              />
            ))}
          {!general ? (
            <>
              <Subtitle allowFontScaling={false}>Other actions</Subtitle>
              <ThickLine />
              {!showDetailedHeadings ? (
                <RNText maxFontSizeMultiplier={1}>
                  There are no other actions.
                </RNText>
              ) : null}
              {showDetailedHeadings
                ? recent.map((moderation, i) => (
                    // <></>
                    <DetailedAction
                      key={`moderation_action_${moderation.Id}_`}
                      disableConfirm
                      action={moderation}
                      remove={removeItem}
                      color={
                        Actions.filter(
                          (act) => act.Id === moderation.ActionId,
                        )[0].Colour
                      }
                    />
                  ))
                : null}
            </>
          ) : null}
        </ActionsContainer>
      </ModalView>
    </Modal>
  );
}

const ActionsContainer = styled.ScrollView`
  width: 100%;
  padding-bottom: 25px;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 0px;
  z-index: 100;
`;

const Title = styled.Text`
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ThickLine = styled.View`
  background: black;
  width: 100%;
  height: 2px;
  margin-top: -13px;
  margin-bottom: 10px;
`;

const View = styled.View`
  text-align: ${({center}) => (center ? 'center' : 'left')};
  flex: ${({flex}) => flex};
`;

const Text = styled.Text`
  font-size: 13px;
  font-weight: ${({bold}) => (bold ? 'bold' : 'normal')};
  margin-bottom: 4.5px;
`;

const CentredText = styled(Text)`
  text-align: center;
`;

const IconCircleBackground = styled.View`
  position: absolute;
  z-index: 1;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
`;

const ActionImageContainer = styled.View`
  margin-right: 10px;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isGoal ? colors.white : 'transparent')};
  border: ${(props) =>
    props.isGoal ? `0.5px solid ${colors.placeholder}` : 'none'};
  padding: ${(props) => (props.isGoal ? '10px 10px' : '0')};
  border-radius: 10px;
  height: 100%;
`;

const ActionIconContainer = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const DetailsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isGoal ? colors.white : 'transparent')};
  border: ${(props) =>
    props.isGoal ? `0.5px solid ${colors.placeholder}` : 'none'};
  padding: ${(props) => (props.isGoal ? '0 5px' : '0')};
  border-radius: 10px;
  height: 100%;
`;

const ResultActionContainer = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 10px;
  background-color: ${(props) => (props.isGoal ? 'transparent' : colors.white)};
  border: ${(props) =>
    props.isGoal ? 'none' : `0.5px solid ${colors.placeholder}`};
  padding: ${(props) => (props.isGoal ? '0px' : '0px 10px')};
  min-height: 80px;
  margin-bottom: 15px;
  align-items: center;
  margin-top: 0;
  max-height: ${(props) => (props.isGoal ? '110px' : '130px')};
`;

export default ResultActionGoal;
