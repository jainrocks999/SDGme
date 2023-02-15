/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  Dimensions,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';
import GestureRecognizer from 'react-native-swipe-gestures';
import styled from 'styled-components';
import {
  GreenBar,
  HeaderText,
  InformationHeader,
  InformationScrollView,
  TitleText,
} from '../shared/components/goals-information';
import {GoalForDashboard} from '../shared/components/linked-goals';
import CustomSafeAreaView from '../shared/components/safe-area-view';
import {API_URL} from '../shared/config/api';
import {useUserState} from '../shared/config/user-context';
import ResultActionGoal from '../shared/components/result-action';
import shower from '../assets/action-icons/shower.png';
import chevron from '../assets/chevron.png';
import {useActionsState} from '../shared/config/actions-context';
import {getImage} from '../shared/components/action-images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../shared/components/customAlert';
import {message, subject} from '../shared/config/emailMessage';

const goals = [
  'no-poverty.png',
  'zero-hunger.png',
  'good-health.png',
  'education.png',
  'gender-equality.png',
  'water.png',
  'clean-energy.png',
  'economic.png',
  'infrastructure.png',
  'inequalities.png',
  'sustainable-cities.png',
  'responsible.png',
  'climate-action.png',
  'below-water.png',
  'life-land.png',
  'peace.png',
  'partnerships.png',
];

const goalColors = [
  '#E5233D',
  '#DEA73A',
  '#4CA146',
  '#C7202E',
  '#EF402C',
  '#27BFE5',
  '#FBC414',
  '#A21C43',
  '#F26A2D',
  '#DE1868',
  '#F99D2A',
  '#BF8D2C',
  '#407F46',
  '#1E97D4',
  '#5ABA47',
  '#146A9F',
  '#15496B',
];

function GoalsScreen() {
  const [showingInfo, setShowingInfo] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(0);
  const [actionData, setActionData] = useState();
  const [SDGInfo, setSDGInfo] = useState({});
  const [loadingCount, setLoadingCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const {MobileToken} = useUserState();
  const navigation = useNavigation();

  const getData = useCallback(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };

    axios
      .get(`${API_URL}/SDGme/api/Action/GetActionSummary`, config)
      .then((response) => {
        setActionData(response.data.Actions);
      })
      .catch((e) => {
        // getName();
        if (e.response.status === 511) {
          navigation.navigate('ChangeAccessKey');
        }
      });
  }, [MobileToken, navigation]);

  useEffect(() => {
    // call api for information here
    getData();
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetSdgInformation`, config)
      .then((response) => {
        setSDGInfo(response.data);
      })
      .catch((e) => {
        if (e.response.status === 511) {
          setModalVisible(!modalVisible);
          setEmail(e.response?.data);
          navigation.navigate('ChangeAccessKey');
        }
      });
  }, [MobileToken, navigation]);
  function renderCustomAlert() {
    if (modalVisible) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            width: 200,
          }}>
          <CustomAlert
            modalVisible={modalVisible}
            message={
              'The registered access key has been disabled. Please contact us at '
            }
            insideMessage_1={email}
            onInsideMessage_1_Press={() =>
              Linking.openURL(
                `mailto:${email}?subject=${subject}&body=${message}`,
              )
            }
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      );
    }
  }
  const handleGoalPress = (goal) => {
    setLoadingCount(0);
    setSelectedGoal(goal);
    setShowingInfo(true);
  };
  const backActionHandler = () => {
    setShowingInfo(false);

    return true;
  };

  useBackHandler(backActionHandler);

  return (
    <>
      {showingInfo ? (
        <GoalInformation
          goal={selectedGoal}
          onBackButtonPress={setShowingInfo}
          actionData={actionData}
          SDGInfo={SDGInfo}
          navigation={navigation}
        />
      ) : (
        <CustomSafeAreaView>
          {renderCustomAlert()}
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'stretch',
              justifyContent: 'space-evenly',
              marginRight: 5,
              marginVertical: 10,
            }}>
            {goals.map((_, index) => (
              <Pressable
                style={{marginBottom: 10}}
                onPress={() => handleGoalPress(index + 1)}
                key={`goal_${index}`}>
                <GoalForDashboard
                  goal={index + 1}
                  key={index + 1}
                  onLoad={() => setLoadingCount(loadingCount + 1)}
                />
              </Pressable>
            ))}

            {/* 18th Goal */}
            <View
              style={{
                width: 110,
                height: 110,
                marginBottom: 5,
                marginLeft: 5,
              }}
            />
          </ScrollView>
        </CustomSafeAreaView>
      )}
    </>
  );
}

function GoalInformation({
  goal,
  onBackButtonPress,
  actionData,
  SDGInfo,
  navigation,
}) {
  const [selectedGoal, setSelectedGoal] = useState(goal);

  const onSwipeLeft = () => {
    if (selectedGoal < 17) {
      setSelectedGoal(selectedGoal + 1);
    }
  };

  const onSwipeRight = () => {
    if (selectedGoal > 1) {
      setSelectedGoal(selectedGoal - 1);
    }
  };

  const [loaded, setLoaded] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackButtonContainer>
        <Pressable
          onPress={() => {
            onBackButtonPress();
          }}>
          <Chevron source={chevron} resizeMode="contain" />
        </Pressable>
      </BackButtonContainer>
      <InformationScrollView>
        <GestureRecognizer
          style={{
            minHeight: Dimensions.get('window').height * 0.9,
          }}
          onSwipeLeft={() => onSwipeLeft()}
          onSwipeRight={() => onSwipeRight()}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              alignSelf: 'stretch',
              opacity: loaded ? 1 : 0,
            }}>
            <GoalForDashboard
              goal={selectedGoal}
              isGoal
              onLoad={() => {
                setLoaded(true);
              }}
            />
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
              }}>
              <TitleText style={{minHeight: 110, flex: 1}}>
                {SDGInfo[selectedGoal - 1]?.ShortDescription}
              </TitleText>
            </View>
          </View>
          <InformationHeader>
            <GreenBar color={goalColors[selectedGoal - 1]} />
            <HeaderText color={goalColors[selectedGoal - 1]}>
              Information
            </HeaderText>
          </InformationHeader>
          <Text style={{fontSize: 15}}>
            {SDGInfo[selectedGoal - 1]?.Information}
          </Text>
          <InformationHeader>
            <GreenBar color={goalColors[selectedGoal - 1]} />
            <HeaderText color={goalColors[selectedGoal - 1]}>
              Your Contributions
            </HeaderText>
          </InformationHeader>
          <ActionsRoute
            navigation={navigation}
            goalInput={selectedGoal}
            actionData={actionData}
          />
        </GestureRecognizer>
      </InformationScrollView>
    </SafeAreaView>
  );
}

function ActionsRoute({goalInput, actionData, navigation}) {
  const {Actions} = useActionsState();
  const [userActions, setUserActions] = useState(null);

  const [showFullList, setShowFullList] = useState(false);

  const {MobileToken} = useUserState();

  useEffect(() => {
    setShowFullList(false);
  }, [goalInput]);

  const getData = useCallback(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };

    axios
      .get(
        `${API_URL}/SDGme/api/Action/GetModerationItems?sdgGoal=${goalInput}`,
        config,
      )
      .then((response) => {
        setUserActions(response.data.RecentActions);
      })
      .catch((e) => {
        // getName();
        if (e.response.status === 511) {
          navigation.navigate('ChangeAccessKey');
        }
      });
  }, [goalInput, MobileToken, navigation]);

  useEffect(() => {
    getData();
  }, [goalInput, navigation]);

  const formatData = useMemo(() => {
    if (userActions && userActions.length) {
      const actionIds = userActions.reduce((acc = [], cur) => {
        acc.push(cur.ActionId);

        return acc;
      }, []);
      const data = [];

      Array.from(new Set(actionIds)).forEach((action) => {
        const actionDetails = Actions.find((_) => _.Id === action);
        const actionStats = actionData[action];
        // user, company, image, color, goalId, Id, actionId
        const act = {
          user: {
            name: 'You',
            actions: 0,
            saved: 0,
          },
          company: {
            name: 'Average Saver',
            actions: 0,
            saved: 0,
          },
          image: shower,
          color: 'tomato',
        };
        act.color = actionDetails.Colour.toLowerCase();
        act.Id = actionDetails.Id;
        act.image = getImage(actionDetails.Image);
        act.user.actions = actionStats?.MyYearActions || 0;
        act.user.saved = actionStats?.MyYearImpact || 0;
        act.company.actions = actionStats?.AvgYearActions || 0;
        act.company.saved = actionStats?.AvgYearImpact || 0;
        data.push(act);
      });
      return data;
    }
    return [];
  }, [Actions, actionData, goalInput, userActions]);

  return (
    <ResultsActionsContainer contentContainerStyle={{marginTop: -10}}>
      {formatData.map((act, i) => {
        if (showFullList || i <= 1) {
          return (
            <ResultActionGoal
              data={act}
              key={`action_${act.Id}_${i}_${act.color}`}
              showConfirmModal={false}
            />
          );
        }
      })}
    </ResultsActionsContainer>
  );
}

const ResultsActionsContainer = styled.ScrollView`
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px 0;
  height: 100%;
`;

const BackButtonContainer = styled.View`
  align-self: stretch;
  align-items: flex-start;
`;

const Chevron = styled.Image`
  width: 50px;
  height: 30px;
  transform: rotate(180deg);
`;

export default GoalsScreen;
