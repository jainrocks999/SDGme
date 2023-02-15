import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import styled from 'styled-components';
import {LineChart} from 'react-native-chart-kit';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import CustomSafeAreaView from '../shared/components/safe-area-view';
import colors from '../shared/config/colors';
import {
  ResultsContainer,
  ResultsTabContainer,
  ResultsTableContainer,
} from '../shared/components/containers';
import ResultActionGoal from '../shared/components/result-action';
import shower from '../assets/action-icons/shower.png';
import ShareIcon from '../assets/share.svg';
import {useUserState} from '../shared/config/user-context';
import {API_URL} from '../shared/config/api';
import {
  useResultsDispatch,
  useResultsState,
} from '../shared/config/results-context';
import {formatImpact} from '../shared/functions/formatImpact';
import {useActionsState} from '../shared/config/actions-context';
import Moderation from './Moderation';
import {getImage} from '../shared/components/action-images';
import LinkedGoals from '../shared/components/linked-goals';
import {Title} from '../shared/components/typography';
import {useModerationState} from '../shared/config/moderation-context';
import {
  AllDays,
  AllMonths,
  CompanyMonth,
  IndividualDays,
  IndividualMonths,
  monthNames,
  MyMonth,
} from '../shared/config/constant-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../shared/components/customAlert';
import {message, subject} from '../shared/config/emailMessage';
// import Svg, {
//   Circle,

// } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const Labels = {
  week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  month: [1, 12, 22, 31],
  year: ['Jan', 'Apr', 'Aug', 'Dec'],
};

export function LoadingContainer() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <ActivityIndicator size="large" color={colors.links} />
    </View>
  );
}

const share = (url) => {
  const shareOptions = {
    title: 'SDGme',
    message: 'SDGme',
    url,
  };

  Share.open(shareOptions)
    .then((res) => {})
    .catch((err) => {
      err && console.log(err);
    });
};

const renderLabel = (props) => (
  <View
    style={{
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
      height: 50,
      marginTop: -10,
    }}>
    <Text
      style={{
        width: props.focused ? 110 : 100,
        color: props.focused ? colors.primaryColor : colors.placeholder,
        textDecorationLine: props.focused ? 'underline' : 'none',
        fontWeight: props.focused ? '700' : 'normal',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 15,
        overflow: 'hidden',
        lineHeight: 20,
      }}>
      {props.route.title}
    </Text>
  </View>
);

function ActivityRoute({loading: resultsLoading}) {
  const [selected, setSelected] = useState('week');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [shareUrl, setUrl] = useState('');
  const [you, setYou] = useState('');
  const [counter, setCounter] = useState(0);
  var counterVal = 0;

  const dataObject = useMemo(() => {
    const newSelected = selected.split('');
    newSelected[0] = newSelected[0].toUpperCase();
    return newSelected.join('');
  }, [selected]);

  const isWeek = useMemo(() => selected === 'week', [selected]);
  const isMonth = useMemo(() => selected === 'month', [selected]);
  const isYear = useMemo(() => selected === 'year', [selected]);

  const {Results} = useResultsState();
  const {MobileToken} = useUserState();
  const navigation = useNavigation();
  const round = (num, precision) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  };

  useEffect(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetShareSocialMediaUrl`, config)
      .then((response) => {
        response.data.Success
          ? setUrl(response.data.ShareUrl)
          : console.log('GetShareSocialMediaUrl 1', response.data);
      })
      .catch((e) => {
        if (e.response.status === 511) {
          navigation.navigate('ChangeAccessKey');
        }
      });
  }, [MobileToken, navigation]);

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: () => 'black',
    decimalPlaces: 0,
    style: {
      margin: 0,
      padding: 0,
    },
  };

  const fetchData = async () => {
    const summary = await Results[`${dataObject}Summary`];

    if (summary && Object.keys(summary) && Object.keys(summary).length >= 1) {
      setLoading(false);
      //setCounter(0)
      counterVal = 0;
      const data1 = {
        labels: Labels[selected],
        datasets: [
          {
            data: [],
            color: () => colors.primaryColor,
            // color: () => 'transparent',
            impact: 0,
          },
          {
            data: [],
            color: () => '#90FF71',
            impact: 0,
          },
        ],
      };

      if (selected === 'week') {
        counterVal = 0;
        IndividualDays.forEach((selDay, idx) => {
          const date = new Date();
          const todaysIndex = date.getDay();
          setYou(
            round(
              Results[`${dataObject}Summary`][`My${dataObject}Actions`] /
                todaysIndex,
              0,
            ),
          );
          if (idx < todaysIndex) {
            data1.datasets[0].data.push(summary[selDay]);
          }
        });
        if (data1.datasets[0].data.length < 7) {
          const value = 7 - data1.datasets[0].data.length;
          for (let i = 0; i < value; i++) {
            data1.datasets[0].data.push(null);
          }
        }
        AllDays.forEach((selDay, idx) => {
          const date = new Date();
          const todaysIndex = date.getDay();
          if (idx < todaysIndex) {
            data1.datasets[1].data.push(summary[selDay]);
          }
        });
        if (data1.datasets[1].data.length < 7) {
          const value = 7 - data1.datasets[1].data.length;
          for (let i = 0; i < value; i++) {
            data1.datasets[1].data.push(null);
          }
        }
        data1.datasets[0].impact = summary.MyWeekImpact;
        data1.datasets[1].impact = summary.AvgWeekImpact;
      } else if (selected === 'month') {
        const date = new Date();
        const todaysIndex = date.getDate();
        setYou(
          round(
            Results[`${dataObject}Summary`][`My${dataObject}Actions`] /
              todaysIndex,
            0,
          ),
        );
        counterVal = 0;
        MyMonth.forEach((selDay, idx) => {
          if (idx < todaysIndex) {
            data1.datasets[0].data.push(summary[selDay]);
          }
        });
        if (data1.datasets[0].data.length < 31) {
          const value = 30 - data1.datasets[0].data.length;
          for (let i = 0; i < value; i++) {
            data1.datasets[0].data.push(null);
          }
        }
        CompanyMonth.forEach((selDay, idx) => {
          if (idx < todaysIndex) {
            data1.datasets[1].data.push(summary[selDay]);
          }
        });
        if (data1.datasets[0].data.length < 31) {
          const value = 31 - data1.datasets[1].data.length;
          for (let i = 0; i < value; i++) {
            data1.datasets[1].data.push(null);
          }
        }
        data1.datasets[0].impact = summary.MyMonthImpact;
        data1.datasets[1].impact = summary.AvgMonthImpact;
      } else {
        IndividualMonths.forEach((selDay, idx) => {
          const date = new Date();
          const todaysIndex = date.getMonth();

          const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          const firstDate = new Date(new Date().getFullYear(), 0, 1);
          const secondDate = new Date();
          const diffDays = Math.round(
            Math.abs((firstDate - secondDate) / oneDay),
          );
          setYou(
            round(
              Results[`${dataObject}Summary`][`My${dataObject}Actions`] /
                diffDays,
              0,
            ),
          );

          if (idx <= todaysIndex) {
            data1.datasets[0].data.push(summary[selDay]);
          }
        });
        if (data1.datasets[0].data.length < 12) {
          const value = 12 - data1.datasets[0].data.length;
          for (let i = 0; i < value; i++) {
            data1.datasets[0].data.push(null);
          }
        }
        AllMonths.forEach((selDay, idx) => {
          const date = new Date();
          const todaysIndex = date.getMonth();
          if (idx <= todaysIndex) {
            data1.datasets[1].data.push(summary[selDay]);
          }
        });
        if (data1.datasets[1].data.length < 12) {
          const value = 12 - data1.datasets[1].data.length;
          for (let i = 0; i < value; i++) {
            data1.datasets[1].data.push(null);
          }
        }
        data1.datasets[0].impact = summary.MyYearImpact;
        data1.datasets[1].impact = summary.AvgYearImpact;
      }
      setLoading(false);

      setData(data1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Results, dataObject, selected]);

  if (loading || resultsLoading) {
    return <LoadingContainer />;
  }

  return (
    <ResultsContainer>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
        }}>
        <ResultsTabContainer
          selected={isWeek}
          onPress={() => setSelected('week')}>
          <ResultsTabText selected={isWeek}>Week</ResultsTabText>
        </ResultsTabContainer>
        <ResultsTabContainer
          selected={isMonth}
          onPress={() => setSelected('month')}>
          <ResultsTabText selected={isMonth}>Month</ResultsTabText>
        </ResultsTabContainer>
        <ResultsTabContainer
          selected={isYear}
          onPress={() => setSelected('year')}>
          <ResultsTabText selected={isYear}>Year</ResultsTabText>
        </ResultsTabContainer>
        <TouchableOpacity
          onPress={() => share(shareUrl)}
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            right: 10,
          }}>
          <ShareIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <ResultsActivityContainer>
        {selected === 'month' && (
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '500',
              color: colors.placeholder,
            }}>
            {monthNames[new Date().getMonth()]}
          </Text>
        )}
        {data && data.datasets[0].data.length >= 1 && !loading && (
          <LineChart
            withVerticalLines={false}
            data={data}
            withDots
            getDotProps={(
              dataPoint,
              index,
              item = data && data.datasets[0].data,
              item1 = data && data.datasets[1].data,
            ) => {
              counterVal = counterVal + 1;
              var idx = 1;
              if (counterVal <= data.datasets[0].data.length) {
                idx = 0;
              }
              return {
                r: '4',
                strokeWidth: '1',
                stroke:
                  dataPoint === null
                    ? `rgba(0, 0, 0, 0)` // make it transparent
                    : data.datasets[idx].color(),
                fill:
                  dataPoint === null
                    ? `rgba(0, 0, 0, 0)` // make it transparent
                    : data.datasets[idx].color(),
              };
            }}
            width={screenWidth - 80}
            height={220}
            chartConfig={chartConfig}
          />
        )}
        <ResultsTableContainer>
          <ResultsTableRow>
            <View
              style={{
                fontSize: 10,
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}></View>
            <ColumnItem style={{fontSize: 10}}>Actions complete/day</ColumnItem>
            <ColumnItem style={{fontSize: 10}}>
              CO<Text style={{fontSize: 6}}>2</Text>e saved
            </ColumnItem>
          </ResultsTableRow>
          <ResultsTableRow>
            <LgColumnItem>
              <ColorSquare color={colors.primaryColor} />
              <LgColumnItemText>You</LgColumnItemText>
            </LgColumnItem>
            <ColumnItem>
              {!loading &&
                // Results[`${dataObject}Summary`][`My${dataObject}Actions`]}
                round(you, 2)}
            </ColumnItem>
            <ColumnItem>
              {!loading &&
                formatImpact(
                  Results[`${dataObject}Summary`][`My${dataObject}Impact`],
                )}
            </ColumnItem>
          </ResultsTableRow>
          <ResultsTableRow>
            <LgColumnItem>
              <ColorSquare color="#90FF71" />
              <LgColumnItemText>Average Saver</LgColumnItemText>
            </LgColumnItem>
            <ColumnItem>
              {!loading &&
                Results[`${dataObject}Summary`][`Avg${dataObject}Actions`]}
            </ColumnItem>
            <ColumnItem>
              {!loading &&
                formatImpact(
                  Results[`${dataObject}Summary`][`Avg${dataObject}Impact`],
                )}
            </ColumnItem>
          </ResultsTableRow>
        </ResultsTableContainer>
      </ResultsActivityContainer>
      <LatestSubmittedActions MobileToken={MobileToken} />
    </ResultsContainer>
  );
}

function LatestSubmittedActions({MobileToken}) {
  const [actions, setActions] = useState([]);
  const {Actions} = useActionsState();
  const [showMore, setShowMore] = useState(false);

  const filterActions = (id) => Actions.filter((action) => action.Id === id);

  useEffect(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetLatestActions`, config)
      .then((response) => {
        response.data.Success
          ? setActions(response.data.Actions)
          : console.log('GetLatestActions 1 : ', response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [MobileToken]);

  function SubmittedAction({action}) {
    return (
      <SubmittedActionContainer>
        <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
          <ActionImageContainer style={{backgroundColor: action.Colour}}>
            <FastImage
              style={{
                zIndex: 2,
                width: 50,
                height: 50,
              }}
              source={getImage(action.Image)}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ActionImageContainer>
          <ActionName>{action.Description}</ActionName>
        </View>
        <ImageContainer>
          {action.Goals.map((goal, idx) => (
            <LinkedGoals key={`linked_goals_${idx}`} goal={goal} isGoal />
          ))}
        </ImageContainer>
      </SubmittedActionContainer>
    );
  }
  if (!actions) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <View style={{marginVertical: 10}}>
        <Title normal center>
          Your latest actions
        </Title>
      </View>
      {actions.map((action, idx) => {
        if (idx >= 2 && !showMore) {
          return <></>;
        }
        const sel = filterActions(action.Id)[0];
        return (
          <SubmittedAction
            key={`submitted_action_${action.Id}_${Math.random()}`}
            action={sel}
          />
        );
      })}
      {!showMore && actions.length > 2 && (
        <TouchableOpacity
          onPress={() => setShowMore(true)}
          style={{marginBottom: 10}}>
          <Title normal center>
            Show more
          </Title>
        </TouchableOpacity>
      )}
    </>
  );
}

function ActionsRoute({refresh, loading: resultsLoading}) {
  const [selected, setSelected] = useState('week');
  const [state, setState] = useState();
  const [shareUrl, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const isWeek = selected === 'week';
  const isMonth = selected === 'month';
  const isYear = selected === 'year';

  const {Results} = useResultsState();
  const {Actions} = useActionsState();
  const {MobileToken} = useUserState();
  // const [refresh, refreshValue] = useRefresh();

  const getResultsData = useCallback(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetShareSocialMediaUrl`, config)
      .then((response) =>
        response.data.Success
          ? setUrl(response.data.ShareUrl)
          : console.log('GetShareSocialMediaUrl 3 : ', response.data),
      )
      .catch((error) => console.error(error));
  }, [MobileToken]);

  useEffect(() => {
    getResultsData();
  }, []);

  const dataObject = useMemo(() => {
    const newSelected = selected.split('');
    newSelected[0] = newSelected[0].toUpperCase();
    return newSelected.join('');
  }, [selected]);

  const actionDataSort = (actions) => {
    let data = [];
    Object.keys(actions).forEach((a) => {
      const action = actions[a];
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
      const currentAction = Actions.filter((act) => act.Id == a)[0];
      act.color = currentAction.Colour.toLowerCase();
      act.Id = currentAction.Id;
      act.image = getImage(currentAction.Image);
      act.actionId = currentAction.Id;
      act.user.actions = action[`My${dataObject}Actions`];
      act.user.saved = action[`My${dataObject}Impact`];
      act.company.actions = action[`Avg${dataObject}Actions`];
      act.company.saved = action[`Avg${dataObject}Impact`];
      return data.push(act);
    });

    data = data.sort((a, b) => {
      if (a.user.actions === b.user.actions) {
        return a.user.saved > b.user.saved ? -1 : 1;
      }
      return a.user.actions > b.user.actions ? -1 : 1;
    });
    data = data.sort((a, b) => {
      if (a.user.actions > 0 || b.user.actions > 0) {
        return 0;
      }
      if (a.company.actions === b.company.actions) {
        return a.company.saved > b.company.saved ? -1 : 1;
      }
      return a.company.actions > b.company.actions ? -1 : 1;
    });
    return data;
  };

  useEffect(() => {
    setLoading(true);
    const actions = Results?.Actions;
    if (actions && Object.keys(actions) && Object.keys(actions).length >= 1) {
      const data = actionDataSort(actions);
      setState(data);
      setLoading(false);
    }
  }, [Actions, Results, dataObject, selected]);

  if (loading || resultsLoading) {
    return <LoadingContainer />;
  }

  return (
    <ResultsContainer>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <ResultsTabContainer
          selected={isWeek}
          onPress={() => setSelected('week')}>
          <ResultsTabText selected={isWeek}>Week</ResultsTabText>
        </ResultsTabContainer>
        <ResultsTabContainer
          selected={isMonth}
          onPress={() => setSelected('month')}>
          <ResultsTabText selected={isMonth}>Month</ResultsTabText>
        </ResultsTabContainer>
        <ResultsTabContainer
          selected={isYear}
          onPress={() => setSelected('year')}>
          <ResultsTabText selected={isYear}>Year</ResultsTabText>
        </ResultsTabContainer>
        <TouchableOpacity
          onPress={() => share(shareUrl)}
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            right: 10,
          }}>
          <ShareIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <ResultsActionsContainer contentContainerStyle={{marginTop: -10}}>
        {state &&
          state.map((act, i) => (
            <ResultActionGoal
              data={act}
              key={`result_action_goal_${act.Id}`}
              refreshData={refresh}
            />
          ))}
      </ResultsActionsContainer>
    </ResultsContainer>
  );
}

function GoalsRoute({refresh, loading: resultsLoading}) {
  const [selected, setSelected] = useState('week');
  const [state, setState] = useState();
  const [shareUrl, setUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const isWeek = selected === 'week';
  const isMonth = selected === 'month';
  const isYear = selected === 'year';

  const {Results} = useResultsState();
  const {Actions} = useActionsState();
  const {MobileToken} = useUserState();

  const dataObject = useMemo(() => {
    const newSelected = selected.split('');
    newSelected[0] = newSelected[0].toUpperCase();
    return newSelected.join('');
  }, [selected]);

  const getData = useCallback(() => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetShareSocialMediaUrl`, config)
      .then((response) =>
        response.data.Success
          ? setUrl(response.data.ShareUrl)
          : console.log('GetShareSocialMediaUrl 2 : ', response.data),
      )
      .catch((error) => console.error(error));
  }, [MobileToken]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (Actions && Actions.length >= 1) {
      const goalIds = [];
      let goals = [];
      Actions.forEach((action) => {
        action.Goals.forEach((a) => {
          if (goalIds.indexOf(a) === -1) {
            goalIds.push(a);
            if (
              Results?.Goals === undefined ||
              !Object.keys(Results.Goals).includes(a.toString()) ||
              !Object.keys(Results.Goals[a]).indexOf([`My${dataObject}Actions`])
            ) {
              return;
            }
            goals.push({
              user: {
                name: 'You',
                actions: Results.Goals[a][`My${dataObject}Actions`],
                saved: Results.Goals[a][`My${dataObject}Impact`],
              },
              company: {
                name: 'Average Saver',
                actions: Results.Goals[a][`Avg${dataObject}Actions`],
                saved: Results.Goals[a][`Avg${dataObject}Impact`],
              },
              goalId: a,
            });
          }
        });
      });
      goals = goals.sort((a, b) => (a.goalId > b.goalId ? 1 : -1));
      setState(goals);
      setLoading(false);
    }
  }, [Actions, selected, Results, dataObject]);

  if (loading || resultsLoading) {
    return <LoadingContainer />;
  }

  return (
    <ResultsContainer>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <ResultsTabContainer
          selected={isWeek}
          onPress={() => setSelected('week')}>
          <ResultsTabText selected={isWeek}>Week</ResultsTabText>
        </ResultsTabContainer>
        <ResultsTabContainer
          selected={isMonth}
          onPress={() => setSelected('month')}>
          <ResultsTabText selected={isMonth}>Month</ResultsTabText>
        </ResultsTabContainer>
        <ResultsTabContainer
          selected={isYear}
          onPress={() => setSelected('year')}>
          <ResultsTabText selected={isYear}>Year</ResultsTabText>
        </ResultsTabContainer>
        <TouchableOpacity
          onPress={() => share(shareUrl)}
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            right: 10,
          }}>
          <ShareIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <ResultsActionsContainer contentContainerStyle={{marginTop: -10}}>
        {state &&
          state.map((g, i) => (
            <ResultActionGoal
              data={g}
              key={`result_${i}_${g.goalId}_${g.actionId || '0'}`}
              isGoal
              refreshData={refresh}
            />
          ))}
      </ResultsActionsContainer>
    </ResultsContainer>
  );
}

function ResultsScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Activity'},
    {key: 'second', title: 'Actions'},
    {key: 'third', title: 'Goals'},
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const {MobileToken} = useUserState();
  const {Actions} = useActionsState();
  const {moderationCount} = useModerationState();
  const dispatch = useResultsDispatch();
  const {loading} = useResultsState();
  const navigation = useNavigation();
  function _ActionsRoute() {
    return <ActionsRoute loading={loading} refresh={fetchActionsSummary} />;
  }
  function _GoalsRoute() {
    return <GoalsRoute loading={loading} refresh={fetchActionsSummary} />;
  }
  function _ActivityRoute() {
    return <ActivityRoute loading={loading} />;
  }

  const renderScene = SceneMap({
    first: _ActivityRoute,
    second: _ActionsRoute,
    third: _GoalsRoute,
  });

  const setActionsSummary = (res) => {
    dispatch({
      type: 'add-results',
      state: res.data,
    });
  };

  const fetchActionsSummary = () => {
    dispatch({
      type: 'set-loading',
      state: true,
    });
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetActionSummary`, config)
      .then((response) => {
        response.status === 200
          ? setActionsSummary(response)
          : console.log('GetActionSummary : ', response.data);
        // : Alert.alert(response.data.Message)
        dispatch({
          type: 'set-loading',
          state: false,
        });
      })
      .catch((e) => {
        if (e.response.status === 511) {
          setModalVisible(!modalVisible);
          setEmail(e.response?.data);
          navigation.navigate('ChangeAccessKey');
        }
      });
  };
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
  useEffect(() => {
    fetchActionsSummary();
  }, [Actions, moderationCount]);

  const renderTabBar = (props) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        border: null,
      }}>
      <TabBar
        {...props}
        getLabelText={({route}) => route.title}
        activeColor={colors.black}
        inactiveColor={colors.primaryColor}
        indicatorStyle={{backgroundColor: null}}
        renderLabel={renderLabel}
        style={{
          justifyContent: 'flex-start',
          width: screenWidth - 80,
          backgroundColor: null,
          border: 'null',
        }}
      />
      <Moderation />
    </View>
  );

  return (
    <CustomSafeAreaView>
      {renderCustomAlert()}
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={screenWidth}
      />
    </CustomSafeAreaView>
  );
}

const ResultsTabText = styled.Text`
  color: ${colors.placeholder};
  font-weight: ${({selected}) => (selected ? 'bold' : 'normal')};
`;

const ResultsActivityContainer = styled.View`
  background: ${colors.white};
  border-radius: 10px;
  border: 0.5px solid ${colors.placeholder};
  padding: 10px 0;
`;

const ResultsActionsContainer = styled.ScrollView`
  border-radius: 10px;
  padding: 10px 0;
  height: 100%;
`;

const ResultsTableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const LgColumnItem = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
`;

const LgColumnItemText = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

const ColumnItem = styled.Text`
  flex: 1;
  text-align: center;
  font-size: 12px;
`;

const ColorSquare = styled.View`
  background-color: ${({color}) => color};
  width: 10px;
  height: 10px;
  margin-right: 10px;
`;

const SubmittedActionContainer = styled.View`
  background-color: ${colors.labelGrey};
  border-radius: 10px;
  margin-bottom: 5px;
  align-items: center;
  padding: 10px;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
  padding-left: 10%;
`;

const ActionImageContainer = styled.View`
  width: 50px;
  align-items: center;
`;

const ActionName = styled.Text`
  padding: 5px;
  align-self: center;
  flex: 1;
`;

export default ResultsScreen;
