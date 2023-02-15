import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import CustomSafeAreaView from '../../shared/components/safe-area-view';
import TermsAndConditions from '../../shared/components/terms-conditions';
import {Back, BackContainer} from './InformationScreen';

export default function TermsAndConditionsScreen({navigation}) {
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
        <TermsAndConditions scrollViewRef={scrollViewRef} />
      </ScrollView>
    </CustomSafeAreaView>
  );
}
