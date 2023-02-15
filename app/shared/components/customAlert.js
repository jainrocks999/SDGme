import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
  Linking,
} from 'react-native';
import colors from '../config/colors';
const DefaultAlert = (props) => {
  const [androidDefaults, setAndroidDefaults] = useState({
    container: {
      backgroundColor:
        (props.android &&
          props.android.container &&
          props.android.container.backgroundColor) ||
        '#FAFAFA',
    },
    title: {
      color:
        (props.android && props.android.title && props.android.title.color) ||
        '#000000',
      fontFamily:
        (props.android &&
          props.android.title &&
          props.android.title.fontFamily) ||
        'System',
      fontSize:
        (props.android &&
          props.android.title &&
          props.android.title.fontSize) ||
        22,
      fontWeight:
        (props.android &&
          props.android.title &&
          props.android.title.fontWeight) ||
        'bold',
    },
    message: {
      color:
        (props.android &&
          props.android.message &&
          props.android.message.color) ||
        '#000000',
      fontFamily:
        (props.android &&
          props.android.message &&
          props.android.message.fontFamily) ||
        'System',
      fontSize:
        (props.android &&
          props.android.message &&
          props.android.message.fontSize) ||
        14,
      fontWeight:
        (props.android &&
          props.android.message &&
          props.android.message.fontWeight) ||
        'normal',
      zIndex:
        (props.android &&
          props.android.message &&
          props.android.message.zIndex) ||
        0,
    },
    insideMessage_1: {
      color:
        (props.android &&
          props.android.insideMessage_1 &&
          props.android.insideMessage_1.color) ||
        '#000000',
      fontFamily:
        (props.android &&
          props.android.insideMessage_1 &&
          props.android.insideMessage_1.fontFamily) ||
        'System',
      fontSize:
        props.android &&
        props.android.insideMessage_1 &&
        props.android.insideMessage_1.fontSize,
      fontWeight:
        (props.android &&
          props.android.insideMessage_1 &&
          props.android.insideMessage_1.fontWeight) ||
        'normal',
      zIndex:
        (props.android &&
          props.android.insideMessage_1 &&
          props.android.insideMessage_1.zIndex) ||
        0,
    },
    insideMessage_2: {
      color:
        (props.android &&
          props.android.insideMessage_2 &&
          props.android.insideMessage_2.color) ||
        '#000000',
      fontFamily:
        (props.android &&
          props.android.insideMessage_2 &&
          props.android.insideMessage_2.fontFamily) ||
        'System',
      fontSize:
        (props.android &&
          props.android.insideMessage_2 &&
          props.android.insideMessage_2.fontSize) ||
        14,
      fontWeight:
        (props.android &&
          props.android.insideMessage_2 &&
          props.android.insideMessage_2.fontWeight) ||
        'normal',
      zIndex:
        (props.android &&
          props.android.insideMessage_2 &&
          props.android.insideMessage_2.zIndex) ||
        0,
    },
    button: {
      color: colors.links,
      // color: '#387ef5',
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '600',
      textTransform: 'uppercase',
      backgroundColor: 'transparent',
    },
  });
  const [iOSDefaults, setIOSDefaults] = useState({
    container: {
      backgroundColor:
        (props.ios &&
          props.ios.container &&
          props.ios.container.backgroundColor) ||
        '#F6F6F7',
    },
    title: {
      color:
        (props.ios && props.ios.title && props.ios.title.color) || '#000000',
      fontFamily:
        (props.ios && props.ios.title && props.ios.title.fontFamily) ||
        'System',
      fontSize:
        (props.ios && props.ios.title && props.ios.title.fontSize) || 17,
      fontWeight:
        (props.ios && props.ios.title && props.ios.title.fontWeight) || '600',
    },
    message: {
      color:
        (props.ios && props.ios.message && props.ios.message.color) ||
        '#000000',
      fontFamily:
        (props.ios && props.ios.message && props.ios.message.fontFamily) ||
        'System',
      fontSize:
        (props.ios && props.ios.message && props.ios.message.fontSize) || 13,
      fontWeight:
        (props.ios && props.ios.message && props.ios.message.fontWeight) ||
        'normal',
    },
    insideMessage_1: {
      color:
        (props.ios &&
          props.ios.insideMessage_1 &&
          props.ios.insideMessage_1.color) ||
        '#000000',
      fontFamily:
        (props.ios &&
          props.ios.insideMessage_1 &&
          props.ios.insideMessage_1.fontFamily) ||
        'System',
      fontSize:
        (props.ios &&
          props.ios.insideMessage_1 &&
          props.ios.insideMessage_1.fontSize) ||
        13,
      fontWeight:
        (props.ios &&
          props.ios.insideMessage_1 &&
          props.ios.insideMessage_1.fontWeight) ||
        'normal',
    },
    insideMessage_2: {
      color:
        (props.ios &&
          props.ios.insideMessage_2 &&
          props.ios.insideMessage_2.color) ||
        '#000000',
      fontFamily:
        (props.ios &&
          props.ios.insideMessage_2 &&
          props.ios.insideMessage_2.fontFamily) ||
        'System',
      fontSize:
        (props.ios &&
          props.ios.insideMessage_2 &&
          props.ios.insideMessage_2.fontSize) ||
        13,
      fontWeight:
        (props.ios &&
          props.ios.insideMessage_2 &&
          props.ios.insideMessage_2.fontWeight) ||
        'normal',
    },

    button: {
      color: '#387ef5',
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '700',
      textTransform: 'none',
      backgroundColor: 'transparent',
    },
  });
  const AndroidButtonBox = () => {
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(1);
    const buttonProps =
      props.buttons && props.buttons.length > 0 ? props.buttons : [{}];

    return (
      <View
        style={[
          styles.androidButtonGroup,
          {
            flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column',
          },
        ]}
        onLayout={(e) => {
          if (e.nativeEvent.layout.height > 60) setButtonLayoutHorizontal(0);
        }}>
        {buttonProps.map((item, index) => {
          if (index > 2) return null;
          const alignSelfProperty =
            buttonProps.length > 2 &&
            index === 0 &&
            buttonLayoutHorizontal === 1
              ? 'flex-start'
              : 'flex-end';
          let defaultButtonText = 'OK';
          if (buttonProps.length > 2) {
            if (index === 0) defaultButtonText = 'ASK ME LATER';
            else if (index === 1) defaultButtonText = 'CANCEL';
          } else if (buttonProps.length === 2 && index === 0)
            defaultButtonText = 'CANCEL';
          return (
            <View
              style={[
                styles.androidButton,
                index === 0 && buttonLayoutHorizontal === 1 ? {flex: 1} : {},
              ]}>
              <Pressable
                onPress={() => {
                  props.setModalVisible(false);
                  if (item.func && typeof item.func === 'function') item.func();
                }}
                style={[
                  {
                    alignSelf: alignSelfProperty,
                  },
                ]}>
                <View
                  style={[
                    styles.androidButtonInner,
                    {
                      backgroundColor:
                        (item.styles && item.styles.backgroundColor) ||
                        androidDefaults.button.backgroundColor,
                    },
                  ]}>
                  <Text
                    adjustsFontSizeToFit
                    style={{
                      color:
                        (item.styles && item.styles.color) ||
                        androidDefaults.button.color,
                      fontFamily:
                        (item.styles && item.styles.fontFamily) ||
                        androidDefaults.button.fontFamily,
                      fontSize:
                        (item.styles && item.styles.fontSize) ||
                        androidDefaults.button.fontSize,
                      fontWeight:
                        (item.styles && item.styles.fontWeight) ||
                        androidDefaults.button.fontWeight,
                      textTransform:
                        (item.styles && item.styles.textTransform) ||
                        androidDefaults.button.textTransform,
                    }}>
                    {item.text || defaultButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  const IOSButtonBox = () => {
    const buttonProps =
      props.buttons && props.buttons.length > 0 ? props.buttons : [{}];
    const [buttonLayoutHorizontal, setButtonLayoutHorizontal] = useState(
      buttonProps.length === 2 ? 1 : 0,
    );

    return (
      <View
        style={[
          styles.iOSButtonGroup,
          {
            flexDirection: buttonLayoutHorizontal === 1 ? 'row' : 'column',
          },
        ]}
        onLayout={(e) => {
          if (e.nativeEvent.layout.height > 60) setButtonLayoutHorizontal(0);
        }}>
        {buttonProps.map((item, index) => {
          let defaultButtonText = 'Ok';
          if (buttonProps.length > 2) {
            if (index === 0) defaultButtonText = 'ASK ME LATER';
            else if (index === 1) defaultButtonText = 'Cancel';
          } else if (buttonProps.length === 2 && index === 0)
            defaultButtonText = 'Cancel';
          const singleButtonWrapperStyle = {};
          let singleButtonWeight = iOSDefaults.button.fontWeight;
          if (index === buttonProps.length - 1) {
            singleButtonWeight = '700';
          }
          if (buttonLayoutHorizontal === 1) {
            singleButtonWrapperStyle.minWidth = '50%';
            if (index === 0) {
              singleButtonWrapperStyle.borderStyle = 'solid';
              singleButtonWrapperStyle.borderRightWidth = 0.55;
              singleButtonWrapperStyle.borderRightColor = '#dbdbdf';
            }
          }
          return (
            <View style={[styles.iOSButton, singleButtonWrapperStyle]}>
              <Pressable
                onPress={() => {
                  props.setModalVisible(false);
                  if (item.func && typeof item.func === 'function') item.func();
                }}>
                <View
                  style={[
                    styles.iOSButtonInner,
                    {
                      backgroundColor:
                        (item.styles && item.styles.backgroundColor) ||
                        iOSDefaults.button.backgroundColor,
                    },
                  ]}>
                  <Text
                    adjustsFontSizeToFit
                    style={{
                      color:
                        (item.styles && item.styles.color) ||
                        iOSDefaults.button.color,
                      fontFamily:
                        (item.styles && item.styles.fontFamily) ||
                        iOSDefaults.button.fontFamily,
                      fontSize:
                        (item.styles && item.styles.fontSize) ||
                        iOSDefaults.button.fontSize,
                      fontWeight:
                        (item.styles && item.styles.fontWeight) ||
                        singleButtonWeight,
                      textTransform:
                        (item.styles && item.styles.textTransform) ||
                        iOSDefaults.button.textTransform,
                      textAlign: 'center',
                    }}>
                    {item.text || defaultButtonText}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <Pressable
        style={[
          Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={() => props.setModalVisible(false)}
      />
      <View style={styles.alertBox}>
        {Platform.OS === 'ios' ? (
          <View style={[styles.iOSAlertBox, iOSDefaults.container]}>
            <Text
              adjustsFontSizeToFit
              style={[styles.iOSTitle, iOSDefaults.title]}>
              {props.title || ''}
            </Text>
            <Text
              adjustsFontSizeToFit
              style={[styles.iOSMessage, iOSDefaults.message]}>
              {props.message || ''}
              <Text
                adjustsFontSizeToFit
                onPress={props.onInsideMessage_1_Press}
                style={[styles.iOSMessage, iOSDefaults.insideMessage_1]}>
                {props.insideMessage_1}
              </Text>
              {/* <Text
            onPress={props.onInsideMessage_2_Press}
            style={[styles.iOSMessage, iOSDefaults.insideMessage_2]}>{props.insideMessage_2}
            </Text> */}
            </Text>
            <IOSButtonBox />
          </View>
        ) : (
          <View style={[styles.androidAlertBox, androidDefaults.container]}>
            <Text
              adjustsFontSizeToFit
              style={[styles.androidTitle, androidDefaults.title]}>
              {props.title}
            </Text>
            <Text
              adjustsFontSizeToFit
              style={[styles.androidMessage, androidDefaults.message]}>
              {props.message}
              <Text
                adjustsFontSizeToFit
                onPress={props.onInsideMessage_1_Press}
                style={[
                  styles.androidMessage,
                  androidDefaults.insideMessage_1,
                ]}>
                {props.insideMessage_1}
              </Text>
              {/* <Text
            onPress={props.onInsideMessage_2_Press}
            style={[styles.androidMessage, androidDefaults.insideMessage_2]}>{props.insideMessage_2}
            </Text> */}
            </Text>
            <AndroidButtonBox />
          </View>
        )}
      </View>
    </Modal>
  );
};

export default function customAlert(props) {
  const [modalVisible, setModalVisible] = useState(false);
  // Linking.openURL('mail to : yogendra9644@gmail.com')
  return (
    <View style={styles.centeredView}>
      <DefaultAlert
        modalVisible={props.modalVisible}
        setModalVisible={setModalVisible}
        title={''}
        message={props.message}
        insideMessage_1={props.insideMessage_1}
        insideMessage_2={props.insideMessage_2}
        onInsideMessage_1_Press={props.onInsideMessage_1_Press}
        android={{
          title: {
            fontFamily: 'System',
            fontSize: 16,
          },
          message: {
            fontFamily: 'System',
          },
          insideMessage_1: {
            color: 'blue',
          },
          insideMessage_2: {
            color: 'blue',
          },
        }}
        ios={{
          title: {
            fontFamily: 'System',
            fontSize: 16,
          },
          message: {
            fontFamily: 'System',
            fontSize: 14,
            // fontWeight: 'regular',
          },
          insideMessage_1: {
            color: 'blue',
          },
          insideMessage_2: {},
        }}
        buttons={[
          {
            text: 'OK',
            func: props.onPress,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.4,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  alertBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidAlertBox: {
    maxWidth: '90%',
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 2,
  },
  androidTitle: {
    marginHorizontal: 24,
    marginTop: 14,
  },
  androidMessage: {
    alignSelf: 'center',
    // textAlign:'center'
    marginLeft: 10,
    marginRight: 10,
  },
  androidButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 24,
  },
  androidButton: {
    marginTop: 12,
    marginRight: 8,
  },
  androidButtonInner: {
    padding: 10,
  },

  iOSAlertBox: {
    maxWidth: '80%',
    width: '100%',
    zIndex: 10,
    borderRadius: 13,
    opacity: 0.95,
  },
  iOSTitle: {
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 7,
    paddingLeft: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  iOSMessage: {
    paddingTop: 0,
    paddingRight: 16,
    paddingBottom: 21,
    paddingLeft: 16,
    textAlign: 'center',
  },
  iOSButtonGroup: {
    marginRight: -0.55,
  },
  iOSButton: {
    borderTopColor: '#c9c9cf',
    borderTopWidth: 0.55,
    borderStyle: 'solid',
  },
  iOSButtonInner: {
    minHeight: 44,
    justifyContent: 'center',
  },
});
