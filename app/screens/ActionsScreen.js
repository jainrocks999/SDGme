import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {Alert, Dimensions, FlatList, Linking, Text, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import {useIsConnected} from 'react-native-offline';
import {useIsFocused} from '@react-navigation/native';

import Action from '../shared/components/action';
import {ToggleView} from '../shared/components/view-toggle';
import colors from '../shared/config/colors';
import CustomSafeAreaView from '../shared/components/safe-area-view';
import {API_URL} from '../shared/config/api';
import {useUserState} from '../shared/config/user-context';
import {
  useActionsDispatch,
  useActionsState,
} from '../shared/config/actions-context';
import {LoadingContainer} from './ResultsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlert from '../shared/components/customAlert';
import {message, subject} from '../shared/config/emailMessage';

const screenWidth = Dimensions.get('window').width;
const TAB_KEYS = ['first', 'second', 'third'];

// Tab custom label component
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
    <View style={{height: 1}}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'transparent',
          fontSize: 16,
        }}>
        {props.route.title}
      </Text>
    </View>
  </View>
);

function ActionsScreen({route = undefined}) {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState();
  const [isScrollable, setIsScrollable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const {MobileToken} = useUserState();
  const {Actions, Buckets} = useActionsState();
  const dispatch = useActionsDispatch();
  const navigation = useNavigation();
  const isConnected = useIsConnected();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.changedAK && isConnected) {
      fetchActions();
      route.params.changedAK = undefined;
    }
  }, [isFocused]);

  const getRoutes = (res = Buckets) => {
    const RoutesArray = [];
    res.forEach((bucket, i) => {
      bucket.Title.length >= 10 && setIsScrollable(true);
      RoutesArray.push({
        key: TAB_KEYS[i++],
        id: bucket.Id,
        title: bucket.Title,
      });
    });
    setRoutes(RoutesArray);
  };

  const setActions = (res) => {
    // Set actions context
    dispatch({
      type: 'add-actions',
      state: res.data,
    });

    // Set routes for tabs
    getRoutes(res.data.Buckets);
    // All data is now set, set loading to false
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch/Refresh all actions
    if (isConnected) {
      fetchActions();
    } else {
      getRoutes(Buckets);
      setIsLoading(false);
    }
  }, [refreshing]);

  const fetchActions = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        'X-API': MobileToken,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/Action/GetActions`, config)
      .then((response) => {
        if (response.data.Success) {
          setActions(response);
        } else {
          Alert.alert(response.data.Message);
        }
      })
      .catch((e) => {
        if (e.response?.status === 511) {
          setModalVisible(!modalVisible);
          setEmail(e.response?.data);
          console.log('e.response?.data  :', e.response?.data);
          navigation.navigate('ChangeAccessKey');
        } else {
          getRoutes();
          setIsLoading(false);
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
              'The registered access key has been disabled.Please contact us at '
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
  const filterActions = useMemo(
    () =>
      Actions.filter((_) => {
        if (!routes) {
          return false;
        }
        if (!routes[index]) {
          return false;
        }
        if (!routes[index].id) {
          return false;
        }
        return _.Buckets.includes(routes[index].id);
      }),
    [Actions, routes, index],
  );

  const renderScene = SceneMap({
    first: ActionsRoute,
    second: ActionsRoute,
    third: ActionsRoute,
  });

  const toggleView = () => {
    setViewDetails((prev) => !prev);
  };

  function ActionsRoute() {
    const refresh = () => {
      setRefreshing(!refreshing);
    };
    const renderItem = ({item}) => (
      <View>
        <Action
          key={`action_render_item_${item.Id}`}
          id={item.Id}
          title={item.Description}
          description={item.Description}
          amount={item.Count}
          viewDetails={viewDetails}
          bgColor={item.Colour.toLowerCase()}
          image={item.Image}
          goals={item.Goals}
          setRefreshing={refresh}
        />
      </View>
    );

    return (
      <CustomSafeAreaView>
        <FlatList
          data={filterActions}
          key={`filterlist_${routes[index].id}_${
            viewDetails ? 'double' : 'single'
          }`}
          numColumns={viewDetails ? 2 : 1}
          renderItem={renderItem}
          keyExtractor={(item) => `flat_item_${item.Id}`}
          columnWrapperStyle={
            viewDetails
              ? {
                  justifyContent: 'space-between',
                  marginHorizontal: '5%',
                }
              : undefined
          }
        />
      </CustomSafeAreaView>
    );
  }

  // Tab custom TabBar
  const renderTabBar = (props) =>
    routes.length > 0 ? (
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
          scrollEnabled={isScrollable}
          style={{
            justifyContent: 'flex-start',
            width: screenWidth - 80,
            backgroundColor: null,
            border: 'null',
          }}
          tabStyle={{width: 'auto'}}
        />
        <ToggleView toggleView={toggleView} current={viewDetails} />
      </View>
    ) : (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>No Actions to display</Text>
      </View>
    );

  return (
    <CustomSafeAreaView>
      {renderCustomAlert()}
      {!isLoading ? (
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={screenWidth}
        />
      ) : (
        <LoadingContainer />
      )}
    </CustomSafeAreaView>
  );
}

export default ActionsScreen;
