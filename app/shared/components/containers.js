import {Dimensions} from 'react-native';
import styled from 'styled-components';

import colors from '../config/colors';

const cubeWidth = Dimensions.get('window').width / 2 - 30;

export const LogoContainer = styled.View`
  flex-direction: column;
  align-items: center;
  top: 26px;
  margin-bottom: 50px;
`;

export const ActionContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: ${({viewDetails}) => (viewDetails ? `${cubeWidth}px` : '130px')};
  width: ${({viewDetails}) => (viewDetails ? `${cubeWidth}px` : '90%')};
  border: 1px solid ${colors.placeholder};
  border-radius: 5px;
  align-self: center;
  flex-direction: ${({viewDetails}) => (viewDetails ? 'column' : 'row')};
`;

export const ActionContentContainer = styled.TouchableHighlight`
  ${({viewDetails}) => viewDetails && 'display: none;'}
  padding: 19px 20px;
  flex: 0.6;
  background-color: ${colors.white};
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

export const ActionIconContainer = styled.TouchableHighlight`
  width: 100%;
  /* height: 175px; */
  background-color: ${({bgColor}) => bgColor || colors.white};
  flex: ${({viewDetails}) => (viewDetails ? '1' : '0.4')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: ${({viewDetails}) => (viewDetails ? '4px' : '0px')};
  border-bottom-right-radius: ${({viewDetails}) =>
    viewDetails ? '4px' : '0px'};
  align-content: center;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonContainer = styled.View`
  margin-top: auto;
`;

export const ActionTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
// border-width:1px;

export const ResultsContainer = styled.ScrollView`
  margin: 0 20px 0 20px;
`;

export const ResultsTabContainer = styled.TouchableOpacity`
  ${({selected}) =>
    selected &&
    `
border-top-left-radius: 10px;
border-top-right-radius: 10px;
border: 0.5px solid ${colors.placeholder};
background-color: ${colors.labelGrey};
`}
  padding: 5px 10px;
`;

export const ResultsTableContainer = styled.View`
  padding: 40px 20px 20px 20px;
`;
