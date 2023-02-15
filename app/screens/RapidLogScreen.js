import React, {useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useIsConnected} from 'react-native-offline';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components';
import RapidLog from '../shared/components/RapidLog';
import colors from '../shared/config/colors';
import CustomSafeAreaView from '../shared/components/safe-area-view';
import {API_URL, X_API_KEY} from '../shared/config/api';
import {useUserState} from '../shared/config/user-context';
import {
  useActionsDispatch,
  useActionsState,
} from '../shared/config/actions-context';
import {LoadingContainer} from './ResultsScreen';
import getDate from '../shared/functions/getDate';
import CustomAlert from '../shared/components/customAlert';
import {TextButton} from '../shared/components/typography';
import {message, subject} from '../shared/config/emailMessage';

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

function RapidLogScreen() {
  const {debounce} = useDebounce();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState();
  const [rapidActions, setRapidActions] = useState();
  const [rapidActionsCount, setRapidActionsCount] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isScrollable, setIsScrollable] = useState(false);
  const {MobileToken} = useUserState();
  const {Actions, Buckets} = useActionsState();
  const dispatch = useActionsDispatch();
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  const isFocused = useIsFocused();
  const [EnableForwardArrow, disableForwardArrow] = useState(true);
  const [EnableBackwardArrow, disableBackwardArrow] = useState(false);
  const [dateCounter, setDateCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [timesPressed, setTimesPressed] = useState(0);

  useEffect(() => {
    if (getDate(new Date()) > getDate(date)) {
      disableForwardArrow(false);
    } else disableForwardArrow(true);
    if (isConnected) {
      fetchRapidLogActions(date);
      fetchDateCounter();
    } else {
      setIsLoading(false);
    }
  }, [refreshing]);

  const checkDate = (date) => {
    const date1 = new Date();
    var isEqual = getDate(date) === getDate(date1);
    return isEqual;
  };
  const checkLastDate = (date) => {
    const lastDate = new Date(
      new Date().setDate(new Date().getDate() - dateCounter),
    );
    var isEqual = getDate(date) === getDate(lastDate);
    return isEqual;
  };

  const fetchDateCounter = async () => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    await axios
      .get(`${API_URL}/SDGme/api/Action/GetPreviousDayCount`, config)
      .then((response) => {
        setDateCounter(response.data);
      })
      .catch((e) => {
        if (e.response?.status === 511) {
          setModalVisible(!modalVisible);
          setEmail(e.response?.data);
          navigation.navigate('ChangeAccessKey');
        } else {
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
  const fetchRapidLogActions = async (selectedDate) => {
    setIsLoading(true);
    const currentDate = selectedDate || date;

    try {
      const data = {
        ActionedOn: currentDate,
      };
      const endpoint = '/SDGme/api/Action/GetDayActions';
      const response = await axios({
        method: 'post',
        url: `${API_URL + endpoint}`,
        data: data,
        headers: {
          'X-API': MobileToken,
        },
      });

      if (response.data.Success) {
        setRapidActions(response.data.Actions);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {}
  };
  const incrementDate = async () => {
    const nextDay = new Date(date.setDate(date.getDate() + 1));
    if (checkDate(date) === true) {
      disableForwardArrow(true);
      disableBackwardArrow(false);
      setDate(new Date());
      fetchRapidLogActions(new Date());
      return new Date();
    } else {
      disableBackwardArrow(false);
      setDate(nextDay);
      fetchRapidLogActions(nextDay);
    }
  };
  const decrementDate = async () => {
    if (checkLastDate(date) != true) {
      disableForwardArrow(false);
      const prevDate = new Date(date.setDate(date.getDate() - 1));
      setDate(prevDate);
      fetchRapidLogActions(prevDate);
    } else {
      // disableBackwardArrow(true);
    }
  };

  const rapidActionsLocal = [];
  const deleteRapidActionsLocal = [];

  const addAction = (id, count, initialCount) => {
    const finalCount = count - initialCount;

    var deleteItem = deleteRapidActionsLocal.find((x) => x.id == id);
    var item = rapidActionsLocal.find((x) => x.id == id);
    const newFinalCount = Math.abs(finalCount);
    if (count <= initialCount) {
      if (deleteItem === undefined) {
        deleteRapidActionsLocal.push({
          id: id,
          count: newFinalCount,
        });
      } else {
        var index = deleteRapidActionsLocal.findIndex((x) => x.id == id);
        deleteRapidActionsLocal[index].count = newFinalCount;
      }
    } else {
      if (item === undefined) {
        rapidActionsLocal.push({
          id: id,
          count: finalCount,
        });
      } else {
        var index = rapidActionsLocal.findIndex((x) => x.id == id);
        rapidActionsLocal[index].count = finalCount;
      }
    }
  };
  const removeAction = (id, count, initialCount) => {
    const finalCount = count - initialCount;

    if (count < initialCount) {
      const newFinalCount = Math.abs(finalCount);
      var deleteItem = deleteRapidActionsLocal.find((x) => x.id == id);
      if (count >= 0) {
        if (deleteItem === undefined) {
          deleteRapidActionsLocal.push({
            id: id,
            count: newFinalCount,
          });
        } else {
          var index = deleteRapidActionsLocal.findIndex((x) => x.id == id);
          deleteRapidActionsLocal[index].count = newFinalCount;
        }
      }
    } else {
      var item = rapidActionsLocal.find((x) => x.id == id);
      if (count >= 0) {
        if (item === undefined) {
          rapidActionsLocal.push({
            id: id,
            count: finalCount,
          });
        } else {
          var index = rapidActionsLocal.findIndex((x) => x.id == id);
          rapidActionsLocal[index].count = finalCount;
        }
      }
    }
  };

  const saveAction = async () => {
    setIsLoading(true);
    checkDate(date) ? setDate(new Date()) : date;
    addRapidAction();
    deleteRapidAction();
  };
  const addRapidAction = async () => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    checkDate(date) ? setDate(new Date()) : date;
    rapidActionsLocal.length > 0
      ? rapidActionsLocal.map((item) => {
          setIsLoading(true);
          const data = {
            ActionId: item.id,
            ActionedOn: checkDate(date) ? new Date() : date,
            Count: item.count,
          };
          const endpoint = '/SDGme/api/Action/SubmitAction';

          axios
            .post(`${API_URL + endpoint}`, data, config)
            .then((response) => {
              setIsLoading(false);
              if (response.data.Success) {
                setIsLoading(false);
                fetchRapidLogActions(checkDate(date) ? new Date() : date);
              } else {
                Alert.alert(response.data.Message);
              }
            })
            .catch((error) => {
              setIsLoading(false);
              console.error('erro rSubmitAction ', error);
            });
        })
      : (fetchRapidLogActions(checkDate(date) ? new Date() : date),
        setIsLoading(false));
  };
  const deleteRapidAction = async () => {
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    checkDate(date) ? setDate(new Date()) : date;
    deleteRapidActionsLocal.length > 0
      ? deleteRapidActionsLocal.map((item) => {
          setIsLoading(true);
          const data = {
            ActionId: item.id,
            ActionedOn: checkDate(date) ? new Date() : date,
            Count: item.count,
          };
          const endpoint = '/SDGme/api/Action/DeleteAction';

          axios
            .post(`${API_URL + endpoint}`, data, config)
            .then((response) => {
              setIsLoading(false);
              if (response.data.Success) {
                setIsLoading(true);
                fetchRapidLogActions(checkDate(date) ? new Date() : date);
              } else {
                Alert.alert(response.data.Message);
              }
            })
            .catch((error) => {
              setIsLoading(false);
            });
        })
      : (fetchRapidLogActions(checkDate(date) ? new Date() : date),
        setIsLoading(false));
  };
  const refresh = () => {
    setRefreshing(!refreshing);
  };

  const renderItem = ({item, index}) => (
    <View>
      <RapidLog
        key={index}
        id={item.Id}
        title={item.Description}
        description={item.Description}
        amount={item.Count}
        viewDetails={viewDetails}
        bgColor={item.Colour.toLowerCase()}
        image={item.Image}
        goals={item.Goals}
        setRefreshing={refresh}
        removeAction={removeAction}
        addAction={addAction}
      />
    </View>
  );

  //top date view
  return (
    <CustomSafeAreaView>
      {renderCustomAlert()}
      {!isLoading ? (
        <View style={{flex: 1}}>
          <DatePickerView>
            <DatePickerContainer>
              {/* <IconView disabled={EnableBackwardArrow} onPress={decrementDate}> */}
              <IconView
                disabled={checkLastDate(date) ? true : false}
                onPress={decrementDate}>
                <ArrowView>
                  <Icon
                    source={
                      checkLastDate(date)
                        ? require('../assets/rapidLog/back_arrow_grey.png')
                        : require('../assets/rapidLog/back_arrow_blue.png')
                    }
                  />
                </ArrowView>
              </IconView>
              <DateText>{checkDate(date) ? 'Today' : getDate(date)} </DateText>
              <IconView disabled={EnableForwardArrow} onPress={incrementDate}>
                <ArrowView>
                  <Icon
                    source={
                      EnableForwardArrow
                        ? require('../assets/rapidLog/Front_arrow_grey.png')
                        : require('../assets/rapidLog/Front_arrow_blue.png')
                    }
                  />
                </ArrowView>
              </IconView>
            </DatePickerContainer>
          </DatePickerView>
          <FlatList
            data={rapidActions}
            renderItem={renderItem}
            keyExtractor={(item) => item.Id}
            // ListFooterComponent={(item) => {
            //   return (
            //     <ButtonContainer>
            //       <BlueButton
            //       onPress={() => debounce(saveAction)}>
            //         <TextButton>Save</TextButton>
            //       </BlueButton>
            //       <BlueButton

            //        onPress={() => fetchRapidLogActions()}>
            //         <TextButton>Cancel</TextButton>
            //       </BlueButton>
            //     </ButtonContainer>
            //   );
            // }}
          />
          <View>
            <ButtonContainer>
              <BlueButton onPress={() => debounce(saveAction)}>
                <TextButton>Save</TextButton>
              </BlueButton>
              <BlueButton onPress={() => fetchRapidLogActions()}>
                <TextButton>Cancel</TextButton>
              </BlueButton>
            </ButtonContainer>
          </View>
        </View>
      ) : (
        <LoadingContainer />
      )}
    </CustomSafeAreaView>
  );
}

export default RapidLogScreen;
export const BackContainer = styled.View`
  margin: 0px 20px 10px 20px;
  flex-direction: row;
  height: 40px;
  align-items: center;
`;
export const DatePickerView = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const DatePickerContainer = styled.View`
  width: 100%;
  padding-horizontal: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.white};
`;
export const IconView = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;
export const ArrowView = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 30px;
  width: 30px;
`;
export const Icon = styled.Image`
  height: 30px;
  width: 30px;
`;

export const CalendarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  width: 50%;
  height: 41px;
  margin-top: 10px;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: space-between;

  width: 50%;
  height: 45px;
`;

export const DateText = styled.Text`
  color: ${colors.black};
  font-size: 16px;
`;
export const BlueButton = styled.TouchableOpacity`
  width: 45%;
  border-radius: 10px;
  align-items: center;
  height: 35px;
  justify-content: center;
  background: ${colors.primaryColor};
`;
