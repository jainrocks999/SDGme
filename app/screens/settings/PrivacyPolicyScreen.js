import React, {useRef} from 'react';
import {ScrollView} from 'react-native';

import PrivacyPolicy from '../../shared/components/privacy-policy';
import CustomSafeAreaView from '../../shared/components/safe-area-view';
import {Back, BackContainer} from './InformationScreen';

export default function PrivacyPolicyScreen({navigation}) {
  const scrollViewRef = useRef();
  const GoBack = () => {
    navigation.navigate('Settings');
  };
  return (
    <CustomSafeAreaView>
      <BackContainer>
        <Back onPress={() => GoBack()}>&lt; Back to settings</Back>
      </BackContainer>
      <ScrollView ref={scrollViewRef} style={{padding: 20, paddingTop: 0}}>
        <PrivacyPolicy scrollViewRef={scrollViewRef} />
      </ScrollView>
    </CustomSafeAreaView>
  );
}
