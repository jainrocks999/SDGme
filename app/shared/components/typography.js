import styled from 'styled-components';

import colors from '../config/colors';

export const LgTitle = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: ${colors.title};
  margin: 15px 0 10px 0;
`;

export const BlackText = styled.Text`
  width: 100%;
  line-height: 25px;
  color: ${colors.black};
  font-size: 17px;
  margin-bottom: ${({end}) => (end ? '70px' : '20px')};
`;

export const MLText = styled.Text`
  font-size: 22px;
  color: ${colors.title};
  font-weight: ${({bold}) => (bold ? '700' : 'normal')};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const MText = styled.Text`
  font-size: 18px;
  font-weight: ${({bold}) => (bold ? '700' : 'normal')};
  margin: 10px 0;
`;

export const Link = styled.Text`
  font-size: 18px;
  color: ${colors.links};
`;

export const TextButton = styled.Text`
  color: ${({grey}) => (grey ? colors.placeholder : colors.white)};
`;

export const Title = styled.Text`
  font-size: 16px;
  text-align: ${({center}) => (center ? 'center' : 'left')};
  color: ${colors.title};
  font-weight: ${({normal}) => (normal ? 'normal' : '700')};
`;

export const BottomLinks = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;
