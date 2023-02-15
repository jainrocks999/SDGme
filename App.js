import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar, Image, Text, TextInput, Platform} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OneSignal from 'react-native-onesignal';
import {NetworkProvider, useIsConnected} from 'react-native-offline';

import ResultsScreen from './app/screens/ResultsScreen';
import InformationScreen from './app/screens/settings/InformationScreen';
import GoalsScreen from './app/screens/GoalsScreen';
import ActionsScreen from './app/screens/ActionsScreen';
import RapidLogScreen from './app/screens/RapidLogScreen';
import AuthScreen from './app/screens/AuthScreen';
import SignUpScreen from './app/screens/SignUpScreen';
import {UserProvider, useUserState} from './app/shared/config/user-context';
import colors from './app/shared/config/colors';
import {ActionsProvider} from './app/shared/config/actions-context';
import {ResultsProvider} from './app/shared/config/results-context';
import {RequestsProvider} from './app/shared/config/offline';
import SettingsScreen from './app/screens/SettingsScreen';
import ResetPasswordScreen from './app/screens/settings/ResetPasswordScreen';
import ChangeAccessKeyScreen from './app/screens/settings/ChangeAccessKey';
import ConnectionToast from './app/shared/components/connection-toast';
import OfflineQueue from './app/shared/components/offline-queue';
import TermsAndConditionsScreen from './app/screens/settings/TermsAndConditionsScreen';
import PrivacyPolicyScreen from './app/screens/settings/PrivacyPolicyScreen';
import TutorialScreen from './app/screens/TutorialScreen';
import {
  ModerationProvider,
  useModerationState,
} from './app/shared/config/moderation-context';

const Stack = createStackNavigator();

function Home() {
  const [moderation, setModeration] = useState(false);
  const isConnected = useIsConnected();

  const Tab = createBottomTabNavigator();

  const {moderationCount} = useModerationState();
  // change to commit
  useEffect(() => {
    moderationCount >= 1 ? setModeration(true) : setModeration(false);
  }, [moderationCount]);

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primaryColor,
          inactiveTintColor: colors.placeholder,
          style: {paddingTop: 6},
        }}>
        <Tab.Screen
          name="Actions"
          component={ActionsScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              let iconName;

              if (focused) {
                iconName = require('./app/assets/section-icons/actions-icon-neg.png');
              } else {
                iconName = require('./app/assets/section-icons/actions-icon.png');
              }

              return <Image source={iconName} />;
            },
          }}
        />
        <Tab.Screen
          name="RapidLog"
          component={RapidLogScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              let iconName;

              if (focused) {
                iconName = require('./app/assets/section-icons/rapid-log-blue.png');
              } else {
                iconName = require('./app/assets/section-icons/rapid-log-grey.png');
              }

              return <Image source={iconName} />;
            },
          }}
        />
        <Tab.Screen
          name="Goals"
          component={GoalsScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              let iconName;

              if (focused) {
                iconName = require('./app/assets/section-icons/goals-icon-neg.png');
              } else {
                iconName = require('./app/assets/section-icons/goals-icon.png');
              }

              return <Image source={iconName} style={{marginRight: 1}} />;
            },
          }}
        />
        <Tab.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              let iconName;
              if (focused) {
                if (moderation > 0) {
                  iconName = require('./app/assets/section-icons/results-icon-circle-neg.png');
                } else {
                  iconName = require('./app/assets/section-icons/results-icon-neg.png');
                }
              } else {
                if (moderation > 0) {
                  iconName = require('./app/assets/section-icons/results-icon-circle.png');
                } else {
                  iconName = require('./app/assets/section-icons/results-icon.png');
                }
              }

              return <Image source={iconName} />;
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => {
              let iconName;

              if (focused) {
                iconName = require('./app/assets/section-icons/settings-icon-neg.png');
              } else {
                iconName = require('./app/assets/section-icons/settings.png');
              }

              return <Image source={iconName} />;
            },
          }}
        />
      </Tab.Navigator>
      {isConnected && <OfflineQueue />}
    </>
  );
}

const NextRedirect = ({next, setNext, children}) => {
  const {MobileToken} = useUserState();
  const navigation = useNavigation();
  useEffect(() => {
    if (MobileToken && next) {
      setNext(null);
      setTimeout(() => {
        navigation.navigate(next);
      }, 500);
    }
  }, [next, navigation, MobileToken]);

  return <>{children}</>;
};

export default function App() {
  const [next, setNext] = useState();

  Text.defaultProps = {};
  Text.defaultProps.maxFontSizeMultiplier = 1.4;
  TextInput.defaultProps = {};
  TextInput.defaultProps.maxFontSizeMultiplier = 1.4;

  StatusBar.setBarStyle('dark-content', true);

  const AuthComponent = () => <AuthScreen next={next} />;

  useEffect(() => {
    OneSignal.setAppId('6daa252e-a758-4968-a657-88b6b4f268ac');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log("Prompt response:", response);
});
    OneSignal.setNotificationOpenedHandler((openResult) => {
      console.log("OneSignal: notification opened:", openResult);
      // const deepLink =
      //   Platform.OS === 'ios'
      // ? openResult.notification.additionalData.link;
      // : openResult.getNotification().getAdditionalData.link;
      setNext(openResult.notification.additionalData.link);
    });
  }, []);

  return (
    <UserProvider>
      <RequestsProvider>
        <ActionsProvider>
          <ResultsProvider>
            <ModerationProvider>
              <NavigationContainer>
                <NetworkProvider pingInBackground={true}>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      gestureEnabled: false,
                    }}>
                    {next ? (
                      <Stack.Screen
                        name="Notification"
                        component={() => (
                          <NextRedirect next={next} setNext={setNext} />
                        )}
                      />
                    ) : (
                      <>
                        <Stack.Screen name="Auth" component={AuthComponent} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                        <Stack.Screen
                          name="TutorialScreen"
                          component={TutorialScreen}
                        />
                        <Stack.Screen name="Home" component={Home} />
                        {/* Settings subpages */}
                        <Stack.Screen
                          name="Help"
                          component={InformationScreen}
                        />
                        <Stack.Screen
                          name="TermsAndConditionsScreen"
                          component={TermsAndConditionsScreen}
                        />
                        <Stack.Screen
                          name="PrivacyPolicyScreen"
                          component={PrivacyPolicyScreen}
                          options={{
                            animationEnabled: Platform.select({
                              android: false,
                              ios: true,
                            }),
                          }}
                        />
                        <Stack.Screen
                          name="ResetPassword"
                          component={ResetPasswordScreen}
                        />
                        <Stack.Screen
                          name="ChangeAccessKey"
                          component={ChangeAccessKeyScreen}
                        />
                      </>
                    )}
                  </Stack.Navigator>
                  <ConnectionToast />
                </NetworkProvider>
              </NavigationContainer>
            </ModerationProvider>
          </ResultsProvider>
        </ActionsProvider>
      </RequestsProvider>
    </UserProvider>
  );
}