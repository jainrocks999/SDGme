import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components';
import colors from '../config/colors';

export const InformationHeader = styled.View`
  flex-direction: row;
  background-color: ${colors.appBg};
  align-self: stretch;
  align-items: center;
  height: 50px;
  margin-vertical: 5px;
`;

export const GreenBar = styled.View`
  height: 50px;
  width: 4px;
  margin-right: 10px;
  background-color: ${({color}) => `${color}`};
`;

export const HeaderText = styled.Text`
  color: ${({color}) => `${color}`};
  font-size: 18px;
  font-weight: 700;
`;

export const TitleText = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: 700;
`;

export const InformationScrollView = styled.ScrollView`
  align-self: stretch;
  padding-horizontal: 10px;
  margin-bottom: 20px;
  flex: 1 0 auto;
`;

export const ShowMoreText = styled.Text`
  font-size: 15px;
  text-decoration: underline;
  color: black;
`;

export function ShowMoreButton({onPress}) {
  return (
    <Pressable
      onPress={() => {
        onPress(true);
      }}
      style={{
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: colors.labelGrey,
        margin: 5,
        padding: 5,
      }}>
      <ShowMoreText>Show More</ShowMoreText>
    </Pressable>
  );
}
