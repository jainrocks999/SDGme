import React from 'react';
import {SafeAreaView} from 'react-native';
import colors from '../config/colors';

function CustomSafeAreaView({children}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
        backgroundColor: colors.appBg,
      }}>
      {children}
    </SafeAreaView>
  );
}

export default CustomSafeAreaView;
