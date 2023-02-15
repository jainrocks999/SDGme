import React, {useState} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {LogoContainer} from '../shared/components/containers';
import Logo from '../assets/logo.svg';

function PaginationElement({screens, index}) {
  return (
    <Pagination
      dotsLength={screens.length}
      activeDotIndex={index}
      dotStyle={{
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#256597',
      }}
      inactiveDotStyle={{
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: '#256597',
        borderWidth: 3,
      }}
    />
  );
}

export default function TutorialScreen({navigation}) {
  const asyncStorage = useAsyncStorage('has_seen_tutorial');
  const [sliderIndex, setSliderIndex] = useState(0);
  const titleStyle = {
    fontSize: 34,
    padding: 20,
    textAlign: 'center',
    color: '#256697',
  };
  const boldStyle = {
    fontWeight: 'bold',
  };
  const goToLogin = async () => {
    await asyncStorage.setItem('yes', () => {
      navigation.navigate('Auth');
    });
  };
  const textProp = {
    maxFontSizeMultiplier: 1,
  };
  const screens = [
    <Text {...textProp} style={titleStyle}>
      Welcome to your carbon action tracker that helps you contribute to
      achieving the UN Sustainable Development Goals.
    </Text>,
    <Text {...textProp} style={titleStyle}>
      Learn how to use the app by selecting{' '}
      <Text {...textProp} style={boldStyle}>
        Settings
      </Text>{' '}
      and then{' '}
      <Text {...textProp} style={boldStyle}>
        Information
      </Text>{' '}
      for a step-by-step guide and exclusive video.
    </Text>,
    <Text {...textProp} style={titleStyle}>
      Share your results on social media by selecting{' '}
      <Text {...textProp} style={boldStyle}>
        Results
      </Text>{' '}
      and then the{' '}
      <Text {...textProp} style={boldStyle}>
        Share
      </Text>{' '}
      icon to post your Results screen or copy the link.
    </Text>,
    <Text {...textProp} style={titleStyle}>
      Read about the UN Sustainable Development Goals by selecting{' '}
      <Text {...textProp} style={boldStyle}>
        Goals
      </Text>{' '}
      and then each goal. Swipe left or right for more goals.
    </Text>,
  ];
  function _item({index}) {
    return (
      <View style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
        {screens[index]}
      </View>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: '#d5dee9'}}>
      <View>
        <LogoContainer style={{display: 'flex', height: '100%'}}>
          <Logo width={140} height={140} />
          <Carousel
            data={screens}
            renderItem={_item}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index) => setSliderIndex(index)}
          />
          <PaginationElement index={sliderIndex} screens={screens} />
          <Text
            onPress={goToLogin}
            style={{color: '#256697', fontSize: 22, marginBottom: 50}}>
            {sliderIndex === screens.length - 1 ? 'Go to app' : 'Skip'}
          </Text>
        </LogoContainer>
      </View>
    </SafeAreaView>
  );
}
