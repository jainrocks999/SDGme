import React, {useEffect, useState} from 'react';
import {Image, PixelRatio, View} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';

import YouTube from 'react-native-youtube';
import CustomSafeAreaView from '../../shared/components/safe-area-view';
import {MLText, Title} from '../../shared/components/typography';
import colors from '../../shared/config/colors';
import {API_URL, X_API_KEY} from '../../shared/config/api';
import ActionsIcon from '../../assets/New_icons/actions_icon_blue.png';
import RapidLogIcon from '../../assets/New_icons/rapid_log_blue.png';
import AddButton from '../../assets/information-images/AddButton.png';
import AddIcon from '../../assets/rapidLog/Plus_Icons_blue.png';
import MinusIcon from '../../assets/rapidLog/Minus_icons_blue.png';
import BellIcon from '../../assets/information-images/BellIcon.png';
import BinIcon from '../../assets/information-images/BinIcon.png';
import GoalsIcon from '../../assets/New_icons/Goal_icon_blue.png';
import PeriodComponent from '../../assets/information-images/PeriodComponent.png';
import ResultsIconModerations from '../../assets/section-icons/results-icon-circle-neg.png';
import ResultsTab from '../../assets/information-images/ResultsTabs.png';
import ResultsIcon from '../../assets/section-icons/results-icon-circle.png';
import SettingsIcon from '../../assets/New_icons/settings_icon_blue.png';
import ShareIcon from '../../assets/information-images/ShareIcon.png';
import Tick from '../../assets/information-images/Tick.png';
import ToggleIcon1 from '../../assets/information-images/ToggleIcon1.png';
import ToggleIcon2 from '../../assets/information-images/ToggleIcon2.png';
import SavingAtWork from '../../assets/information-images/SavingAtWork.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function InformationScreen({navigation}) {
  const [video, setVideo] = useState('');
  const GoBack = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    const config = {
      headers: {
        'X-API': X_API_KEY,
      },
    };
    axios
      .get(`${API_URL}/SDGme/api/User/GetAppInfo`, config)
      .then((response) => {
        response.data.Success
          ? setVideo(response.data.YouTubeUrl)
          : console.log('YouTubeUrl :', response.data);
        // : Alert.alert(response.data.Message)
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <CustomSafeAreaView>
      <BackContainer>
        <Back adjustsFontSizeToFit onPress={() => GoBack()}>
          &lt; Back to settings
        </Back>
      </BackContainer>
      <TextContainer>
        <YouTube
          apiKey="AIzaSyAEY97mxdHnhQJQtt06gkcxCQi_qXpdA68"
          videoId={video}
          style={{alignSelf: 'stretch', height: 300}}
        />
        <InfoTitle bold>How to use SDGme</InfoTitle>
        <InfoText normal>
          SDGme tracks your carbon-saving actions in real-time. You can view,
          monitor and share your activity all via the app. Discover how your
          actions help achieve the United Nations’ Sustainable Development Goals
          (SDG) in the Information section. Read below for the how-to-use SDGme.
        </InfoText>

        <InfoTitle bold>How to record an activity (Current day)</InfoTitle>
        <InfoText normal>
          1. Select Actions icon from the navigation bar{' '}
          <IconView source={ActionsIcon} />
        </InfoText>
        <InfoText normal>
          2. Scroll up and down your Actions list to view carbon-saving actions.
        </InfoText>
        <InfoText normal>
          3. Record your carbon-saving action by selecting Add{' '}
          <Image
            source={AddButton}
            resizeMode="contain"
            style={{
              width: 100,
              height: 30,
            }}
          />
        </InfoText>
        <InfoText normal>
          4. Use the plus button to increase the number of times you have
          completed this action <IconView source={AddIcon} />
        </InfoText>
        <InfoText normal>5. Confirm or cancel the action</InfoText>
        <InfoText normal>
          6. If cancel, select another action or finish
        </InfoText>
        <InfoText normal>
          7. Scroll left or right to change the perspective{'\n'}
          <Image
            source={SavingAtWork}
            resizeMode="contain"
            style={{
              width: wp('80%'),
            }}
          />
        </InfoText>
        <InfoText normal>
          8. Change the actions view to grid by selecting the grid icon{' '}
          <IconView source={ToggleIcon2} />
        </InfoText>
        <InfoText normal>
          9. Return to list view by selecting the list view icon{' '}
          <IconView source={ToggleIcon1} />
        </InfoText>

        <InfoTitle bold>
          How to record an activity using Rapid Log (Past day)
        </InfoTitle>

        <InfoText normal>
          1. Select Rapid Log icon from the navigation bar{' '}
          <IconView source={RapidLogIcon} />
        </InfoText>
        <InfoText normal>
          2. Select a day (can be current day or previous days)
        </InfoText>
        <InfoText normal>
          3. Scroll up and down your Actions list to view carbon-saving actions.
        </InfoText>
        <InfoText normal>
          4. Increase the quantity of each action by selecting the plus sign,
          reduce by pressing the minus sign <IconView source={AddIcon} />{' '}
          <IconView source={MinusIcon} />
        </InfoText>
        <InfoText normal>
          5. Upload the total count of actions selected for that day by clicking
          on the Save button at the bottom of the screen{' '}
          <BlueButton>
            <TextButton>Save</TextButton>
          </BlueButton>
        </InfoText>

        {/* Viewing Results */}

        <InfoTitle bold>Viewing Results</InfoTitle>
        <InfoText normal>
          1. Select the Results icon from the navigation bar{' '}
          <IconView source={ResultsIcon} />
        </InfoText>
        <InfoText normal>
          2. The default view will display your daily results compared to the
          average carbon saver in your access key group
        </InfoText>
        <InfoText normal>
          3. View your performance over the day, week or month by selecting the
          appropriate tab
          <Image source={PeriodComponent} style={{width: 170, height: 20}} />
        </InfoText>
        <InfoText normal>
          4. View your results under the Activity, Actions and Goals tabs, by
          swiping left or right or clicking on the top tab
          <Image source={ResultsTab} style={{width: 220, height: 20}} />
        </InfoText>
        <InfoText normal>
          5. Click on the Action or Goal to view the individual actions logged
        </InfoText>
        <InfoText normal>
          6. To delete an action select bin <IconView source={BinIcon} />
        </InfoText>

        <InfoTitle bold>Deleting Actions</InfoTitle>
        <InfoText normal>
          1. Select the Results icon from the navigation bar{' '}
          <IconView source={ResultsIcon} />
        </InfoText>
        <InfoText normal>2. Select the Actions tab</InfoText>
        <InfoText normal>3. Select the action you wish to delete</InfoText>
        <InfoText normal>
          4. Select the bin icon <IconView source={BinIcon} />
        </InfoText>
        <InfoText normal>
          5. To delete multiple actions in Rapid Log, select Rapid Log icon from
          the navigation bar <IconView source={RapidLogIcon} />
        </InfoText>
        <InfoText normal>
          6. Select the day you wish to amend the action count for (can be
          current day or previous days)
        </InfoText>
        <InfoText normal>
          7. Decrease the quantity of each action by selecting the minus sign
        </InfoText>
        <InfoText normal>
          8. Click on Save to re-upload the total count of actions selected for
          that day
        </InfoText>

        <InfoText bold>{'\n'}Moderation</InfoText>
        <InfoText normal>
          1. Moderation actions are in the Results Tab when a red dot is next to
          the trophy icon <IconView source={ResultsIconModerations} />
        </InfoText>
        <InfoText normal>
          2. Click on the Bell icon to access the actions moderation list{' '}
          <IconView source={BellIcon} />
        </InfoText>
        <InfoText normal>
          3. To keep an action select tick <IconView source={Tick} />
        </InfoText>
        <InfoText normal>
          4. To delete an action select bin <IconView source={BinIcon} />
        </InfoText>
        <InfoText bold>{'\n'}Sharing Results</InfoText>
        <InfoText normal>
          1. In Results select the Share Icon <IconView source={ShareIcon} />{' '}
          your results via your chosen social media
        </InfoText>

        {/* Sustainable Development Goals (SDG) */}

        <InfoTitle bold>Sustainable Development Goals (SDG)</InfoTitle>
        <InfoText normal>
          1. Select Goals <IconView source={GoalsIcon} /> to see a grid of the
          17 SDG
        </InfoText>
        <InfoText normal>2. Select a SDG to read more</InfoText>
        <InfoText normal>3. Swipe left or right to see another SDG</InfoText>
        <InfoText normal>
          4. To exit, tap Goals <IconView source={GoalsIcon} />
        </InfoText>

        {/* Setting */}

        <InfoTitle bold>Settings</InfoTitle>
        <InfoText normal>
          1. Select Settings <IconView source={SettingsIcon} />
        </InfoText>
        <InfoText normal>
          2. In Settings, you can Reset Password, Change Access Key, Read the
          User Guide, Select On or Off Push Notifications or Log Out
        </InfoText>
      </TextContainer>
    </CustomSafeAreaView>
  );
}

export default InformationScreen;

export const InfoTitle = styled(MLText)`
  margin: ${({first}) => (first ? '0 0 30px 0' : '40px 0 30px 0')};
`;

export const InfoText = styled(Title)`
  line-height: 25px;
`;

export const BackContainer = styled.View`
  margin: 0px 20px 10px 20px;
  flex-direction: row;
  height: 40px;
  align-items: center;
`;
export const IconContainer = styled.View`
  border-width: 2px;
  justify-content: flex-end;
  align-items: center;
  width: 25px;
  height: 25px;
`;
export const IconView = styled.Image`
  width: 20px;
  height: 20px;
`;

export const Back = styled.Text`
  color: ${colors.links};
  font-size: 16px;
`;

const TextContainer = styled.ScrollView`
  margin: 0 20px;
`;
export const BlueButton = styled.View`
  width: 70px;
  border-radius: 10px;
  align-items: center;
  height: 20px;
  justify-content: center;
  background: ${colors.primaryColor};
`;
export const TextButton = styled.Text`
  font-size: 12px;
  color: ${colors.white};
`;
